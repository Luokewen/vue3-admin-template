import request from '@/utils/request'
import type { PermissionResponseData, MenuParams } from './type'

enum API {
  // 获取菜单与按钮的标识数据
  ALL_PERMISSION_URL = '/admin/acl/permission',
  //给某一级菜单新增一个子菜单
  ADD_CHILD_URL = '/admin/acl/permission/save',
  //更新一个已有的菜单
  UPDATE_URL = '/admin/acl/permission/update',
  //删除一个已有的菜单
  DELETE_URL = '/admin/acl/permission/remove/',
}

// 获取菜单与按钮的标识数据
export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALL_PERMISSION_URL)
//添加与更新菜单的方法
export const reqAddOrUpdatePermission = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADD_CHILD_URL, data)
  }
}

//删除菜单的方法
export const reqDeletePermission = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
