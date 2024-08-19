<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="用户名:">
          <el-input placeholder="请你输入用户名" v-model="keyword"></el-input>
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
        @click="addUser"
        v-has="`btn.User.add`"
      >
        添加
      </el-button>
      <el-button
        type="primary"
        size="default"
        @click="batchDelete"
        :disabled="idList.length ? false : true"
        v-has="`btn.User.remove`"
      >
        批量删除
      </el-button>
      <el-table
        style="margin: 10px 0"
        border
        :data="userInfo"
        @selection-change="selectChange"
      >
        <el-table-column
          type="selection"
          align="center"
          prop=""
        ></el-table-column>
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
          label="用户名字"
          align="center"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
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
              @click="assignRole(row)"
              v-has="`btn.User.assgin`"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateUser(row)"
              v-has="`btn.User.update`"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.name}吗?`"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                  v-has="`btn.User.remove`"
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
        @current-change="getUserInfo"
      />
    </el-card>
    <!-- 抽屉效果 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4 style="font-size: 15px">{{ user.id ? '修改用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <el-form label-width="80px" :model="user" :rules="rules" ref="userForm">
          <el-form-item style="margin: 0 0 20px 0" label="用户姓名" prop="name">
            <el-input
              v-model="user.name"
              placeholder="请您输入用户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin: 20px 0" label="用户昵称" prop="username">
            <el-input
              v-model="user.username"
              placeholder="请您输入用户昵称"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="margin: 20px 0"
            label="用户密码"
            prop="password"
            v-if="!user.id"
          >
            <el-input
              v-model="user.password"
              placeholder="请您输入用户密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="confirmUser">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer1">
      <template #header>
        <h4 style="font-size: 15px">分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="user.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="indeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="(role, index) in allRole"
                :key="index"
                :value="role"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="confirmRole">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqAssignRole,
  reqDeleteUser,
  reqDeleteBatchUser,
} from '@/api/acl/user'
import type {
  User,
  UserResponseData,
  RoleResponseData,
  ALLRole,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'

//定义用户输入的关键字
const keyword = ref('')
const pageNo = ref(1)
const pageSize = ref(5)
//存储用户数据
const userInfo = ref<User[]>([])
const total = ref(0)
const drawer = ref(false)
const drawer1 = ref(false)

//收集用户信息的响应式数据
const user = reactive<User>({
  username: '',
  name: '',
  password: '',
})

//用户表单组件实例
const userForm = ref()

const checkAll = ref(false)
const indeterminate = ref(true)
//存储全部职位的数据
const allRole = ref<ALLRole>([])
const userRole = ref<ALLRole>([])

//获取setting仓库
const SettingStore = useLayOutSettingStore()

onMounted(() => {
  getUserInfo()
})

const getUserInfo = async (Pager = 1) => {
  pageNo.value = Pager
  let result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    userInfo.value = result.data.records
    total.value = result.data.total
  }
}

const sizeChange = () => {
  getUserInfo()
}

const addUser = () => {
  drawer.value = true
  Object.assign(user, {
    id: '',
    username: '',
    name: '',
    password: '',
  })
  //清理表单的错误提示信息
  nextTick(() => {
    userForm.value.clearValidate()
  })
}

const updateUser = (row: User) => {
  drawer.value = true
  //收集已有的账号信息
  Object.assign(user, row)
  //清理表单的错误提示信息
  nextTick(() => {
    userForm.value.clearValidate()
  })
}

const confirmUser = async () => {
  await userForm.value.validate()
  let result: any = await reqAddOrUpdateUser(user)
  console.log(result)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: user.id ? '修改成功' : '添加成功',
    })
    getUserInfo(user.id ? pageNo.value : 1)
    drawer.value = false
    //浏览器自动刷新一次
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: user.id ? '修改失败' : '添加失败',
    })
  }
}

//用户名字校验规则
//@ts-ignore
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名不能少于5位'))
  }
}
//@ts-ignore
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称不能少于5位'))
  }
}
//@ts-ignore
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用户密码不能少于6位'))
  }
}

//表单校验的规则对象
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}

//取消按钮的回调
const cancel = () => {
  drawer.value = false
}

//分配角色
const assignRole = async (row: User) => {
  Object.assign(user, row)
  let result: RoleResponseData = await reqAllRole(user.id as number)
  if (result.code == 200) {
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
    drawer1.value = true
  }
}

//全选框的change事件
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  indeterminate.value = false
}

//单选框的change事件
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  indeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}

//提交角色
const confirmRole = async () => {
  let result: any = await reqAssignRole(
    user.id as number,
    userRole.value.map((item: any) => item.id),
  )
  console.log(allRole.value.map((item: any) => item.id))
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配成功',
    })
    drawer1.value = false
    getUserInfo(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '分配失败',
    })
  }
}

//删除用户
const deleteUser = async (id: number) => {
  let result: any = await reqDeleteUser(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getUserInfo(userInfo.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//存储批量删除的ID
let idList = ref<number[]>([])

const selectChange = (value: any) => {
  idList.value = value
}

//批量删除
const batchDelete = async () => {
  let result: any = await reqDeleteBatchUser(
    idList.value.map((item: any) => item.id),
  )
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getUserInfo(userInfo.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//搜索按钮的函数回调
const search = async () => {
  getUserInfo()
  keyword.value = ''
}

//重置按钮的回调
const reset = () => {
  SettingStore.refresh = !SettingStore.refresh
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
