//获取SKU商品详情接口的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface SkuData {
  category3Id: number | string
  spuId: number | string
  tmId: number | string
  skuName: string
  price: number | string
  weight: number | string
  skuDesc: string
  skuDefaultImg: string
  skuAttrValueList: [
    {
      attrId?: number | string
      valueId?: number | string
    },
  ]
  skuSaleAttrValueList: [
    {
      saleAttrId?: number | string
      saleAttrValueId?: number | string
    },
  ]
}

export interface SkuInfoData extends ResponseData {
  data: SkuData
}
