import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
//引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局对象
const allGlobalComponents: any = {
  SvgIcon,
  Category,
}

// 对外暴露插件对象
export default {
  install(app: any) {
    // 注册全局组件
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })
    // 注册element-plus图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
