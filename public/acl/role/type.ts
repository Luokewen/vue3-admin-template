export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface RoleData {
  id?: number | string
  roleName?: string
}

//菜单与按钮数据的ts类型
export interface MenuData {
  id?: number
  createTime?: string
  updateTime?: string
  pid?: number
  name?: string
  code?: string
  toCode?: string
  type?: number
  status?: null
  level?: number
  children?: MenuList
  select?: boolean
}

export type MenuList = MenuData[]

//菜单权限与按钮权限返回的ts类型
export interface MenuResponseData extends ResponseData {
  data: MenuList
}
