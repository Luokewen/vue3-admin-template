//属性相关的API

import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, AttrObj } from './type'
//属性管理模块接口地址
enum API {
  //获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  //获取二级分类接口地址
  C2_URL = '/admin/product/getCategory2/{category1Id}',
  //获取三级分类接口地址
  C3_URL = '/admin/product/getCategory3/{category2Id}',
  //获取属性接口地址
  ATTR_URL = '/admin/product/attrInfoList/',
  //添加或修改已有属性的接口
  ADD_OR_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo',
  //删除属性接口
  DELETE_ATTR_URL = '/admin/product/deleteAttr/',
}

//获取一级分类接口的方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
//获取二级分类接口的方法
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(
    API.C2_URL.replace('{category1Id}', category1Id.toString()),
  )
//获取三级分类接口的方法
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(
    API.C3_URL.replace('{category2Id}', category2Id.toString()),
  )
//获取属性接口的方法
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )
//新增或修改已有属性的接口
export const reqAddOrUpdateAttr = (data: AttrObj) =>
  request.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, data)
//删除属性接口
export const reqDeleteAttr = (attrId: number | string) =>
  request.delete<any, any>(API.DELETE_ATTR_URL + attrId)
