<script setup>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { LoginState } from '../../../constant/LoginState'
import { validateLoginFormPassword } from '../rules'
import { useI18n } from 'vue-i18n'
import router from '@/router'
import LangSelect from '@/components/LangSelect/index.vue'
import serviceInstance from '@/axios/service'
// import { toLine } from '@/utils/toLine'
const store = useStore()
const { t } = useI18n()
const formRules = ref({
  username: [
    {
      required: true,
      message: t('msg.toast.accountRequired'),
      trigger: 'blur'
    },
    {
      max: 15,
      message: t('msg.toast.accountMaxCount'),
      required: true,
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: t('msg.toast.pwdRulesTip'),
      trigger: 'change',
      validator: validateLoginFormPassword()
    }
  ]
})
const formRef = ref()
const remember = ref(true)
const loading = ref(false)
const getShow = computed(
  () => store.state.user.currentState === LoginState.LOGIN
)
const formData = ref({
  username: store.state.user.loginAccount || 'super-admin',
  password: '123456'
})
watch(
  () => formData.value.username,
  val => store.commit('user/setLoginAccount', val)
)
watch(
  () => store.state.user.loginAccount,
  val => (formData.value.username = val)
)
const handleForgetPassWord = () => {
  store.commit('user/setCurrentState', LoginState.RESET_PASSWORD)
}
const handleMobile = () => {
  store.commit('user/setCurrentState', LoginState.MOBILE)
}
const handleQrCode = () => {
  store.commit('user/setCurrentState', LoginState.QR_CODE)
}
const handleRegister = () => {
  store.commit('user/setCurrentState', LoginState.REGISTER)
}
const openGithub = () => {
  window.location.href = 'https://github.com/jersonwei/jerson-web-admin'
}
// 处理密码框文本显示状态
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
// 登录
const handleLogin = () => {
  formRef.value.validate(async valid => {
    if (!valid) {
      ElMessage.error(t('msg.toast.formVerifyError'))
    }
    loading.value = true
    const res = await serviceInstance.post('/user/login', formData.value)
    if (res.status === 201 || res.status === 200) {
      const { message: msg, data } = res.data
      if (msg === 'success') {
        ElMessage.success('登陆成功')
        localStorage.setItem('access_token', data.accessToken)
        localStorage.setItem('refresh_token', data.refreshToken)
        localStorage.setItem('user_info', JSON.stringify(data.userInfo))
        router.push('/')
      } else {
        ElMessage.error(data)
        loading.value = false
      }
    } else {
      ElMessage.error('系统繁忙,请稍后再试')
    }
    // store
    //   .dispatch('user/login', formData.value)
    //   .then(res => {
    //     loading.value = true
    //     store.commit('user/setToken', res.token)
    //   })
    //   .catch(err => {
    //     console.dir(err)
    //   })
    //   .finally(() => {
    //     router.push('/')
    //     loading.value = false
    //   })
  })
}
</script>
<template>
  <div class="login-container">
    <el-form
      class="loginForm"
      ref="formRef"
      v-show="getShow"
      :model="formData"
      :rules="formRules"
      @keypress.enter="handleLogin"
    >
      <div style="margin-bottom: 20px;" class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select
          effect="dark"
          class="right-menu-item hover-effect"
        ></lang-select>
      </div>
      <el-form-item class="enter-x" prop="username">
        <span class="svgComponent">
          <el-icon>
            <Avatar></Avatar>
          </el-icon>
        </span>
        <!-- <svg-icon icon="https://res.lgdsunday.club/user.svg"></svg-icon> -->
        <!-- <component :is="`el-icon-${toLine('Avatar')}`"></component> -->
        <el-input
          v-model="formData.username"
          :placeholder="$t('msg.login.acountPlaceholder')"
          :prefix-icon="'Avatar'"
          name="username"
          size="large"
        ></el-input>
      </el-form-item>
      <el-form-item class="enter-x" prop="password">
        <span class="svgComponent">
          <el-icon>
            <Lock></Lock>
          </el-icon>
        </span>
        <el-input
          :type="passwordType"
          v-model="formData.password"
          :placeholder="$t('msg.login.pwdPlaceholder')"
          name="password"
          size="large"
        ></el-input>
        <span class="svgComponent eye">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="onChangePwdType"
          />
        </span>
      </el-form-item>
      <el-row class="enter-x">
        <el-col :span="12" class="col-form">
          <el-form-item class="enter-x" style="text-align: left;">
            <el-checkbox v-model:checked="remember">{{
              $t('msg.login.remPwd')
            }}</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="col-form">
          <el-form-item style="text-align:right" class="enter-x">
            <el-button
              style="font-size: 14px;"
              size="small"
              @click="handleForgetPassWord"
            >
              {{ $t('msg.login.forgetPwd') }}
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
          {{ $t('msg.login.loginBtn') }}</el-button
        >
      </el-form-item>
      <el-row class="enter-x" style="justify-content: space-between;">
        <el-col :span="7">
          <el-button class="block" size="large" @click="handleMobile">{{
            $t('msg.login.mobileLog')
          }}</el-button>
        </el-col>
        <el-col :span="7">
          <el-button class="block" size="large" @click="handleQrCode">{{
            $t('msg.login.qrcodeLog')
          }}</el-button>
        </el-col>
        <el-col :span="7">
          <el-button class="block" size="large" @click="handleRegister">{{
            $t('msg.login.register')
          }}</el-button>
        </el-col>
      </el-row>
      <el-divider class="enter-x dividertxt">{{
        $t('msg.login.otherLogtype')
      }}</el-divider>
      <div class="othersvg">
        <svg
          focusable="false"
          class=""
          data-icon="github"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
          @click="openGithub"
        >
          <path
            d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
          ></path>
        </svg>
        <svg
          focusable="false"
          class=""
          data-icon="wechat"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 019.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 006.4-2.6 9 9 0 002.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 01-36 35.9z"
          ></path>
        </svg>
        <svg
          focusable="false"
          class=""
          data-icon="alipay-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M308.6 545.7c-19.8 2-57.1 10.7-77.4 28.6-61 53-24.5 150 99 150 71.8 0 143.5-45.7 199.8-119-80.2-38.9-148.1-66.8-221.4-59.6zm460.5 67c100.1 33.4 154.7 43 166.7 44.8A445.9 445.9 0 00960 512c0-247.4-200.6-448-448-448S64 264.6 64 512s200.6 448 448 448c155.9 0 293.2-79.7 373.5-200.5-75.6-29.8-213.6-85-286.8-120.1-69.9 85.7-160.1 137.8-253.7 137.8-158.4 0-212.1-138.1-137.2-229 16.3-19.8 44.2-38.7 87.3-49.4 67.5-16.5 175 10.3 275.7 43.4 18.1-33.3 33.4-69.9 44.7-108.9H305.1V402h160v-56.2H271.3v-31.3h193.8v-80.1s0-13.5 13.7-13.5H557v93.6h191.7v31.3H557.1V402h156.4c-15 61.1-37.7 117.4-66.2 166.8 47.5 17.1 90.1 33.3 121.8 43.9z"
          ></path>
        </svg>
        <svg
          focusable="false"
          class=""
          data-icon="google-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm167 633.6C638.4 735 583 757 516.9 757c-95.7 0-178.5-54.9-218.8-134.9C281.5 589 272 551.6 272 512s9.5-77 26.1-110.1c40.3-80.1 123.1-135 218.8-135 66 0 121.4 24.3 163.9 63.8L610.6 401c-25.4-24.3-57.7-36.6-93.6-36.6-63.8 0-117.8 43.1-137.1 101-4.9 14.7-7.7 30.4-7.7 46.6s2.8 31.9 7.7 46.6c19.3 57.9 73.3 101 137 101 33 0 61-8.7 82.9-23.4 26-17.4 43.2-43.3 48.9-74H516.9v-94.8h230.7c2.9 16.1 4.4 32.8 4.4 50.1 0 74.7-26.7 137.4-73 180.1z"
          ></path>
        </svg>
        <svg
          focusable="false"
          class=""
          data-icon="twitter-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 01-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 01-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 00229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z"
          ></path>
        </svg>
      </div>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: rgba(211, 17, 240, 0.7);
$black: #000;
.login-container {
  min-height: 100%;
  overflow: hidden;
  .loginForm {
    position: relative;
    .title-container {
      display: flex;
      justify-content: center;
      align-items: center;
      ::v-deep .right-menu-item {
        display: inline-block;
        font-size: 28px;
        position: absolute;
        right: 0px;
        top: 5px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
        }
      }
    }
    ::v-deep .el-input {
      display: inline-block;
      input {
        padding: 12px 5px 12px 15px;
        height: 47px;
        background: transparent;
        color: $black;
        height: 47px;
        caret-color: $cursor;
      }
    }
    ::v-deep .el-form-item {
      position: relative;
      border-radius: 0 4px 4px 0;
    }
    ::v-deep .el-form-item__content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      line-height: 32px;
      font-size: var(--font-size);
      min-width: 0;
    }
    .col-form {
      ::v-deep .el-form-item__content {
        display: block;
      }
    }
    .svgComponent {
      position: relative;
      padding: 6px 10px 0px 0px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
      .el-icon {
        font-size: 20px;
        line-height: 2em;
      }
    }
    .eye {
      position: absolute;
      top: 0;
      right: 0;
    }
    svg {
      width: 1em;
      height: 1em;
      cursor: pointer;
      color: #aaa;
      &:hover {
        color: #1890ff;
      }
    }
    .block {
      width: 100%;
    }
    .dividertxt {
      ::v-deep .el-divider__text {
        color: #aaa;
      }
    }
    .othersvg {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      svg {
        cursor: pointer;
        font-size: 22px;
        color: #888;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
