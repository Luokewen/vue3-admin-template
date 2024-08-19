<template>
  <div class="box">
    <div class="top">
      <p class="title">预约渠道数据统计</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const charts = ref()
const echartData = [
  {
    value: 6,
    name: '自定义',
    itemStyle: {
      color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        { offset: 0, color: 'rgba(61, 180, 255, 0.3)' },
        { offset: 1, color: 'rgba(61, 180, 255, 1)' },
      ]),
    },
  },
  {
    value: 5,
    name: '恒值',
    itemStyle: {
      color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        { offset: 0, color: 'rgba(37, 255, 243, 0.3)' },
        { offset: 1, color: 'rgba(37, 255, 243, 1)' },
      ]),
    },
  },
  {
    value: 8,
    name: '突变',
    itemStyle: {
      color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        { offset: 0, color: 'rgba(45, 218, 156, 0.3)' },
        { offset: 1, color: 'rgba(45, 218, 156, 1)' },
      ]),
    },
  },
  {
    value: 6,
    name: '坏值',
    itemStyle: {
      color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        { offset: 0, color: 'rgba(255, 222, 104, 0.3)' },
        { offset: 1, color: 'rgba(255, 222, 104, 1)' },
      ]),
    },
  },
  // {
  //     value: 3,
  //     name: "零值",
  //     itemStyle: {
  //         color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
  //             { offset: 0, color: 'rgba(149, 99, 255, 0.3)' },
  //             { offset: 1, color: 'rgba(149, 99, 255, 1)' }
  //         ])
  //     }
  // },
  // {
  //     value: 2,
  //     name: "阈值",
  //     itemStyle: {
  //         color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
  //             { offset: 0, color: 'rgba(216, 255, 104, 0.3)' },
  //             { offset: 1, color: 'rgba(216, 255, 104, 1)' }
  //         ])
  //     }
  // },
]

// 自定义legend的图标
const legendData = [
  {
    name: '自定义',
    icon: 'image://data:image/png;base64,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',
  },
  {
    name: '恒值',
    icon: 'image://data:image/png;base64,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',
  },
  {
    name: '突变',
    icon: 'image://data:image/png;base64,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',
  },
  {
    name: '坏值',
    icon: 'image://data:image/png;base64,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',
  },
  // {
  //     name: "零值",
  //     icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAAXNSR0IArs4c6QAABjFJREFUWEfFl0uIXUkZx39fVZ1z7qtvP8aM6TgBFXWRKC5GdJuViqsZJK7FaOKQAUfcuMt150YcUZkxGnE9jYwy4ANdBLIaIbgxYRCJwWHS0cz04+Y+zqvqM3Xv7c7tTnemR4Q5cKE5VJ9f/b/6Hv8S3sdH3kc27wGuk7UKfK/36P9duoTGtw8/KHHpY58jwFV6PeTUDeTmPWT1E8jyJnJtgHx87tMbHXR1GV3/O3rjGHr6NNrrxb0evolD4YpKVBihf76F+eSTmLqD8Q3MSoKpHWZUIq10EgyKIWpLQvEU3r1ByE4SljcJN0+jMSoij27iQPgOGDArr2Ozk9hiiHNd7HBA4hSrBuP8NMqSEUwgeMHXA/ziAtX2IvU/3yA8McZzhnCph8q+KDwC3wGvvoZd/xT2WAtXjnBWSLBkAokISaVY6xETEBW8JATNqTRQJYayYSmtp7pl8dym5iqhN0mZhxF4BN7rqbnzGvZEBA9xRZc086QGGjU01JCFQOoMThQJARFLkEDtDaUECrGMxVNISaFLVPdG1A83IGEnVfbAo+q1s5i7A5z9CElRkEpBRkrTCC3naaqliSfDkUiNnVWAByoshXjGtWWcKKOiZKwZhS8psiXq43epv7JG2FG/B95DzerT2PWnSRZL0hQaYmj5QDsIC4nQUjih8IzAZxGOT84c3grKdTH8RmvWMQw0MFBlZIVhCbkOKdq3qNev43tM1c/BVV6Jqo/j2kPSsqKZW1rG0rHKgipdEb4owjeBxkEFLFCq8uOg/Ek8fZ9wP3gGtWcUEsbNdcprHeq1NYmR2gvvncGyQNpt0HCLtKSmo4GuMSyK4QsI33m3xjE5BuVFAr8LgW3n2L5fMExKRjzFuP9Xqt5VfAz9rvJ43pfP4+pNMt+hKVExLARlSZQPq/BzgfQocCBHuaDCbSNs+YL76hhsDBivLlNcuEy9Bx6z/NQN3N2UhhfaTUfHw5J1LNWB50R4dhes5MDzZeDX6ZCaLudQvo88PA5VXiXwksCWhS0P933FaKMkv7RGFWt+V3mEr7xOMjpJo13TjqHWwBKGZQm8jHByTvULF6/Ij+aj8NOv6TmEX8xt8C01nCewKRVbhdAvxwxaA/KNz1H1ehIegfsP0rSOTmrpVjXLBlaAV2FaVpOnz8LFNRnMw3/4VV1KLZtz72JSPUvgHQ9blPT9kIEtGG/8/gGcx8BNxaI6lhRW7D546Vn+9q9ka4/ys9qhy/15uDE8U0flNVuhZtsnDOy/HwPPTtIY5nQypavJbtgvI3xoLqRfv/hLubIHfk6/Bby4807hXwjPxbBXFVs6H/b9yic9/SzJynEafpN2YliQeO6OJfYnXMxm+C59rpRtXGr4MsJP5ut/knCGl6JqDWyLoX9owkX4hfO4T89KrajpZAldIyzGUgN+Np/Njys5VUoxfEOV20HZlop+LLWiZtS9SXnh+r5S48HE22kyTy6Q5Y5WVG9goYIlZ/iSCC8cqc6VH6jhj1F1VCw1A60Z5RV5/94BTSbCJ+11gGuvkm5UNF1sr56OTWbt1fB5lOdFDm02uSovq/IHEfpe9rXXNuW1uwe2V9gZLJwgGT0xHSyloeUCbTF06kDHGFbNdLB8BuHEJBLKXYW/IPwWz504WBLHwNcMNTCKg2X7HcrVO1SHDJbJV3bVFx/A2ZwssTRsi0ZV0XINmhpoImREU6GzkSqxV1OhFGIYm8A4TjQ/Iq88uW9QZG9TT4fKISM14mOni/aJ27joYuJMj2aihIabmYnoZqzB+RlclKBQxV80Ew7yAHkxpMygvNeemYkzD9xM7xAzMU2mqVvlKmalid3okGQJSTvah5JMmiRJjfMOV1TEjZIIPsnwlafW8dRG5ZYy9v0IvpPiT1yOc/xdbNT+DZw6htnMce4YtshxjQw3VqwJ2CqdjuR2IOQ7BtLgXU690aZeeRO/MTOQB9nox/r2mICnziKby5jizal17scen2JWS2TUnsKLFG3NrPO9nLBS4//2H8LmRwmvrDEbIEe0zntr+cEx7JiOM5h4aVjfRFYGCB8D/jFdPX9piFaZBzG+FM/wf7k0HNxMpiN4dzOzRRES/3wvV6W964/Uuv6/i/4LMOYpTa2D60EAAAAASUVORK5CYII=",
  // },
  // {
  //     name: "阈值",
  //     icon: "image://data:image/png;base64,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",
  // }
]
onMounted(() => {
  const myCharts = echarts.init(charts.value)
  let option = {
    title: {
      text: `{value|${echartData.reduce((a, b) => a + b.value, 0)}}\n{name|告警总数}`,
      left: 240,
      top: 'center',
      padding: [0, 0],
      textStyle: {
        rich: {
          name: {
            fontSize: 20,
            color: '#BCE6FF',
            align: 'center',
          },
          value: {
            fontSize: 54,
            color: '#fff',
            align: 'center',
          },
        },
      },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(9, 24, 48, 0.8)', // 提示框的背景颜色
      borderColor: 'rgba(75, 253, 238, 0.6)', // 提示框的边框颜色
      textStyle: {
        // 提示框文字颜色
        color: '#C5E5F9',
        fontSize: 18,
      },
    },
    legend: {
      orient: 'vertical',
      left: 30,
      top: 'center',
      itemGap: 20,
      itemWidth: 28,
      itemHeight: 28,
      data: legendData,
      formatter: function (val: any) {
        //@ts-ignore
        return `{title|${val}}{value|${echartData.find((item) => item.name === val).value}}`
      },
      textStyle: {
        rich: {
          title: {
            fontSize: 16,
            color: '#BCE6FF',
          },
          value: {
            fontSize: 18,
            color: '#fff',
            padding: [0, 0, 0, 10],
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        roseType: 'radius', // 控制是否显示饼图大小不同的效果
        padAngle: 5, // 间隔
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        radius: ['75%', '90%'],
        center: ['59%', '50%'],
        data: echartData,
      },
    ],
  }
  myCharts.setOption(option)
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
    height: calc(100% - 40px);
    box-sizing: border-box;
  }
}
</style>
