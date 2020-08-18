<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" @click="add">添加</el-button>

    <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          label="分类编号"
          width="180"
          prop="id">
        </el-table-column>
        <el-table-column
          label="分类名称"
          width="180"
          prop="catename">

        </el-table-column>
        <el-table-column
          label="图片"
          width="180"
          prop="catename">
            <template slot-scope="scope">
              <img :src="'http://localhost:3000' + scope.row.img" alt="">
            </template>

        </el-table-column>
        <el-table-column
          label="状态"
          width="180"
          prop="status">
            <template slot-scope="scope">
              <el-button type="primary">{{ scope.row.status | status}}</el-button>
            </template>

        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  export default {
    filters: {
      status(num) {
        switch(num) {
          case 1:
            return "启用";
            break;
          case 2:
            return "禁用"
            break;
        }
      }
    },
    mounted() {
      this.$http.get("/catelist", {istree: true}).then(res => {
        console.log(res)
        this.tableData = res.data.list
      })
    },
    data() {
          return {
            tableData: []
          }
        },
        methods: {
          add() {
            this.$router.push("/category/add")
          },
          handleEdit(index, row) {
            console.log(index, row);
          },
          handleDelete(index, row) {
            console.log(index, row);
          }
        }
  }
</script>

<style scoped>
img {
  width: 100px;
}
</style>
