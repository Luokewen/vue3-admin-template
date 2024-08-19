<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: foldStore.fold ? true : false }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <!-- 根据路由动态生成菜单 -->
        <el-menu
          :collapse="foldStore.fold"
          :default-active="router.path"
          background-color="black"
          text-color="white"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: foldStore.fold ? true : false }">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容区域 -->
    <div class="layout_main" :class="{ fold: foldStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入logo子组件
import Logo from './Logo/index.vue'
//引入Menu子组件
import Menu from './Menu/index.vue'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
//右侧内容展示区域
import Main from './Main/index.vue'
//获取用户信息
const userStore = useUserStore()
//引入顶部导航栏
import Tabbar from './Tabbar/index.vue'
//获取路由对象
import { useRoute } from 'vue-router'
const router = useRoute()
//获取折叠菜单的状态
import useLayoutSettingStore from '@/store/modules/setting'
let foldStore = useLayoutSettingStore()
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      color: white;

      .el-menu {
        border-right: none;
        height: 100%;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    z-index: 999;
    width: calc(100% - $base-menu-width);
    height: $base-tabber-height;
    transition: all 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-height);
    left: $base-menu-width;
    top: $base-tabber-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
}
</style>
