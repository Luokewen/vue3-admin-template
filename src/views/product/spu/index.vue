<template>
  <div>
    <Category :isShow="isShow"></Category>
    <el-card style="margin: 10px 0" :data="records">
      <div v-show="scene == 0">
        <el-button
          @click="addSpu"
          type="primary"
          size="default"
          icon="plus"
          :disabled="CategoryStore.c3Id ? false : true"
          v-has="`btn.Spu.add`"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="SPU操作">
            <template #default="{ row }">
              <el-button
                type="success"
                size="small"
                icon="document"
                @click="addSku(row)"
                v-has="`btn.Spu.addsku`"
              >
                添加SKU
              </el-button>
              <el-button
                type="warning"
                size="small"
                icon="edit"
                @click="updateSpu(row)"
                v-has="`btn.Spu.update`"
              >
                修改SPU
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="View"
                @click="findSku(row)"
                v-has="`btn.Spu.skus`"
              >
                查看SKU列表
              </el-button>
              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                width="200px"
                @confirm="removeSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="delete"
                    v-has="`btn.Spu.delete`"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper,->,total, sizes"
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </div>
      <!-- spu添加和修改的对话框 -->
      <spuForm
        ref="spu"
        v-show="scene == 1"
        @changeScene="changeScene"
      ></spuForm>
      <!-- sku添加的对话框 -->
      <skuForm
        ref="sku"
        v-show="scene == 2"
        @changeScene="changeScene"
      ></skuForm>
      <!-- dialog对话框展示已有的SKU数据 -->
      <el-dialog title="SKU列表" v-model="show">
        <el-table border :data="skuArr">
          <el-table-column label="名称" prop="skuName"></el-table-column>
          <el-table-column label="价格(元)" prop="price"></el-table-column>
          <el-table-column label="重量(KG)" prop="weight"></el-table-column>
          <el-table-column label="默认图片">
            <template #default="{ row }">
              <img
                :src="row.skuDefaultImg"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type {
  HasSpuResponseData,
  Records,
  SpuData,
  SkuInfoData,
} from '@/api/product/spu/type'
import { ref, watch, onBeforeUnmount } from 'vue'
//引入分类的仓库
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu, reqSkuInfo, reqDeleteSpu } from '@/api/product/spu'
//引入子组件
import spuForm from './spuForm.vue'
import skuForm from './skuForm.vue'
import { ElMessage } from 'element-plus'

let CategoryStore = useCategoryStore()
let isShow = ref<boolean>(true)
let pageNo = ref<number>(1)
let limit = ref<number>(3)
//存储已有spu数据
let records = ref<Records>([])
//存储spu总个数
let total = ref<number>(0)
//存储全部的SKU数据
let skuArr = ref<any>([])
let show = ref<boolean>(false)

const spu = ref<any>()
const sku = ref<any>()
//场景切换
let scene = ref<number>(0)

//监听三级分类ID变化
watch(
  () => CategoryStore.c3Id,
  () => {
    if (!CategoryStore.c3Id) return
    getHasSpu()
  },
)

//获取已有的spu数据
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    limit.value,
    CategoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
//分页器下拉菜单发生变化时触发
const changeSize = () => {
  getHasSpu()
}

//添加spu
const addSpu = () => {
  scene.value = 1
  spu.value.initAddSpu(CategoryStore.c3Id)
}

//修改spu
const updateSpu = (row: SpuData) => {
  scene.value = 1
  spu.value.initHasSpuData(row)
}

//添加Sku
const addSku = (row: SpuData) => {
  scene.value = 2
  sku.value.initSkuData(CategoryStore.c1Id, CategoryStore.c2Id, row)
}

//查看sku列表
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuInfo(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    //显示对话框
    show.value = true
  }
}

//删除已有的SPU
const removeSpu = async (row: SpuData) => {
  let result = await reqDeleteSpu(row.id as number)
  if (result.code == 200) {
    ElMessage.success('删除成功')
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage.error('删除失败')
  }
}

//路由组件销毁前清空仓库数据
onBeforeUnmount(() => {
  CategoryStore.$reset()
})
//切换场景
const changeScene = (obj: any) => {
  scene.value = obj.flag
  if (obj.params == 'update') {
    //更新留在当前页
    getHasSpu(pageNo.value)
  } else {
    getHasSpu()
  }
}
</script>

<style scoped></style>
