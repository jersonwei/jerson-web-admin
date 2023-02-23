<script setup>
import { computed, reactive, ref } from 'vue'

const getShow = computed(() => true)
const formRules = {
  username: [{ required: true, message: '必须输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '必须输入密码', trigger: 'blur' }]
}
const formRef = ref()
const setLoginState = () => {}
const remember = ref(true)
const loading = ref(false)
const formData = reactive({
  username: 'jersonwang',
  password: 'admin'
})
const handleLogin = () => {}
</script>
<template>
  <div class="login-container">
    <el-form
      ref="formRef"
      v-show="getShow"
      :model="formData"
      :rules="formRules"
      @keypress.enter="handleLogin"
    >
      <el-form-item class="enter-x" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="账号"
          size="large"
        ></el-input>
      </el-form-item>
      <el-form-item class="enter-x" prop="password">
        <el-input
          type="password"
          v-model="formData.password"
          placeholder="密码"
          size="large"
        ></el-input>
      </el-form-item>
      <el-row class="enter-x">
        <el-col :span="12">
          <el-form-item class="enter-x" style="text-align: left;">
            <el-checkbox v-model:checked="remember">记住密码</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item style="text-align:right" class="enter-x">
            <el-button
              style="font-size: 14px;"
              size="small"
              @click="setLoginState"
            >
              忘记密码？
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="enter-x">
        <el-button
          size="large"
          type="primary"
          :loading="loading"
          style="width: 100%;"
          @click="handleLogin"
        >
          登陆</el-button
        >
      </el-form-item>
      <el-row class="enter-x" style="justify-content: space-between;">
        <el-col :span="7">
          <el-button class="block" size="large" @click="setLoginState"
            >手机登录</el-button
          >
        </el-col>
        <el-col :span="7">
          <el-button class="block" size="large" @click="setLoginState"
            >二维码登录</el-button
          >
        </el-col>
        <el-col :span="7">
          <el-button class="block" size="large" @click="setLoginState"
            >注册</el-button
          >
        </el-col>
      </el-row>
      <el-divider class="enter-x dividertxt">其他登陆方式</el-divider>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  overflow: hidden;
}
.block {
  width: 100%;
}
.dividertxt {
  ::v-deep .el-divider__text {
    color: #aaa;
  }
}
</style>
