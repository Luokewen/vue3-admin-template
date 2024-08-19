<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="职位搜索:">
          <el-input
            placeholder="请你输入职位搜索关键字"
            v-model="keyword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="search">
            搜索
          </el-button>
          <el-button type="primary" size="default" @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button
        type="primary"
        size="default"
        @click="addRole"
        v-has="`btn.Role.add`"
      >
        添加职位
      </el-button>
      <el-table style="margin: 10px 0" border :data="roleList">
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          label="ID"
          align="center"
          prop="id"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center" width="280px">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="assignPermission(row)"
              v-has="`btn.Role.assgin`"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
              v-has="`btn.Role.update`"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.roleName}吗?`"
              @confirm="removeRole(row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                  v-has="`btn.Role.remove`"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @size-change="sizeChange"
        @current-change="getRoleInfo"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="roleInfo.id ? '修改职位' : '添加职位'"
      width="600"
      :before-close="handleClose"
    >
      <template #default>
        <el-form :model="roleInfo" :rules="rules" ref="formRef">
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model="roleInfo.roleName"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddOrUpdateRole">
          确定
        </el-button>
      </template>
    </el-dialog>
    <!-- 分配职位的菜单权限与按钮权限 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="tree"
          style="max-width: 600px"
          :data="menuArr"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectArr"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handler">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqGetMenuByRole,
  reqAssignPermission,
  reqDeleteRole,
} from '@/api/acl/role'
import { ElMessage } from 'element-plus'
import type { RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type'

let keyword = ref<string>('')
//获取setting仓库
const SettingStore = useLayOutSettingStore()
//分页器
const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)

//存储角色信息
const roleList = ref<any>([])

//控制对话框显示隐藏
const dialogVisible = ref<boolean>(false)

//收集角色信息
const roleInfo = ref<RoleData>({
  roleName: '',
})

//获取表单实例
const formRef = ref<any>()

//控制抽屉的显示和隐藏
const drawer = ref<boolean>(false)

//收集新增岗位数据
const roleParams = ref<RoleData>({})

const menuArr = ref<MenuList>([])

//存储勾选节点的ID
const selectArr = ref<any>([])

//获取tree组件实例
const tree = ref<any>()

onMounted(() => {
  getRoleInfo()
})

//获取角色信息
const getRoleInfo = async (pager = 1) => {
  pageNo.value = pager
  let result: any = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    roleList.value = result.data.records
    total.value = result.data.total
  }
}
//分页器
const sizeChange = () => {
  getRoleInfo()
}

const search = () => {
  getRoleInfo()
}
const reset = () => {
  SettingStore.refresh = !SettingStore.refresh
}

const addRole = () => {
  Object.assign(roleInfo.value, {
    roleName: '',
  })
  dialogVisible.value = true
  //清空上一次表单校验的错误
  nextTick(() => {
    formRef.value.clearValidate()
  })
}

const handleClose = () => {
  dialogVisible.value = false
}

const confirmAddOrUpdateRole = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateRole(roleInfo.value)
  if (result.code == 200) {
    dialogVisible.value = false
    getRoleInfo(roleInfo.value.id ? pageNo.value : 1)
    ElMessage({
      type: 'success',
      message: roleInfo.value.id ? '修改成功' : '添加成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: roleInfo.value.id ? '修改失败' : '添加失败',
    })
  }
}

const updateRole = (row: RoleData) => {
  //清空上一次表单校验的错误
  nextTick(() => {
    formRef.value.clearValidate()
  })
  dialogVisible.value = true
  Object.assign(roleInfo.value, row)
}

//@ts-ignore
const validatorRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 2 || value.trim().length > 10) {
    callback(new Error('角色名称2-10个字符'))
  } else {
    callback()
  }
}

const rules = {
  roleName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorRoleName,
    },
  ],
}

//分配权限的按钮回调
const assignPermission = async (row: RoleData) => {
  drawer.value = true
  Object.assign(roleParams.value, row)
  let result: MenuResponseData = await reqGetMenuByRole(
    roleParams.value.id as number,
  )
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}

const defaultProps = {
  children: 'children',
  label: 'name',
}

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

//抽屉确定按钮的回调
const handler = async () => {
  //半选的ID
  let arr = tree.value.getCheckedKeys()
  //全选的ID
  let arr2 = tree.value.getHalfCheckedKeys()
  let result: any = await reqAssignPermission(roleParams.value.id as number, [
    ...arr,
    ...arr2,
  ])
  console.log(result)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    })
    drawer.value = false
    //页面刷新
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '分配权限失败',
    })
  }
}

//删除角色按钮的回调
const removeRole = async (row: RoleData) => {
  let result: any = await reqDeleteRole(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getRoleInfo()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-form-item {
  margin: 0;
}
</style>
