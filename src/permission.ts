//路由的鉴权
import router from './router'
//引入进度条
import NProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//获取仓库中的token
import useUserStore from '@/store/modules/user'
import pinia from './store'
import setting from './setting'
let userStore = useUserStore(pinia)
//全局守卫
//全局前置守卫
//@ts-ignore
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title}-${to.meta.title}`
  //判断是否登录
  NProgress.start()
  let token = userStore.token
  //获取用户信息
  let username = userStore.username
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      //有用户信息放行
      if (username) {
        next()
      } else {
        //没有用户信息，获取用户信息
        try {
          //获取用户信息后放行
          await userStore.userInfo()
          //刷新的时候是异步的，需要等待获取用户信息后再放行
          next({ ...to })
        } catch (error) {
          //token过期：获取不到用户信息
          //用户手动修改本地存储token
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
//@ts-ignore
router.afterEach((to, from) => {
  NProgress.done()
})
