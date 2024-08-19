//layout组件相关配置仓库
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //控制菜单折叠和收起
      refresh: false, //控制菜单刷新
    }
  },
})

export default useLayoutSettingStore
