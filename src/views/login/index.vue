<script setup>
import { useStore } from 'vuex'
import plum from '../../components/Plums.vue'
import ForgetPassword from './component/ForgetPassword.vue'
import LoginForm from './component/LoginForm.vue'
import MobileForm from './component/MobileForm.vue'
import QrCodeForm from './component/QrCodeForm.vue'
import RegistForm from './component/RegistForm.vue'
const store = useStore()
window.onload = function () {
  store.commit('user/setLoginAccount', 'super-admin')
}
</script>
<template>
  <div class="login">
    <plum></plum>
    <div style="width: 400px">
      <LoginForm></LoginForm>
      <ForgetPassword></ForgetPassword>
      <MobileForm></MobileForm>
      <QrCodeForm />
      <RegistForm></RegistForm>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
