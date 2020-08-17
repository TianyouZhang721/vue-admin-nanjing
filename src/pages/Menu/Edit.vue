<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单列表</el-breadcrumb-item>
      <el-breadcrumb-item>菜单添加</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择上级">
          <el-option label="顶级菜单" value="0"></el-option>
          <el-option v-for="(item, index) in menuList" :key="index" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1" >目录</el-radio>
          <el-radio label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <el-form-item v-if="ruleForm.type == 1" label="菜单图标" prop="icon">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>
      <el-form-item v-if="ruleForm.type == 2" label="菜单地址" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
          return {
            menuList: [],
            ruleForm: {
              title: '',
              pid: "",
              type: '',
              icon: '',
              status: false,
              url: ""
            },
            rules: {
              title: [
                { required: true, message: '请输入菜单名称', trigger: 'blur' },
              ],
              pid: [
                { required: true, message: '请选择上级菜单', trigger: 'change' }
              ]
            }
          };
        },
        mounted() {
          // 调用菜单列表接口，在下拉框中使用
          this.$http.get("/menulist",{istree: true}).then(res => {
            console.log(res)
            this.menuList = res.data.list
          })
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                console.log(this.ruleForm.type)
                this.ruleForm.status = this.ruleForm.status ? 1 : 2
                this.$http.post("/menuadd", this.ruleForm).then(res => {
                  console.log(res)
                })
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
