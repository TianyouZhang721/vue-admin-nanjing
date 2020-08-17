<template>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <MyNav></MyNav>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
  import MyNav from "@/components/MyNav"
  export default {
    components: {
      MyNav
    }
  }
</script>

<style>
  html, body, #app {
    width :100%;
    height: 100%;
  }
  .el-container {
    width :100%;
    height: 100%;
  }
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
  }
</style>
