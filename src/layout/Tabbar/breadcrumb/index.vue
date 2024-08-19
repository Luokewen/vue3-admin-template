<template>
  <el-icon size="20" @click="changeIcon" class="icon">
    <component :is="LayoutSetting.fold ? 'Fold' : 'Expand'" />
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in router.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon style="margin-right: 3px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑展示匹配路由的标题 -->
      <span>
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
let LayoutSetting = useLayoutSettingStore() //用于控制菜单折叠

//获取路由对象
let router = useRoute()

// 点击展开收起
const changeIcon = () => {
  LayoutSetting.fold = !LayoutSetting.fold
}
</script>

<style scoped lang="scss">
.icon {
  margin-right: 10px;
  cursor: pointer;
}

.icon:hover {
  color: #409eff;
}
</style>
