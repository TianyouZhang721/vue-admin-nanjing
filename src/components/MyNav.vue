<template>
  <el-aside width="200px">
    <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>


          <el-submenu :index="index.toString()" v-for="(menuItem, index) in menuList" :key="menuItem.id">
            <template slot="title">
              <i :class="menuItem.icon"></i>
              <span>{{ menuItem.title }}</span>
            </template>

              <el-menu-item v-for="(item, i) in menuItem.children" :key="item.id" :index="item.url">{{item.title}}</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-col>
  </el-aside>
</template>

<script>
  export default {
      data() {
        return {
          // menuList: []
        }
      },
      mounted() {
          // this.$http.get("/menulist",{istree: true}).then(res => {
          //   console.log(res)
          //   this.menuList = res.data.list
          // })
      },
      computed: {
          menuList() {
            return this.$store.state.user.menus
          }
      }
  }
</script>

<style scoped>

</style>
