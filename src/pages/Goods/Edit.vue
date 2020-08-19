<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="一级分类" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择上级">
          <el-option label="顶级菜单" value="0"></el-option>
          <el-option v-for="(item, index) in menuList" :key="index" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="二级分类" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择上级">
          <el-option label="顶级菜单" value="0"></el-option>
          <el-option v-for="(item, index) in menuList" :key="index" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>



      <el-form-item label="商品名称" prop="rolename">
        <el-input v-model="ruleForm.rolename"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="rolename">
        <el-input v-model="ruleForm.rolename"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="rolename">
        <el-input v-model="ruleForm.rolename"></el-input>
      </el-form-item>


      <el-form-item label="图片" prop="img">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="fileChange"
            :auto-upload="false"
            :file-list="list">
            <i class="el-icon-plus"></i>
          </el-upload>
      </el-form-item>


      <el-form-item label="商品规格" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择上级">
          <el-option label="顶级菜单" value="0"></el-option>
          <el-option v-for="(item, index) in menuList" :key="index" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择上级">
          <el-option label="顶级菜单" value="0"></el-option>
          <el-option v-for="(item, index) in menuList" :key="index" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否热卖" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1">目录</el-radio>
          <el-radio label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否新品" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1">目录</el-radio>
          <el-radio label="2">菜单</el-radio>
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
        data: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        title: "",
        menuList: [],
        ruleForm: {
          rolename: "",
          menus: [],
          status: false,
        },
        id: "",
        rules: {
          rolename: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }, ]
        },
        editor: null
      };
    },
    // created() {},
    mounted() {
      this.id = this.$route.params.id;
      this.editor = new wangEditor("#editor")
      this.editor.create()
      if (this.id) {
        this.title = "角色编辑"
        // 根据id获取某一条菜单
        this.$http.get("/roleinfo", {
          id: this.id
        }).then(res => {
          console.log(res)
          let {
            status
          } = res.data.list
          this.ruleForm = { ...res.data.list,
            status: status == 1 ? true : false,
            menus: res.data.list.menus.split(",")
          }
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
      handleCheckChange(data, checked, indeterminate) {
              console.log(data, checked, indeterminate);
            },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = JSON.parse(JSON.stringify(this.ruleForm))
            obj.status = obj.status ? 1 : 2
            this.ruleForm.menus = this.$refs.tree.getCheckedKeys()
            let arr = this.$refs.tree.getCheckedKeys(); //"[1,2,3]""
            obj.menus = arr
            if (!this.id) {
              this.$http.post("/roleadd", obj).then(res => {
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
