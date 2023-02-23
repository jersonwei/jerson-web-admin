<script setup>
import { LoginState } from '@/constant/LoginState'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
console.log(store.state.user.currentState)
const formRef = ref()
const getShow = computed(
  () => store.state.user.currentState === LoginState.RESET_PASSWORD
)
const formData = ref({
  username: '',
  mobile: '',
  sms: ''
})
const handleReset = async () => {
  ElMessage.warning('暂不支持重置密码～')
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
      <el-button
        type="primary"
        style="width: 100%;"
        :loading="loading"
        @click="handleReset"
      >
        重置
      </el-button>
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button
        style="width: 100%;"
        :loading="loading"
        @click="handleBackLogin"
      >
        返回
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped></style>
