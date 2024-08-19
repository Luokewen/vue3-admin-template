<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请你输入SPU名称"
        v-model="SpuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select style="width: 240px" v-model="SpuParams.tmId">
        <el-option
          v-for="item in AllTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请你输入SPU描述"
        :rows="4"
        v-model="SpuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select
        v-model="saleAttrIdAndValue"
        style="width: 240px"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        "
      >
        <el-option
          :value="`${item.id}:${item.name}`"
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-button
        @click="addSaleAttr"
        :disabled="saleAttrIdAndValue ? false : true"
        style="margin-left: 10px"
        type="primary"
        icon="plus"
      >
        添加属性值
      </el-button>
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column
          label="序号"
          type="index"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="属性名"
          width="120px"
          align="center"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="属性值列表" align="center">
          <template #default="{ row, $index }">
            <el-tag
              style="margin: 0 5px"
              @close="row.spuSaleAttrValueList.splice($index, 1)"
              v-for="tag in row.spuSaleAttrValueList"
              :key="row.id"
              closable
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              @blur="toLook(row)"
              v-model="row.saleAttrValue"
              v-if="row.flag == true"
              placeholder="请你输入属性值"
              size="small"
              style="width: 100px"
            ></el-input>
            <el-button
              v-else
              @click="toEdit(row)"
              type="primary"
              size="small"
              icon="plus"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="{ $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="saleAttr.length > 0 ? false : true"
        type="primary"
        size="default"
        @click="save"
      >
        保存
      </el-button>
      <el-button @click="cancel" type="primary" size="default">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type {
  SaleAttrValue,
  HasSaleAttr,
  SaleAttr,
  SpuData,
  AllTradeMark,
  AllSpuImage,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  TradeMark,
  SpuImage,
} from '@/api/product/spu/type'
import {
  reqAllTrademark,
  reqSpuImage,
  reqHasSpuSale,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
//自定义事件changeScene
const $emit = defineEmits(['changeScene'])

const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

//存储已有的spu数据
let AllTradeMark = ref<TradeMark[]>([])
//商品图片
let imgList = ref<SpuImage[]>([])
//已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([])
//全部的销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
//存储已有的spu对象
let SpuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})

//将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValue = ref('')

const initHasSpuData = async (spu: SpuData) => {
  //存储已有的spu对象
  SpuParams.value = spu
  //获取全部的品牌数据
  let result: AllTradeMark = await reqAllTrademark()
  //获取某一个品牌旗下全部售卖的商品图片
  let result1: AllSpuImage = await reqSpuImage(spu.id as number)
  //获取已有的SPU销售属性的数据
  let result2: SaleAttrResponseData = await reqHasSpuSale(spu.id as number)
  //获取整个项目全部的spu销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()

  //存储全部品牌的数据
  AllTradeMark.value = result.data
  //SPU对应商品图片
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  //存储销售属性对象
  saleAttr.value = result2.data
  //存储全部销售属性对象
  allSaleAttr.value = result3.data
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleRemove = (uploadFile: any, uploadFiles: any) => {
  console.log(uploadFile, uploadFiles)
}

//图片上传之前的钩子
const handlerUpload = (rawFile: any) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage.error('上传的文件大小要小于4M')
      return false
    } else {
      return true
    }
  } else {
    ElMessage.error('上传的文件格式必PNG|JPG|GIF')
    return false
  }
}

//计算当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  let unSelectAttr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectAttr
})

//点击添加销售属性
const addSaleAttr = () => {
  let [baseSaleAttrId, saleAttrName] = saleAttrIdAndValue.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValue.value = ''
}

//属性值按钮的点击事件
const toEdit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}

//表单元素失去焦点的回调
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  //整理成服务器需要的属性值形式
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }

  if ((saleAttrValue as string).trim() == '') {
    ElMessage.error('属性值不能为空')
    return
  }
  //判断属性值是否重复
  let result = row.spuSaleAttrValueList.some((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (result) {
    ElMessage.error('属性值不能重复')
    return
  }

  //追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)

  row.flag = false
}

//保存按钮的点击事件
const save = async () => {
  //整理参数
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: item.url || (item.response && item.response.data),
    }
  })
  SpuParams.value.spuSaleAttrList = saleAttr.value
  //发送请求
  let result: any = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '修改成功' : '添加成功',
    })
    $emit('changeScene', {
      flag: 0,
      params: SpuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage({
      type: 'error',
      message: SpuParams.value.id ? '修改失败' : '添加失败',
    })
  }
}

//添加一个新的SPU初始化请求的方法
const initAddSpu = async (c3Id: number | string) => {
  //清空数据
  SpuParams.value = {
    category3Id: '',
    spuName: '',
    description: '',
    spuImageList: [],
    spuSaleAttrList: [],
    tmId: '',
  }
  //清空图片列表
  imgList.value = []
  //清空销售属性
  saleAttr.value = []
  saleAttrIdAndValue.value = ''

  //存储三级分类id
  SpuParams.value.category3Id = c3Id
  //获取全部的品牌数据
  let result: AllTradeMark = await reqAllTrademark()
  //获取整个项目全部的spu销售属性
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr()
  //存储数据
  AllTradeMark.value = result.data
  allSaleAttr.value = result1.data
}

defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped></style>
