//mock接口的类型配置
/*
//登录接口需要携带的参数类型
export interface LoginForm {
    username: string,
    password: string
}

interface dataType {
    token?: string,
    message?: string
}

//登录接口返回的数据类型
export interface LoginResponse {
    code: number,
    data: dataType
}

//定义服务器返回用户信息相关的数据类型

interface userInfo{
    userID: number,
    avatar: string,
    username: string,
    password: string,
    desc:string,
    roles: string[],
    buttons:string[],
    routes: string[],
    token:string
}

interface user {
    checkUser:userInfo
}

export interface UserResponseData {
    code:number,
    data:user
}
*/

//定义用户相关的ts类型
//用户登录接口携带参数的ts类型
export interface LoginFormData {
  username: string
  password: string
}

//全部接口返回数据的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//用户登录接口返回数据的ts类型
export interface LoginResponseData extends ResponseData {
  data: string
}

//用户信息接口返回数据的ts类型
export interface UserInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
