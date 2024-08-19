//统一管理项目用户相关的接口
import request from '@/utils/request'
import type {
  LoginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from './type'
//mock接口
/*
import type { LoginForm, LoginResponse,UserResponseData } from './type'
//统一管理接口
enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}
//对外暴露请求函数
//登陆的接口方法
export const reqLogin = (data: LoginForm) => request.post<any, LoginResponse>(API.LOGIN_URL, data)
//获取用户信息的接口方法
export const reqUserInfo = () => request.get<any,UserResponseData>(API.USERINFO_URL)
*/

//真实接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
//登陆接口
export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

//获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL)

//退出登陆接口
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
