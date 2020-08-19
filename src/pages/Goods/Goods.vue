<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button @click="add" type="primary">添加</el-button>

    <el-table  :data="tableData" style="width: 100%">
      <el-table-column label="商品编号" width="80" prop="id">
      </el-table-column>

      <el-table-column label="商品名称" width="120" prop="goodsname">

      </el-table-column>
      <el-table-column label="商品价格" width="120" prop="price">

      </el-table-column>
      <el-table-column label="市场价格" width="120" prop="market_price">

      </el-table-column>
      <el-table-column label="图片" width="150" prop="rolename">
        <template slot-scope="scope">
          <img :src="'http://localhost:3000' + scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="120" prop="isnew">
      <template slot-scope="scope">
        <el-button>{{scope.row.isnew | isNew}}</el-button>
      </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="120" prop="ishot">
      <template slot-scope="scope">
        <el-button>{{scope.row.ishot | isNew}}</el-button>
      </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary">{{scope.row.status | status}}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @onConfirm="del(scope.row)"
            @onCancel="cancel"
          >
            <el-button  size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
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
      },
      isNew(num) {
        switch(num) {
          case 1:
            return "是";
            break;
          default:
            return "否"
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
        this.$router.push("/goods/add")
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push("/role/" + row.id)
      },
      del(row) {
          console.log("确定删除")
          this.$http.post("/roledelete", {id: row.id}).then(res => {
            console.log(res)
            if (res.data.code == 200) {
                this.getList()
            }
          })
      },
      cancel() {
        console.log("点错了")
      },
      getList() {
        this.$http.get("/goodslist", {size: 10, page: 1}).then(res => {
          console.log(res)
          this.tableData = res.data.list
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped>
img {
  width: 120px;
}
</style>
