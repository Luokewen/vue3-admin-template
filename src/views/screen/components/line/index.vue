<template>
  <div class="box">
    <div class="top">
      <p class="title">未来七天游客数量趋势图</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

const charts = ref()

onMounted(() => {
  const myChart = echarts.init(charts.value)
  let option = {
    title: {
      text: '今日&昨日',
      left: '50%',
      textAlign: 'center',
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '4%',
      bottom: '0',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#ddd',
        },
      },
      padding: [5, 10],
      textStyle: {
        color: '#7588E4',
      },
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
    },
    legend: {
      right: 20,
      orient: 'horizontal',
      data: ['今日', '昨日'],
      textStyle: {
        color: 'white',
      },
    },
    xAxis: {
      type: 'category',
      data: [
        '00:00',
        '2:00',
        '4:00',
        '6:00',
        '8:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
      ],
      boundaryGap: false,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#609ee9',
        },
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 14,
        },
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#D4DFF5'],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#609ee9',
        },
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 14,
        },
      },
    },
    series: [
      {
        name: '今日',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: [
          '1200',
          '1400',
          '1008',
          '1411',
          '1026',
          '1288',
          '1300',
          '800',
          '1100',
          '1000',
          '1118',
          '1322',
        ],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(199, 237, 250,0.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(199, 237, 250,0.2)',
                },
              ],
              false,
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#f7b851',
          },
        },
        lineStyle: {
          normal: {
            width: 3,
          },
        },
      },
      {
        name: '昨日',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: [
          '1200',
          '1400',
          '808',
          '811',
          '626',
          '488',
          '1600',
          '1100',
          '500',
          '300',
          '1998',
          '822',
        ],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(216, 244, 247,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(216, 244, 247,1)',
                },
              ],
              false,
            ),
          },
        },
        itemStyle: {
          normal: {
            color: '#58c8da',
          },
        },
        lineStyle: {
          normal: {
            width: 3,
          },
        },
      },
    ],
  }
  myChart.setOption(option)
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;

  .top {
    margin-top: -15px;
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
    height: calc(100% - 40px);
    box-sizing: border-box;
  }
}
</style>
