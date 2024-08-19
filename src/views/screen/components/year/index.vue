<template>
  <div class="box">
    <div class="top">
      <p class="title">年度游客量对比</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const charts = ref()
let xLabel = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
let L0 = [500, 800, 650, 720, 900, 1100, 1050, 880, 780, 600, 550, 480]
let L1 = [300, 450, 520, 480, 600, 750, 800, 680, 560, 420, 380, 300]
let L3 = [700, 950, 880, 920, 1050, 1200, 1150, 980, 850, 750, 680, 550]

onMounted(() => {
  const myChart = echarts.init(charts.value)
  let option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      align: 'left',
      right: '30px',
      type: 'plain',
      top: '10px',
      textStyle: {
        color: '#7ec7ff',
        fontSize: 12,
      },
      itemGap: 25,
      itemWidth: 18,
      // icon:'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
    },
    grid: {
      top: '50px',
      left: '80px',
      right: '40px',
      bottom: '15%',
      // containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#233653',
          },
        },
        axisLabel: {
          //坐标轴刻度标签的相关设置
          textStyle: {
            color: '#7ec7ff',
            padding: 10,
            fontSize: 12,
          },
          formatter: function (data: any) {
            return data
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#192a44',
          },
        },
        axisTick: {
          show: false,
        },
        data: xLabel,
      },
    ],
    yAxis: [
      {
        // name: '利用率',
        nameTextStyle: {
          color: '#7ec7ff',
          fontSize: 12,
          padding: 10,
        },
        min: 0,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#192a44',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#233653',
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#7ec7ff',
            padding: 10,
          },
          formatter: function (value: any) {
            if (value === 0) {
              return value
            }
            return value + '人'
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '2022',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 2,
            color: 'rgba(84,131,255,1)', // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: 'rgba(84,131,255,1)',
        },
        tooltip: {
          show: true,
        },
        areaStyle: {
          //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(84,131,255,.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(84,131,255, 0)',
                },
              ],
              false,
            ),
            shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
        },
        data: L0,
      },
      {
        name: '2023',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 2,
            color: 'rgba(77,192,36,1)', // 线条颜色
          },
        },
        itemStyle: {
          color: 'rgba(77,192,36,1)',
        },
        tooltip: {
          show: true,
        },
        areaStyle: {
          //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(77,192,36,.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(77,192,36, 0)',
                },
              ],
              false,
            ),
            shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
            shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
        },
        data: L1,
      },
      {
        name: '2024',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 2,
            color: 'rgba(248,172,6,1)', // 线条颜色
          },
        },
        itemStyle: {
          color: 'rgba(248,172,6,1)',
        },
        tooltip: {
          show: true,
        },
        areaStyle: {
          //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(248,172,6,.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(248,172,6, 0)',
                },
              ],
              false,
            ),
            shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
            shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
        },
        data: L3,
      },
    ],
  }
  myChart.setOption(option)
})
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
  }

  .charts {
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
