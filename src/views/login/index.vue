<template>
  <div id="body">
    <div class="box">
      <div class="left"></div>
      <div class="right">
        <h4>登 录</h4>
        <form :model="loginForm" action="">
          <input
            class="acc"
            type="text"
            placeholder="用户名"
            v-model="loginForm.username"
            @blur="validateAccount"
            :style="borderStyle1"
          />
          <input
            class="acc"
            type="password"
            placeholder="密码"
            v-model="loginForm.password"
            @blur="validatePassword"
            :style="borderStyle2"
          />
          <el-button class="submit" @click="login">Login</el-button>
        </form>
        <div class="fn">
          <a href="javascript:;">注册账号</a>
          <a href="javascript:;">找回密码</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
//引入路由
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入获取时间的方法
import { getNowTime } from '@/utils/time'
//获取路由实例
let router = useRouter()
let route = useRoute()
//获取用户仓库
let userStore = useUserStore()

let loginForm = reactive({
  username: 'admin',
  password: '111111',
})

//定义一个变量控制边框的样式
let borderStyle1 = ref('')
let borderStyle2 = ref('')

//登陆按钮的回调
const login = async () => {
  await validateAccount()
  await validatePassword()

  //调用用户仓库的登陆方法
  try {
    await userStore.userLogin(loginForm)
    let redirect = route.query.redirect
    //编程式导航跳转到首页
    router.push((redirect as string) || '/')
    //登陆成功提示信息
    ElNotification({
      title: getNowTime(),
      message: '登陆成功',
      type: 'success',
    })
  } catch (error) {
    ElNotification({
      title: '登陆失败',
      message: (error as Error).message,
      type: 'error',
    })
  }
}

//定义变量控制弹窗
let noticeVisible = ref(false)

//验证用户名
const validateAccount = () => {
  let length = loginForm.username.length
  if (length < 5 || length > 10) {
    if (noticeVisible.value == false) {
      ElNotification({
        title: '错误',
        message: '账号长度在5到10之间',
        type: 'error',
      })
      noticeVisible.value = true
    }
    borderStyle1.value = 'border-bottom:1.3px solid red'
    return Promise.reject(new Error('账号或密码错误'))
  } else {
    noticeVisible.value = false
    borderStyle1.value = 'border-bottom-color:rgb(144, 129, 241)'
  }
}

//验证密码
const validatePassword = () => {
  let length = loginForm.password.length
  if (length < 6 || length > 12) {
    if (noticeVisible.value == false) {
      ElNotification({
        title: '错误',
        message: '密码长度在6到12之间',
        type: 'error',
      })
      noticeVisible.value = true
    }
    borderStyle2.value = 'border-bottom:1.3px solid red'
    return Promise.reject(new Error('账号或密码错误'))
  } else {
    noticeVisible.value = false
    borderStyle2.value = 'border-bottom-color:rgb(144, 129, 241)'
  }
}
</script>

<style lang="scss" scoped>
#body {
  width: 100%;
  height: 100%;
  position: fixed;
  // z-index: -1;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%) no-repeat;
}

::selection {
  color: #fff;
  background-color: rgb(144, 129, 241);
}

.box {
  display: flex;
  overflow: hidden;
  width: 90rem;
  height: 55rem;
  background-color: rgba(255, 255, 255, 60%);
  border-radius: 1.5rem;
  margin: 10% auto;
  box-shadow: 0 0 1rem 0.2rem rgb(0 0 0 / 10%);

  .left {
    position: relative;
    width: 35%;
    height: 100%;
    background-color: skyblue;
  }

  .left::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/left.png);
    background-size: cover;
    opacity: 80%;
  }

  .right {
    display: flex;
    width: 65%;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    h4 {
      color: rgb(144, 129, 241);
      font-size: 3rem;
      margin-top: 5rem;
    }

    form {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .acc {
      outline: none;
      width: 80%;
      height: 5rem;
      font-size: 1.6rem;
      margin-top: 5rem;
      padding: 1rem 0 0 1.6rem;
      border: none;
      border-bottom: 1px solid rgb(144, 129, 241);
      color: rgb(144, 129, 241);
      background-color: rgba(0, 0, 0, 0);
    }

    .acc:focus {
      outline: none;
      color: rgb(144, 129, 241);
      padding: 1rem 0 0 1.6rem;
    }

    .submit {
      width: 60%;
      height: 5rem;
      color: #f6f6f6;
      background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
      font-size: 1.4rem;
      border: none;
      border-radius: 0.5rem;
      margin: 6rem 0 0 50%;
      transform: translateX(-50%);
    }

    .submit:hover {
      box-shadow: 0 0 2rem -0.5rem rgb(0 0 0 / 15%);
    }

    .fn {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      width: 70%;

      a {
        font-size: 1.3rem;
        margin-top: 5rem;
        padding: 1rem 2rem;
        color: #666;
      }

      a:hover {
        color: rgb(144, 129, 241);
      }
    }
  }
}
</style>
