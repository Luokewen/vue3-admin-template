<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" v-if="flag" />
      </transition>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()

//控制组件是否销毁
let flag = ref(true)

// 监听路由变化
watch(
  () => layoutSettingStore.refresh,
  () => {
    //点击刷新按钮路由组件销毁
    flag.value = false
    //组件销毁后重新渲染
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped>
/* 路由切换动画 */
/* fade-transform */
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}

/* 可能为enter失效，拆分为 enter-from和enter-to */
.fade-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
