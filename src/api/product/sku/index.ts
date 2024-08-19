//SKU管理模块接口
import request from '@/utils/request'
import type { SkuInfoData } from './type'

enum API {
  //获取SKU列表
  GET_SKU_LIST = '/admin/product/list/',
  //上架
  SALE_URL = '/admin/product/onSale/',
  //下架
  OFF_SALE_URL = '/admin/product/cancelSale/',
  //获取商品详情
  GET_SKU_INFO = '/admin/product/getSkuInfo/',
  //删除
  DELETE_SKU = '/admin/product/deleteSku/',
}

//获取SKU列表
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, any>(API.GET_SKU_LIST + `${page}/${limit}`)
//上架
export const reqSale = (skuId: number) =>
  request.get<any, any>(API.SALE_URL + skuId)
//下架
export const reqOffSale = (skuId: number) =>
  request.get<any, any>(API.OFF_SALE_URL + skuId)
//获取商品详情
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.GET_SKU_INFO + skuId)
//删除
export const reqDeleteSku = (skuId: number) =>
  request.delete<any, any>(API.DELETE_SKU + skuId)
