<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select @change="firstCateChange" v-model="ruleForm.first_cateid" placeholder="请选择上级">
          <el-option v-for="(item, index) in firstCate" :key="index" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择上级">
          <el-option v-for="(item, index) in secondCate" :key="index" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>



      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model="ruleForm.market_price"></el-input>
      </el-form-item>


      <el-form-item label="图片" prop="img">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-change="fileChange"
            :auto-upload="false"
            :file-list="list">
            <i class="el-icon-plus"></i>
          </el-upload>
      </el-form-item>


      <el-form-item label="商品规格" prop="specsid">
        <el-select @change="specChange" v-model="ruleForm.specsid" placeholder="请选择上级">
          <el-option v-for="(item, index) in specList" :key="index" :label="item.specsname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性" prop="specsattr">
        <el-select v-model="ruleForm.specsattr" placeholder="请选择上级">
          <el-option v-for="(item, index) in attrList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否热卖" prop="ishot">
        <el-radio-group v-model="ruleForm.ishot">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否新品" prop="isnew">
        <el-radio-group v-model="ruleForm.isnew">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>



      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <div id="editor"></div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import wangEditor from 'wangeditor'
  export default {
    data() {
      return {
        list: [],
        data: [],
        img: "",
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        title: "",
        menuList: [],
        ruleForm: {
          first_cateid: "",
          second_cateid: "",
          goodsname:"",
          price: "",
          market_price: "",
          specsid: "",
          specsattr: "",
          isnew: "",
          ishot: "",
          status: true,
          description: ""
        },
        id: "",
        rules: {
          rolename: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }, ]
        },
        editor: null,
        firstCate: [],
        secondCate: [],
        specList: [],
        attrList: []
      };
    },
    // created() {},
    mounted() {
      // 获取规格
      this.$http.get("/specslist", {size: 10, page: 1}).then(res => {
        console.log(res)
        this.specList = res.data.list
      })
      // 获取一级分类
      this.$http.get("/catelist",{pid: 0}).then(res => {
        console.log(res)
        this.firstCate = res.data.list
      })
      // 获取路由参数
      this.id = this.$route.params.id;
      // 生成富文本编辑器实例
      this.editor = new wangEditor("#editor")
      this.editor.create()
      if (this.id) {
        this.title = "商品编辑"
        // 根据id获取某一条商品
        this.$http.get("/goodsinfo", {
          id: this.id
        }).then(res => {
          console.log(res)
          let {
            status, isnew, ishot
          } = res.data.list
          this.ruleForm = { ...res.data.list,
            status: status == 1 ? true : false,
            isnew:isnew == 0 ? 2 : 1 ,
            ishot: ishot == 0 ? 2 : 1,
          }
          this.editor.txt.html(res.data.list.description)
          this.$http.get("/catelist", {pid: this.ruleForm.first_cateid}).then(res => {
                this.secondCate = res.data.list
          })
        })

      } else {
        this.title = "角色添加"
      }
      // 调用菜单列表接口，在下拉框中使用
      this.$http.get("/menulist", {
        istree: true
      }).then(res => {
        console.log(res)
        this.data = res.data.list
      })
    },
    methods: {
      specChange(id) {
          console.log(id)
          this.attrList = this.specList.find(item => {
            return item.id == id
          }).attrs
      },
      fileChange(file) {
          this.img = file.raw
      },
      firstCateChange(id) {
        console.log(id)
        this.$http.get("/catelist",{pid: id}).then(res => {
          console.log(res)
          this.secondCate = res.data.list
        })
      },
      handleCheckChange(data, checked, indeterminate) {
              console.log(data, checked, indeterminate);
            },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.id) {
              let form = new FormData()
              this.ruleForm.description = this.editor.txt.html()
              this.ruleForm.status = this.ruleForm.status ? 1 : 2

              console.log(this.ruleForm)
              for(var key in this.ruleForm) {
                form.append(key, this.ruleForm[key])
              }
              form.append("img", this.img)
              this.$http.post("/goodsadd", form).then(res => {
                console.log(res)
              })
            } else  {
              this.$http.post("/roleedit", { ...obj,
                id: this.id
              }).then(res => {
                console.log(res)
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
