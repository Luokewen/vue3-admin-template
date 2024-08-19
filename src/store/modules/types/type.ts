import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
//定义小仓库数据state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}

//定义分类对象state的对象的ts类型
export interface CategoryState {
  c1Id: string | number
  c2Id: string | number
  c3Id: string | number
  category1List: CategoryObj[]
  category2List: CategoryObj[]
  category3List: CategoryObj[]
}
