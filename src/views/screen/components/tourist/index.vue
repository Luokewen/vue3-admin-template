<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill' //水球图

const charts = ref()
let people = ref('216908人')

onMounted(() => {
  //获取Echarts类的实例
  let myCharts = echarts.init(charts.value)
  //设置实例的配置项
  // myCharts.setOption({
  //     //标题组件
  //     title: {
  //         text: '水球图'
  //     },
  //     //x轴组件
  //     xAxis: {

  //     },
  //     //y轴组件
  //     yAxis: {

  //     },
  //     //系列能决定你展示什么样的图形图标
  //     series:{
  //         type:'liquidFill',
  //         data:[0.6,0.4,0.2],
  //         radius:'96%',
  //     },
  //     //布局组件
  //     grid:{
  //         left:0,
  //         right:0,
  //         top:0,
  //         bottom:0
  //     }
  // })

  let value = 216908 / 999999
  let option = {
    title: {
      text: '水球图',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 25,
        color: 'rgb(97, 142, 205)',
      },
    },
    angleAxis: {
      polarIndex: 0,
      min: 0,
      max: 100,
      show: false,
      // startAngle:90,
      clockwise: false,
    },
    radiusAxis: {
      type: 'category',
      min: 10,
      max: 10,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    polar: {
      center: ['50%', '50%'], //中心点位置
      radius: '180', //图形大小
    },
    series: [
      {
        type: 'liquidFill',
        radius: '60%',
        center: ['50%', '50%'],
        data: [value, value / 1.1, value / 1.2], // data个数代表波浪数
        backgroundStyle: {
          borderWidth: 1,
          color: 'transparent',
        },
        label: {
          formatter: [
            '{a|216908}{b| 人}',
            `{c|已用   ${(value * 100).toFixed(2)}%}`,
          ].join('\n'),

          rich: {
            a: {
              fontSize: 25,
              fontFamily: 'DS',
              color: '#03F0FF',
            },
            b: {
              fontSize: 14,
              color: '#1279A9',
            },
            c: {
              fontSize: 11,
              color: '#B7C9E3',
              height: 30,
            },
          },
        },
        outline: {
          show: false,
        },
      },
      {
        type: 'bar',
        z: 10,
        name: '外环',
        data: [value * 100],
        showBackground: true,
        backgroundStyle: {
          color: 'skyblue',
        },
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 15,
        itemStyle: {
          normal: {
            color: {
              // 完成的圆环的颜色
              colorStops: [
                {
                  offset: 0,
                  color: '#A098FC', // 0% 处的颜色
                },
                {
                  offset: 0.3,
                  color: '#4386FA', // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: '#4FADFD', // 0% 处的颜色
                },
                {
                  offset: 0.8,
                  color: '#0CD3DB', // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: '#646CF9', // 100% 处的颜色
                },
              ],
            },
          },
        },
      },
    ],
  }

  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.box {
  margin-top: 10px;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;

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

    .right {
      float: right;
      color: white;
      font-size: 20px;
    }
  }

  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;

    span {
      margin: 10px 2px;
      flex: 1;
      height: 45px;
      text-align: center;
      line-height: 45px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 20px;
    }
  }

  .charts {
    width: 100%;
    height: 210px;
  }
}
</style>
