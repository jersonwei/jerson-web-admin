<script setup>
import { LoginState } from '@/constant/LoginState'
import { ElMessage } from 'element-plus'
import { computed, ref, unref } from 'vue'
const currentState = ref(LoginState.LOGIN)
const formRef = ref()
const useLoginState = () => {
  function setLoginState (state) {
    currentState.value = state
  }
  const getLoginState = computed(() => currentState.value)
  function handleBackLogin () {
    setLoginState(LoginState.LOGIN)
  }
  return { setLoginState, getLoginState, handleBackLogin }
}
const { handleBackLogin, getLoginState } = useLoginState()
const getShow = computed(
  () => unref(getLoginState) === LoginState.RESET_PASSWORD
)
const formData = ref({
  username: '',
  mobile: '',
  sms: ''
})
const handleReset = async () => {
  ElMessage.warning('暂不支持重置密码～')
}
</script>
<template>
  <el-form
    v-if="getShow"
    ref="formRef"
    :model="formData"
    @keypress.enter="handleReset"
  >
    <el-form-item class="enter-x" prop="username">
      <el-input
        v-model="formData.username"
        placeholder="账号"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item class="enter-x" prop="mobile">
      <el-input
        v-model="formData.mobile"
        placeholder="手机号"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item class="enter-x">
      短信验证码
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button type="primary" :loading="loading" @click="handleReset">
        重置
      </el-button>
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button type="primary" :loading="loading" @click="handleBackLogin">
        返回
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped></style>
