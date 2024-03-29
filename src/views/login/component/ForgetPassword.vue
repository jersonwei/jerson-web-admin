<script setup>
// import CountDownInput from '@/components/Countdown/src/CountDownInput.vue'
import { LoginState } from '@/constant/LoginState'
import { ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { validateEmail } from '../rules'
import { useI18n } from 'vue-i18n'
import CountDownEmailCode from '@/components/Countdown/src/CountDownEmailCode.vue'
import serviceInstance from '@/axios/service'
const store = useStore()
const { t } = useI18n()
const formRef = ref()
const isCanSendEmailCode = ref(true)
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
  ]
})
const getShow = computed(
  () => store.state.user.currentState === LoginState.RESET_PASSWORD
)
const loading = ref(false)
// 处理密码框文本显示状态
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
const formData = ref({
  username: store.state.user.loginAccount || '',
  email: '872937094@qq.com',
  captcha: '',
  password: ''
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
  () => store.state.user.loginAccount,
  val => (formData.value.username = val)
)
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
watch(
  () => formData.value.username,
  val => store.commit('user/setLoginAccount', val)
)
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
    :rules="formRules"
    :model="formData"
    class="fogetForm"
    @keypress.enter="handleReset"
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
    <!-- <el-form-item class="enter-x" prop="mobile">
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
    </el-form-item> -->
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
    <el-form-item class="enter-x count" prop="sms">
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
    <el-form-item class="enter-x">
      <el-button
        type="primary"
        style="width: 100%;"
        :loading="loading"
        @click="handleReset"
      >
        {{ $t('msg.login.reset') }}
      </el-button>
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button
        style="width: 100%;"
        :loading="loading"
        @click="handleBackLogin"
      >
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
.fogetForm {
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
