import { createApp } from 'vue'
//引入element-plus配置与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//element-plus国际化配置
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from '@/App.vue'
import allGlobalComponents from '@/components/index.ts'
// 本地SVG图标
import 'virtual:svg-icons-register'
//引入模板的全局样式
import '@/styles/index.scss'
//引入路由
import router from '@/router/index.ts'

//引入pinia
import pinia from '@/store/index.ts'

//引入路由鉴权
import './permission'

import 'element-plus/theme-chalk/dark/css-vars.css'

//获取应用实例对象
const app = createApp(App)
//安装ElementPlus插件
app.use(ElementPlus, {
  locale: zhCn, //国际化配置
})

//全局注册组件
app.use(allGlobalComponents)

//注册路由
app.use(router)

//安装pinia
app.use(pinia)

//引入自定义指令
import { isHasButton } from '@/directive/has.ts'
isHasButton(app)
//挂载应用实例
app.mount('#app')
