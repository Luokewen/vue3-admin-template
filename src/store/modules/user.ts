//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
//引入类型
import type {
  LoginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from '@/api/user/type'
import { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入常量路由
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
//引入路由实例
import router from '@/router'
//引入深拷贝方法
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoutes: any, routes: any) {
  return asyncRoutes.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

//创建用户小仓库
let useUserStore: any = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //存储生成菜单需要的数组（动态路由）
      username: '',
      avatar: '',
      //存储用户是否包含按钮
      buttons: [],
    }
  },
  //小仓库修改数据的地方
  actions: {
    //用户登陆的方法
    async userLogin(data: LoginFormData) {
      //登录请求
      let result: LoginResponseData = await reqLogin(data)
      if (result.code == 200) {
        //pinia仓库存储一下token
        this.token = result.data as string
        //本地持久化存储一份
        SET_TOKEN(result.data as string)
        //能保证async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息
      let result: UserInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        //存储用户名和头像
        this.username = result.data.name
        this.avatar = result.data.avatar
        //存储用户按钮权限
        this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由
        let userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes,
        )
        //菜单的数据
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        //注册动态路由
        ;[...userAsyncRoute, anyRoute].forEach((item: any) => {
          router.addRoute(item)
        })
        //返回用户信息
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      let result: any = await reqLogout()
      //退出登陆请求
      if (result.code == 200) {
        //清除本地存储的token
        REMOVE_TOKEN()
        //清除pinia中的token
        this.token = ''
        //清除pinia中的用户名和头像
        this.username = ''
        this.avatar = ''
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }

      //目前没有mock接口,退出登陆接口(通知服务器本地用户唯一标识失效)
      /*
            //清除本地存储的token
            REMOVE_TOKEN
            //清除pinia中的token
            this.token = '';
            //清除pinia中的用户名和头像
            this.username = '';
            this.avatar = '';   
            */
    },
  },
  //小仓库计算属性
  getters: {},
})

//对外暴露小仓库
export default useUserStore
