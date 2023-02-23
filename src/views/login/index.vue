<script setup>
import plum from '../../components/Plums.vue'
import ForgetPassword from './component/ForgetPassword.vue'
import LoginForm from './component/LoginForm.vue'
</script>
<template>
  <div class="login">
    <plum></plum>
    <div style="width: 400px">
      <LoginForm></LoginForm>
      <ForgetPassword></ForgetPassword>
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
