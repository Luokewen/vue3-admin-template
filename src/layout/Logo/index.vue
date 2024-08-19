<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p v-show="!foldStore.fold" class="delayed-appear">
      {{ foldStore.fold ? '' : setting.title }}
    </p>
  </div>
</template>

<script setup lang="ts">
//引入logo和标题的配置文件
import setting from '@/setting'
//获取折叠菜单的状态
import useLayoutSettingStore from '@/store/modules/setting'
let foldStore = useLayoutSettingStore()
</script>

<style scoped lang="scss">
.logo {
  width: auto;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 14px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-menu-logo-title-fontSize;
    margin-left: 10px;
    font-weight: 600;
  }

  p.delayed-appear {
    opacity: 0;
    animation: appear 0.2s ease forwards 0.2s;
  }

  @keyframes appear {
    to {
      opacity: 1;
    }
  }
}
</style>
