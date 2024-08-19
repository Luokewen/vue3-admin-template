<template>
  <div class="container">
    <!-- 数据大屏的内容区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <top></top>
      </div>
      <div class="bottom">
        <div class="left">
          <tourist class="tourist"></tourist>
          <sex class="sex"></sex>
          <age class="age"></age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <rank class="rank"></rank>
          <year class="year"></year>
          <counter class="counter"></counter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import top from './components/top/index.vue'
//引入左侧三个子组件
import tourist from './components/tourist/index.vue'
import sex from './components/sex/index.vue'
import age from './components/age/index.vue'
//引入中间两个子组件
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'

//引入右侧三个子组件
import rank from './components/rank/index.vue'
import year from './components/year/index.vue'
import counter from './components/counter/index.vue'

// 获取数据大屏展示内容盒子的DOM元素
const screen = ref()

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

//定义大屏缩放的比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

// 监听窗口大小变化，重新计算缩放比例
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;

  .screen {
    transform-origin: left top;
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;
      height: calc(100% - 40px);
      // box-sizing: border-box;
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;

        .tourist {
          flex: 1.2;
        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        flex: 2;
        display: flex;
        flex-direction: column;

        .map {
          flex: 4;
        }

        .line {
          flex: 1;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .rank {
          flex: 1.2;
        }

        .year {
          flex: 1;
        }

        .counter {
          flex: 1;
        }
      }
    }
  }
}
</style>
