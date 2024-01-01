<script setup>
// import CountDownInput from '@/components/Countdown/src/CountDownInput.vue'
import StrengthMeter from '@/components/StrengthMeter/src/StrengthMeter.vue'
import { LoginState } from '@/constant/LoginState'
import { ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import {
  validateLoginFormPassword,
  validateMobileNumber,
  validateEmail
} from '../rules'
import serviceInstance from '@/axios/service'
import CountDownEmailCode from '@/components/Countdown/src/CountDownEmailCode.vue'
const store = useStore()
const { t } = useI18n()
const getShow = computed(
  () => store.state.user.currentState === LoginState.REGISTER
)
const formRef = ref()
const loading = ref(false)
const isCanSendEmailCode = ref(true)
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  nickName: '',
  mobile: '',
  email: '872937094@qq.com',
  captcha: ''
})
const validateRegistFormRePassword = () => {
  return (rule, value, callback) => {
    if (formData.value.confirmPassword !== formData.value.password) {
      callback(new Error(t('msg.toast.pwdNotMatch')))
    } else {
      callback()
    }
  }
}
const registFormRules = ref({
  username: [
    {
      required: true,
      message: `${t('msg.toast.accountRequired')}`,
      trigger: 'blur'
    },
    {
      max: 15,
      message: `${t('msg.toast.accountMaxCount')}`,
      required: true,
      trigger: 'change'
    }
  ],
  nickName: [
    {
      required: true,
      message: `${t('msg.toast.nickNameRequired')}`,
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: `${t('msg.toast.emailRequired')}`,
      trigger: 'change'
    },
    {
      required: true,
      validator: validateEmail,
      message: `${t('msg.toast.emailRulesToast')}`,
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '密码为6-16位以大小写字母或数字开头',
      trigger: 'change',
      validator: validateLoginFormPassword()
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: '与密码不一致',
      trigger: 'change',
      validator: validateRegistFormRePassword()
    }
  ],
  mobile: [
    {
      required: true,
      message: t('msg.toast.phoneRulesToast'),
      trigger: 'change',
      validator: validateMobileNumber()
    }
  ]
})
const sendCaptcha = async () => {
  const res = await serviceInstance.get('/user/register-captcha', {
    params: {
      address: formData.value.email
    }
  })
  if (res.status === 201 || res.status === 200) {
    ElMessage.success(res.data.data)
  } else {
    ElMessage.error('系统繁忙请稍后再试')
  }
}
watch(
  () => formData.value,
  val => {
    isCanSendEmailCode.value =
      val.email &&
      !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val.email)
  },
  {
    deep: true
  }
)
const handleRegister = async () => {
  // ElMessage.warning(t('msg.toast.notSupportRegist'))
  formRef.value.validate(async valid => {
    if (!valid) {
      ElMessage.error(t('msg.toast.formVerifyError'))
    } else {
      const res = await serviceInstance.post('/user/register', formData.value)
      if (res.status === 201 || res.status === 200) {
        const { message: msg, data } = res.data
        if (msg === 'success') {
          ElMessage.success('注册成功')
          localStorage.setItem('access_token', data.accessToken)
          localStorage.setItem('refresh_token', data.refreshToken)
          localStorage.setItem('user_info', JSON.stringify(data.userInfo))
          handleBackLogin()
        } else {
          ElMessage.error(data)
        }
      } else {
        ElMessage.error('系统繁忙，请稍后再试')
      }
    }
  })
}
const handleBackLogin = () => {
  store.commit('user/setCurrentState', LoginState.LOGIN)
}
const handleScoreChange = val => {
  console.log(val, 'score')
}
const handlePwdChange = val => {
  console.log(val, 'val')
  console.log(store.state.register.registerPwd)
}
</script>
<template>
  <el-form
    v-if="getShow"
    ref="formRef"
    class="registForm"
    :rules="registFormRules"
    :model="formData"
    @keypress.enter="handleRegister"
  >
    <el-form-item class="enter-x" prop="username">
      <span class="svgComponent">
        <el-icon>
          <Avatar></Avatar>
        </el-icon>
      </span>
      <el-input
        v-model="formData.username"
        :placeholder="$t('msg.login.acountPlaceholder')"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item class="enter-x" prop="nickName">
      <span class="svgComponent">
        <el-icon><EditPen /></el-icon>
      </span>
      <el-input
        v-model="formData.nickName"
        :placeholder="$t('msg.login.nickNamePlaceholder')"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item class="enter-x" prop="mobile">
      <span class="svgComponent">
        <el-icon>
          <Iphone />
        </el-icon>
      </span>
      <el-input
        v-model="formData.mobile"
        :placeholder="$t('msg.login.phonePlaceholder')"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item class="enter-x" prop="email">
      <span class="svgComponent">
        <el-icon><Message /></el-icon>
      </span>
      <el-input
        v-model="formData.email"
        :placeholder="$t('msg.login.emailPlaceholder')"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item class="enter-x count" prop="captcha">
      <span class="svgComponent">
        <el-icon><ChatLineSquare /></el-icon>
      </span>
      <CountDownEmailCode
        @on-sendCaptcha="sendCaptcha"
        :isDisabled="isCanSendEmailCode"
        v-model="formData.captcha"
        size="large"
        :placeholder="$t('msg.login.verifyCode')"
      ></CountDownEmailCode>
    </el-form-item>
    <el-form-item class="enter-x" prop="password">
      <StrengthMeter
        style="width: 100%;"
        v-model="formData.password"
        @score-change="handleScoreChange"
        @change="handlePwdChange"
        size="large"
        :placeholder="$t('msg.login.pwdPlaceholder')"
      ></StrengthMeter>
    </el-form-item>
    <el-form-item class="enter-x" prop="confirmPassword">
      <el-input
        type="password"
        v-model="formData.confirmPassword"
        size="large"
        :placeholder="$t('msg.login.rePwdPlaceholder')"
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
        {{ $t('msg.login.register') }}</el-button
      >
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button style="width: 100%;" size="large" @click="handleBackLogin">
        {{ $t('msg.login.return') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: rgba(211, 17, 240, 0.7);
$black: #000;
.registForm {
  position: relative;

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
.count {
  ::v-deep .el-form-item__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
