<script setup>
import CountdownInput from '@/components/Countdown/src/CountDownInput.vue'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { LoginState } from '../../../constant/LoginState'
const store = useStore()
const formData = ref({
  mobile: '',
  sms: ''
})
const formRef = ref()
const loading = ref(false)
const handleReset = async () => {
  ElMessage.warning('暂不支持手机登陆～')
}
const getShow = computed(
  () => store.state.user.currentState === LoginState.MOBILE
)
const handleBackLogin = () => {
  store.commit('user/setCurrentState', LoginState.LOGIN)
}
</script>
<template>
  <el-form
    v-if="getShow"
    ref="formRef"
    :model="formData"
    @keypress.enter="handleReset"
  >
    <el-form-item class="enter-x" prop="mobile">
      <el-input
        v-model="formData.mobile"
        placeholder="手机号"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item class="enter-x count" prop="sms">
      <CountdownInput
        v-model="formData.sms"
        placeholder="短信验证码"
        size="large"
      ></CountdownInput>
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button
        size="large"
        type="primary"
        :loading="loading"
        @click="handleReset"
        style="width: 100%;"
      >
        登录
      </el-button>
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button size="large" @click="handleBackLogin" style="width: 100%;">
        返回
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
.count {
  ::v-deep .el-form-item__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
