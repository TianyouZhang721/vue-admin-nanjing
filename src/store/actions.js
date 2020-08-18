import  http  from '../http'
export default {
  // 用户登录
  userLogin(context, ruleForm) {
    http.post("/userlogin", ruleForm).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        // 登录成功
        // 需要把res.data.list存储到vuex的user上
        context.commit("setUser", res.data.list)
      }
    })
  }
}
