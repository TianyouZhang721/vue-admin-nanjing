<template>
  <div ref="container" id="container" style="width: 800px;height:400px;">

  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        list: [],
        title: [],
        price: []
      }
    },
    methods: {
      getGoods() {
        this.$http.get("/goodslist", {size: 10, page: 1}).then(res => {
          console.log(res)
          this.list = res.data.list
          this.title = this.list.map(item => {
            return item.goodsname
          })
          this.price = this.list.map(item => {
            return item.price
          })
          var mycharts = echarts.init(this.$refs.container)

          // 指定图表的配置项和数据
          var option = {
            // 图表的标题
            title: {
              text: '产品价格表'
            },
            tooltip: {
              triggerOn: 'click'
            },
            // 图例
            legend: {
              data: ['价格']
            },
            // x轴
            xAxis: {
              data: this.title
            },
            yAxis: {},
            series: [{
              name: '价格',
              type: 'pie',
              data: this.price
            }]
          };

          // 使用刚指定的配置项和数据显示图表。
          mycharts.setOption(option);
        })
      }
    },
    mounted() {
      this.getGoods()
      // 基于准备好的dom，初始化echarts实例

    }
  }
</script>

<style scoped>

</style>
