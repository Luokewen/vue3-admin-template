<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button
        type="primary"
        icon="plus"
        @click="addTrademark"
        v-has="`btn.Trademark.add`"
      >
        添加品牌
      </el-button>
      <!-- 卡片内容展示品牌列表 -->
      <el-table style="margin: 10px 0" border :data="trademarkList">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName">
          <!-- el-table-column默认展示数据用div,使用插槽可以避免 -->
        </el-table-column>
        <el-table-column label="品牌logo" prop="">
          <template #="{ row }">
            <img
              style="width: 100px; height: 100px"
              :src="row.logoUrl"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row }">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="updateTrademark(row)"
              v-has="`btn.Trademark.update`"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`确认删除${row.tmName}吗？`"
              width="200px"
              icon="Delete"
              @confirm="removeTrademark(row.id)"
              v-has="`btn.Trademark.remove`"
            >
              <template #reference>
                <el-button
                  type="danger"
                  icon="delete"
                  size="small"
                  v-has="`btn.Trademark.remove`"
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
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getHasTrademark"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
      @close="dialogClose"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽footer -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type { ComponentSize, UploadProps } from 'element-plus'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'
const pageNo = ref(1)
const limit = ref(3)
const size = ref<ComponentSize>('default')
const background = ref(true)
const disabled = ref(false)
//存储total的总数
let total = ref(0)
//存储已有品牌的数据
let trademarkList = ref<Records>([])

//定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

//控制对话框显示与隐藏
let dialogVisible = ref(false)

//获取el-form组件实例
let formRef = ref()

//获取已有品牌的接口封装成一个函数
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  const result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkList.value = result.data.records
  }
}
//添加品牌按钮
const addTrademark = () => {
  //清空收集数据
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  dialogVisible.value = true
}
//编辑品牌按钮
const updateTrademark = (row: TradeMark) => {
  dialogVisible.value = true
  //将已有的品牌信息赋值给trademarkParams
  Object.assign(trademarkParams, row)
  // trademarkParams.id = row.id
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
}

//取消对话框
const cancel = () => {
  dialogVisible.value = false
}
//确定对话框
const confirm = async () => {
  //发请求前对整个表单进行校验
  await formRef.value.validate()
  //发请求
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage({
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
      type: 'success',
    })
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
      type: 'error',
    })
  }
}

onMounted(() => {
  getHasTrademark()
})

const handleSizeChange = () => {
  getHasTrademark()
}

//分页器页码发生变化的时候触发
//回传的当前的页码
// const handleCurrentChange = (val: number) => {
//     pageNo.value = val
//     getHasTrademark()
// }

//图片上传之前触发的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
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

//图片上传成功触发的钩子
//@ts-ignore
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  //response是上传图片post请求服务器返回的数据
  //收集上传服务器的图片地址
  trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!)
  //清除图片校验的结果
  formRef.value.clearValidate('logoUrl')
}

//品牌自定义校验规则方法
//@ts-ignore
const validatorName = (rule: any, value: any, callBack: any) => {
  //自定义校验规则
  if (value.trim().length >= 2 && value.length <= 10) {
    callBack()
  } else {
    callBack(new Error('品牌名称长度在2到10之间'))
  }
}

//品牌logo自定义校验规则方法
//@ts-ignore
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  //自定义校验规则
  if (value) {
    callBack()
  } else {
    callBack(new Error('品牌logo必须上传'))
  }
}

//表单校验规则对象
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorName }],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl }],
}

//对话框的关闭事件
const dialogClose = () => {
  //第一种写法
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')

  //第二种写法
  // nextTick(() => {
  //     formRef.value.clearValidate('tmName')
  //     formRef.value.clearValidate('logoUrl')
  // })
  formRef.value.clearValidate('tmName')
  formRef.value.clearValidate('logoUrl')
}

//删除已有品牌
const removeTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      message: '删除品牌成功',
      type: 'success',
    })
    getHasTrademark()
  } else {
    ElMessage({
      message: '删除品牌失败',
      type: 'error',
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
