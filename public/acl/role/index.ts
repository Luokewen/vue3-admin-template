import request from '@/utils/request'
import { RoleData, MenuResponseData } from './type'
enum API {
  // 获取角色信息
  ALL_ROLE_URL = '/admin/acl/role/',
  // 添加角色
  ADD_ROLE_URL = '/admin/acl/role/save',
  // 修改角色
  UPDATE_ROLE_URL = '/admin/acl/role/update',
  //根据角色获取菜单
  GET_MENU_BY_ROLE_URL = '/admin/acl/permission/toAssign/',
  //给角色分配权限
  ASSIGN_PERMISSION_URL = '/admin/acl/permission/doAssign?',
  //删除角色
  DELETE_ROLE_URL = '/admin/acl/role/remove/',
}

//获取全部角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, any>(
    API.ALL_ROLE_URL + `${page}/${limit}?roleName=${roleName}`,
  )
//新增或修改角色
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_ROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADD_ROLE_URL, data)
  }
}
//根据角色获取菜单
export const reqGetMenuByRole = (roleId: number) =>
  request.get<any, MenuResponseData>(API.GET_MENU_BY_ROLE_URL + roleId)
//给角色分配权限
export const reqAssignPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.ASSIGN_PERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
//删除角色
export const reqDeleteRole = (roleId: number) =>
  request.delete<any, any>(API.DELETE_ROLE_URL + roleId)
