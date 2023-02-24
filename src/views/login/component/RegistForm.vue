<script setup>
import CountDownInput from '@/components/Countdown/src/CountDownInput.vue'
import { LoginState } from '@/constant/LoginState'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const getShow = computed(
  () => store.state.user.currentState === LoginState.REGISTER
)
const formRef = ref()
const loading = ref(false)
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  sms: ''
})
const handleRegister = () => {
  ElMessage.warning('暂不支持注册账号～')
}
const handleBackLogin = () => {
  store.commit('user/setCurrentState', LoginState.LOGIN)
}
</script>
<template>
  <el-form
    v-if="getShow"
    ref="formRef"
    :model="formData"
    @keypress.enter="handleRegister"
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
    <el-form-item class="enter-x" prop="sms">
      <CountDownInput
        v-model="formData.sms"
        size="large"
        placeholder="短信验证码"
      ></CountDownInput>
    </el-form-item>
    <el-form-item class="enter-x" prop="password">密码强度</el-form-item>
    <el-form-item class="enter-x" prop="confirmPassword">
      <el-input
        type="password"
        v-model="formData.confirmPassword"
        size="large"
        placeholder="确认密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button
        size="large"
        type="primary"
        style="width: 100%;"
        :loading="loading"
        @click="handleRegister"
      >
        注册</el-button
      >
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button style="width: 100%;" size="large" @click="handleBackLogin">
        返回
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped></style>
