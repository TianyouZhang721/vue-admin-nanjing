<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
          return {
            ruleForm: {
              username: "",
              password: ""
            },
            rules: {
              username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
              ],password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
              ],

            }
          };
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$store.dispatch("userLogin", this.ruleForm)
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
.el-form {
    width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid #ccc;
    padding: 30px;
}
</style>
