<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" alt="" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ getNowTime() }}{{ userStore.username }}</h3>
          <p class="subtitle">甄选运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <svg-icon iconClass="welcome" width="500px" height="500px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入用户相关的仓库
import useUserStore from '@/store/modules/user'
import { getNowTime } from '@/utils/time'
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;

  .avatar {
    width: 125px;
    height: 125px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-size: 30px;
      margin-bottom: 20px;
      font-weight: 900;
    }

    .subtitle {
      font-size: 20px;
      font-weight: 900;
      font-style: italic;
      color: rgb(204, 204, 204);
    }
  }
}

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
