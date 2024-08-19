<template>
  <el-card>
    <el-form :inline="true" :disabled="!isShow">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          style="width: 240px"
          v-model="categoryStore.c1Id"
          @change="handler"
        >
          <el-option
            v-for="item in categoryStore.category1List"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          style="width: 240px"
          v-model="categoryStore.c2Id"
          @change="handler1"
        >
          <el-option
            v-for="item in categoryStore.category2List"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          style="width: 240px"
          v-model="categoryStore.c3Id"
        >
          <el-option
            v-for="item in categoryStore.category3List"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
//引入分类相关仓库
import useCategoryStore from '@/store/modules/category'
//子组件接受数据
//@ts-ignore
const props = defineProps(['isShow'])

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getC1()
})

const handler = () => {
  categoryStore.getC2()
  categoryStore.category3List = []
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
}

const handler1 = () => {
  categoryStore.getC3()
  categoryStore.c3Id = ''
}
</script>

<style scoped></style>
