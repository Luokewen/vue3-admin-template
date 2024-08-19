<template>
  <div class="map" ref="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'
//获取DOM元素
let map = ref()
//注册中国地图
echarts.registerMap('china', chinaJSON as any)

const series = [
  {
    type: 'map',
    map: 'china',
    //    width: '100%',
    zoom: 1.5,
    top: 250,
    geoIndex: 1,
    zlevel: 1,
    //    aspectScale: 0.75, //长宽比
    showLegendSymbol: false, // 存在legend时显示
    label: {
      normal: {
        show: false,
      },
      emphasis: {
        show: false,
        textStyle: {
          color: '#fff',
        },
      },
    },
    roam: false,
    itemStyle: {
      normal: {
        areaColor: 'rgba(128, 128, 128, 0)',
        borderColor: '#49a7d5', //省市边界线00fcff 516a89
      },
      emphasis: {
        areaColor: 'rgba(128, 128, 128, 0)',
      },
    },
    data: [
      {
        name: '南海诸岛',
        value: 0,
        itemStyle: {
          normal: {
            opacity: 0,
            label: {
              show: false,
            },
          },
        },
      },
    ],
  },
  {
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 4,
    symbolSize: 30,
    label: {
      normal: {
        show: true,
        position: 'right',
        formatter: '{b}',
        color: 'white',
      },
    },
    itemStyle: {
      normal: {
        color: '#c9b972',
      },
    },
    rippleEffect: {
      scale: 10,
      brushType: 'stroke',
    },
    data: [
      {
        name: '',
        value: [87.568283, 43.857571],
        visualMap: false,
      },
    ],
  },
]

onMounted(() => {
  let myChart = echarts.init(map.value)

  let option: any = {
    tooltip: {
      trigger: 'item',
    },
    geo: {
      map: 'china',
      zoom: 1.5,
      label: {
        show: true,
        color: 'white',
        emphasis: {
          show: false,
        },
      },
      roam: false,
      top: 250,
      itemStyle: {
        normal: {
          borderColor: 'rgba(147, 235, 248, 1)',
          borderWidth: 1,
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
          shadowColor: 'rgba(128, 217, 248, 1)',
          // shadowColor: 'rgba(255, 255, 255, 1)',
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10,
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0,
        },
      },
    },
    series: series,
  }
  myChart.setOption(option)
})
</script>

<style scoped></style>
