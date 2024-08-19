<template>
  <div class="tabbar">
    <div class="tabber_left">
      <breadcrumb></breadcrumb>
    </div>
    <div class="tabber_right">
      <setting></setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import breadcrumb from './breadcrumb/index.vue'
import setting from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;

  .tabber_left {
    display: flex;
    align-items: center;
  }
  .tabber_right {
    display: flex;
    align-items: center;
  }
}
</style>
