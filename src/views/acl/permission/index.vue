<template>
  <div>
    <el-table
      :data="permissionList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column label="权限值" prop="code" />
      <el-table-column label="修改时间" prop="updateTime" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="text"
            size="small"
            :disabled="row.level == 4 ? true : false"
            @click="addPermission(row)"
            v-has="`btn.Permission.add`"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="text"
            size="small"
            :disabled="row.level == 1 ? true : false"
            @click="updatePermission(row)"
            v-has="`btn.Permission.update`"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.name}吗?`"
            @confirm="removePermission(row)"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                v-has="`btn.Permission.remove`"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="menuParams.id ? '编辑菜单' : '添加菜单'"
      width="500"
      align-center
    >
      <el-form>
        <el-form-item label="名称">
          <el-input
            placeholder="请输入菜单名称"
            v-model="menuParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input
            placeholder="请输入权限的数据"
            v-model="menuParams.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  reqDeletePermission,
  reqAllPermission,
  reqAddOrUpdatePermission,
} from '@/api/acl/menu'
import { ElMessage } from 'element-plus'
import type {
  PermissionResponseData,
  PermissionList,
  MenuParams,
} from '@/api/acl/menu/type'

const permissionList = ref<PermissionList>()
const dialogVisible = ref(false)
//携带的参数
const menuParams = ref<MenuParams>({
  name: '',
  level: 0,
  pid: 0,
  code: '',
})

onMounted(async () => {
  getHasPermission()
})

//获取菜单数据的方法
const getHasPermission = async () => {
  const result: PermissionResponseData = await reqAllPermission()
  if (result.code === 200) {
    permissionList.value = result.data
  }
}

//添加菜单
const addPermission = (row: any) => {
  //清空数据
  Object.assign(menuParams.value, {
    id: 0,
    name: '',
    level: 0,
    pid: 0,
    code: '',
  })
  dialogVisible.value = true
  //收集新增菜单的level值
  menuParams.value.level = row.level + 1
  //收集新增菜单的pid值
  menuParams.value.pid = row.id
}

//编辑菜单
const updatePermission = (row: any) => {
  dialogVisible.value = true
  Object.assign(menuParams.value, row)
}

//保存菜单
const save = async () => {
  dialogVisible.value = false
  let result = await reqAddOrUpdatePermission(menuParams.value)
  if ((await result).code === 200) {
    ElMessage({
      type: 'success',
      message: menuParams.value.id ? '修改成功' : '添加成功',
    })
    dialogVisible.value = false
    getHasPermission()
  } else {
    ElMessage({
      type: 'error',
      message: menuParams.value.id ? '修改失败' : '添加失败',
    })
    dialogVisible.value = false
  }
}

//删除菜单
const removePermission = async (row: any) => {
  const result = await reqDeletePermission(row.id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasPermission()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped></style>
