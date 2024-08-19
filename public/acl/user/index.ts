//用户管理模块接口
import request from '@/utils/request'
import type { UserResponseData, User, RoleResponseData } from './type'

enum API {
  //获取全部已有的账号信息
  GET_ALL_USER = '/admin/acl/user/',
  //添加用户账号信息
  ADD_USER = '/admin/acl/user/save',
  //修改用户账号信息
  UPDATE_USER = '/admin/acl/user/update',
  //获取全部职位，当前账号拥有的职位接口
  GET_ALL_ROLE = '/admin/acl/user/toAssign/',
  //给用户分配角色
  ASSIGN_ROLE = '/admin/acl/user/doAssignRole',
  //删除某一个账号
  DELETE_USER = '/admin/acl/user/remove/',
  //批量删除的接口
  DELETE_BATCH_USER = '/admin/acl/user/batchRemove',
}

//获取用户账号信息的接口方法
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.GET_ALL_USER + `${page}/${limit}?username=${username}`,
  )
//添加或修改用户账号信息的接口方法
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, UserResponseData>(API.UPDATE_USER, data)
  } else {
    return request.post<any, UserResponseData>(API.ADD_USER, data)
  }
}
//获取全部职位，当前账号拥有的职位接口
export const reqAllRole = (id: number) =>
  request.get<any, RoleResponseData>(API.GET_ALL_ROLE + id)
//给用户分配角色
export const reqAssignRole = (userId: number, roleIdList: number[]) =>
  request.post<any, any>(API.ASSIGN_ROLE, { userId, roleIdList })
//删除某一个账号
export const reqDeleteUser = (id: number) =>
  request.delete<any, any>(API.DELETE_USER + id)
//批量删除的接口
export const reqDeleteBatchUser = (idList: number[]) =>
  request.post<any, any>(API.DELETE_BATCH_USER, idList)
