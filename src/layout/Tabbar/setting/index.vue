<template>
  <el-button size="small" :icon="Refresh" circle @click="updateRefresh" />
  <el-button size="small" :icon="FullScreen" circle @click="fullScreen" />
  <el-popover :width="250" trigger="click" title="主题设置">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          @change="setColor"
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          :teleported="false"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="value1"
          active-icon="Moon"
          inactive-icon="Sunny"
          inline-prompt
          @click="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" :icon="Setting" circle />
    </template>
  </el-popover>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; border-radius: 50%; margin: 0 10px"
    alt=""
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { FullScreen, Refresh, Setting } from '@element-plus/icons-vue'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { onMounted, ref } from 'vue'
const route = useRoute()
const router = useRouter()
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const value1 = ref(false)
//刷新按钮点击的回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
//全屏按钮点击的回调
const fullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
//退出登录
const logout = async () => {
  //第一件事：需要向服务器发请求
  //第二件事：仓库中清除相关的数据
  //第三件事：跳转到登录页

  try {
    await userStore.userLogout()
    router.push({ path: '/login', query: { redirect: route.path } })
    ElNotification({
      title: '退出成功',
      message: '退出成功',
      type: 'success',
    })
  } catch (error) {
    ElNotification({
      title: '退出失败',
      message: '退出失败',
      type: 'error',
    })
  }
}

const changeDark = () => {
  if (value1.value) {
    document.documentElement.className = 'dark'
  } else {
    document.documentElement.className = ''
  }
}

//设置主题颜色
const setColor = () => {
  //本地存储存储颜色值
  localStorage.setItem('color', color.value)
  document.documentElement.style.setProperty(
    '--el-color-primary',
    localStorage.getItem('color'),
  )
}

onMounted(() => {
  if (localStorage.getItem('color')) {
    document.documentElement.style.setProperty(
      '--el-color-primary',
      localStorage.getItem('color'),
    )
  }
})
</script>

<style scoped lang="scss">
.el-dropdown {
  margin-left: 10px;
}
</style>
