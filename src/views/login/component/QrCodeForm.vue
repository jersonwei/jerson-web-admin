<script setup>
import { LoginState } from '@/constant/LoginState'
import { useStore } from 'vuex'
import qrCodeUrl from '@/assets/generate.gif'
import { computed } from 'vue'
const store = useStore()
const getShow = computed(
  () => store.state.user.currentState === LoginState.QR_CODE
)
const handleBackLogin = () => {
  store.commit('user/setCurrentState', LoginState.LOGIN)
}
</script>
<template>
  <template v-if="getShow">
    <div style="width: 100%;">
      <!-- <Qrcode
        :value="qrCodeUrl"
        class="enter-x"
        :width="400"
      /> -->
      <img :src="qrCodeUrl" alt="" class="qrimg" />
      <el-divider class="enter-x" style="color:#aaa;font-size: 12px;"
        >扫码后点击”确认“，即可登陆</el-divider
      >
      <el-button
        size="large"
        style="width: 100%;"
        class="enter-x"
        @click="handleBackLogin"
        >返回</el-button
      >
    </div>
  </template>
</template>
<style lang="scss" scoped>
.qrimg {
  width: 80%;
  image-rendering: pixelated;
}
.el-divider {
  width: 100%;
  ::v-deep .el-divider__text {
    color: #aaa;
    font-size: 10px;
  }
}
</style>
