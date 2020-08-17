<template>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>系统设置</span>
                  </template>

                    <el-menu-item index="2-1">菜单管理</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>

                    <el-menu-item index="3-1">选项1</el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
  export default {

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
