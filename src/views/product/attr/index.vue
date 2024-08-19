<template>
  <div>
    <Category :isShow="isShow"></Category>
    <el-card style="margin: 10px 0">
      <div v-show="isShow == true">
        <el-button
          type="primary"
          size="default"
          icon="plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr"
          v-has="`btn.Attr.add`"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            algin="center"
            width="120px"
            prop="attrName"
          >
            <template #="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="属性值名称" algin="center"></el-table-column>
          <el-table-column label="操作" algin="center" width="120px">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="edit"
                @click="updateAttr(row)"
                v-has="`btn.Attr.update`"
              ></el-button>
              <el-popover
                :title="`确定删除${row.attrName}吗？`"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="delete"
                    v-has="`btn.Attr.remove`"
                  ></el-button>
                </template>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="isShow == false">
        <!-- 添加属性与修改属性的结构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
            <el-button
              :disabled="attrParams.attrName ? false : true"
              type="primary"
              size="default"
              icon="Plus"
              style="margin-top: 10px"
              @click="addAttrValue"
            >
              添加属性值
            </el-button>
            <el-button
              type="primary"
              size="default"
              style="margin-top: 10px"
              @click="cancel"
            >
              取消
            </el-button>
            <el-table
              border
              style="margin: 10px 0"
              :data="attrParams.attrValueList"
            >
              <el-table-column
                label="序号"
                width="80px"
                type="index"
                align="center"
              ></el-table-column>
              <el-table-column label="属性值名称">
                <template #default="{ row, $index }">
                  <el-input
                    :ref="(vc: any) => (inputArr[$index] = vc)"
                    @blur="toLook(row, $index)"
                    v-if="row.flag"
                    v-model="row.valueName"
                    placeholder="请输入属性值名称"
                    size="small"
                  ></el-input>
                  <div v-else @click="toEdit(row, $index)">
                    {{ row.valueName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="属性值操作">
                <template #default="{ $index }">
                  <el-button
                    type="danger"
                    size="small"
                    icon="delete"
                    @click="attrParams.attrValueList.splice($index, 1)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              type="primary"
              size="default"
              @click="save"
              :disabled="attrParams.attrValueList.length > 0 ? false : true"
            >
              保存
            </el-button>
            <el-button type="primary" size="default" @click="cancel">
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//引入watch
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
//引入获取已有属性和属性值的接口
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
//引入分类的接口方法
import type {
  AttrResponseData,
  AttrObj,
  AttrValue,
} from '@/api/product/attr/type'
//引入elmessage
import { ElMessage } from 'element-plus'
//引入分类相关仓库
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()

//存储已有的属性和属性值
let attrArr = ref<AttrObj[]>([])
//定义card组件内容切换的变量
let isShow = ref(true)
//收集新增的属性数据
let attrParams = reactive<AttrObj>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

//存储el-input实例的数组
let inputArr = ref<any>([])

//监听三级分类id的变化
watch(
  () => categoryStore.c3Id,
  () => {
    //重置已有属性和属性值
    attrArr.value = []
    //获取已有属性值
    if (!categoryStore.c3Id) return
    getAttr()
  },
)

//获取已有属性值的变化
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}
//添加属性
const addAttr = () => {
  //每一次点击的时候先清空一下数据在收集
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })
  isShow.value = !isShow.value
  attrParams.categoryId = categoryStore.c3Id
}

//修改属性
const updateAttr = (row: AttrObj) => {
  isShow.value = !isShow.value
  //深拷贝开一个新指针，修改不同的对象
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

//取消
const cancel = () => {
  isShow.value = !isShow.value
}

//添加属性值按钮的回调
const addAttrValue = () => {
  attrParams.attrValueList.push({ valueName: '', flag: true })
  nextTick(() => {
    inputArr.value.at(-1).focus()
  })
}

//保存
const save = async () => {
  let result = await reqAddOrUpdateAttr(attrParams)
  console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: attrParams.categoryId ? '修改成功' : '添加成功',
    })
    isShow.value = !isShow.value
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.categoryId ? '修改失败' : '添加失败',
    })
  }
}

const toLook = (row: AttrValue, $index: number) => {
  //删除对应属性值为空的数据
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1)
    //提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }

  //判断属性值是否重复
  let isRepat = attrParams.attrValueList.some((item) => {
    if (item !== row) {
      return item.valueName == row.valueName
    }
  })
  if (isRepat) {
    //提示信息
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }

  row.flag = !row.flag
}

const toEdit = (row: AttrValue, $index: number) => {
  row.flag = !row.flag

  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

const deleteAttr = async (row: number) => {
  let result = await reqDeleteAttr(row)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//路由组件销毁之前将仓库分类相关的数据清空
onBeforeUnmount(() => {
  //重置仓库数据
  categoryStore.$reset()
})
</script>

<style scoped></style>
