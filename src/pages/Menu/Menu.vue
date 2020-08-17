<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button @click="add" type="primary">添加</el-button>

    <el-table row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :data="tableData" style="width: 100%">
      <el-table-column label="菜单编号" width="180" prop="id">
      </el-table-column>

      <el-table-column label="菜单名称" width="180" prop="title">

      </el-table-column>

      <el-table-column width="180" label="菜单图标" prop="icon">

      </el-table-column>

      <el-table-column label="菜单地址" width="180" prop="url">

      </el-table-column>

      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary">{{scope.row.status | status}}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      add() {
        this.$router.push("/menu/add")
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    mounted() {
      this.$http.get("/menulist",{istree: true}).then(res => {
        console.log(res)
        this.tableData = res.data.list
      })
    }
  }
</script>

<style scoped>

</style>
