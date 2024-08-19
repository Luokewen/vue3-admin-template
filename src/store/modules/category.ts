//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
//引入分类的接口方法
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'
//引入获取商品分类的接口方法
let useCategoryStore = defineStore('category', {
  state: (): CategoryState => {
    return {
      category1List: [],
      c1Id: '',
      category2List: [],
      c2Id: '',
      category3List: [],
      c3Id: '',
    }
  },
  actions: {
    async getC1() {
      const result: CategoryResponseData = await reqC1()
      if (result.code == 200) {
        this.category1List = result.data
      }
    },
    async getC2() {
      const result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code == 200) {
        this.category2List = result.data
      }
    },
    async getC3() {
      const result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code == 200) {
        this.category3List = result.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
