//品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
//品牌管理模块接口地址

enum API {
  //获取已有的品牌的接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌接口
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改品牌接口
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  //删除品牌接口
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

//获取已有品牌的接口方法
//page:当前页码   ---默认第一页
//limit:每页显示条数   ---默认3条
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

//添加与修改品牌接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) =>
  request.post<any, any>(
    data.id ? API.UPDATETRADEMARK_URL : API.ADDTRADEMARK_URL,
    data,
  )

//删除品牌接口方法
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETETRADEMARK_URL + id)
