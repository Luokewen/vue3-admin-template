//SPU管理模块接口
import request from '@/utils/request'
import type {
  SkuInfoData,
  SkuData,
  SpuData,
  HasSpuResponseData,
  AllTradeMark,
  AllSpuImage,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from './type'
enum API {
  //获取已有的SPU数据
  HAS_SPU_URL = '/admin/product/',
  //获取全部品牌的数据
  ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  //获取某个SPU下售卖商品的图片数据
  SPU_IMAGE_URL = '/admin/product/spuImageList/',
  //获取某个SPU下全部已有的销售属性接口地址
  HAS_SPU_SALE_URL = '/admin/product/spuSaleAttrList/',
  //获取整个项目全部的销售属性
  ALL_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
  //追加一个新的SPU
  ADD_SPU_URL = '/admin/product/saveSpuInfo',
  //更新已有的SPU
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
  //追加一个新的SKU地址
  ADD_SKU_URL = '/admin/product/saveSkuInfo',
  //查看某一个已有的SPU下的SKU商品
  SKU_INFO_URL = '/admin/product/findBySpuId/',
  //删除已有的SPU
  DELETE_SPU_URL = '/admin/product/deleteSpu/',
}

//获取已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, HasSpuResponseData>(
    API.HAS_SPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
//获取全部品牌的数据
export const reqAllTrademark = () =>
  request.get<any, AllTradeMark>(API.ALL_TRADEMARK_URL)
//获取某个SPU下售卖商品的图片数据
export const reqSpuImage = (spuId: number | string) =>
  request.get<any, AllSpuImage>(API.SPU_IMAGE_URL + spuId)
//获取某个SPU下全部已有的销售属性接口地址
export const reqHasSpuSale = (spuId: number | string) =>
  request.get<any, SaleAttrResponseData>(API.HAS_SPU_SALE_URL + spuId)
//获取整个项目全部的销售属性
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALL_SALE_ATTR_URL)
//追加或更新SPU
export const reqAddOrUpdateSpu = (data: SpuData) =>
  request.post<any, any>(data.id ? API.UPDATE_SPU_URL : API.ADD_SPU_URL, data)
//追加一个新的SKU地址
export const reqAddSku = (data: SkuData) =>
  request.post<any, any>(API.ADD_SKU_URL, data)
//查看某一个已有的SPU下的SKU商品
export const reqSkuInfo = (spuId: number | string) =>
  request.get<any, SkuInfoData>(API.SKU_INFO_URL + spuId)
//删除已有的SPU
export const reqDeleteSpu = (spuId: number | string) =>
  request.delete<any, any>(API.DELETE_SPU_URL + spuId)
