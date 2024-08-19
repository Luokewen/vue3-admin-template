//返回的接口类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//SPU数据的ts类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null | SaleAttr[]
  spuImageList: null | SpuImage[]
}

export type Records = SpuData[]

//获取已有的SPU返回的数据类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

//品牌数据的ts类型
export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}

//品牌接口返回的ts类型
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}

//图片数据的ts类型
export interface SpuImage {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number | string
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}

//图片接口返回的ts类型
export interface AllSpuImage extends ResponseData {
  data: SpuImage[]
}

//已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}

//存储已有的销售属性值的数组
export type spuSaleAttrValueList = SaleAttrValue[]

//已有的销售属性对象ts类型
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}

//已有的销售属性接口返回的ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

//已有的全部SPU的返回数据类型
export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
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

//获取SKU数据接口的数据类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
