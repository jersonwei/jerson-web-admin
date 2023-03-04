<script setup>
import CountdownInput from '@/components/Countdown/src/CountDownInput.vue'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { LoginState } from '../../../constant/LoginState'
import { validateMobileNumber } from '../rules'
import { useI18n } from 'vue-i18n'
const store = useStore()
const formData = ref({
  mobile: '',
  sms: ''
})
const { t } = useI18n()
const formRef = ref()
const loading = ref(false)
const mobileFormRules = ref({
  mobile: [
    {
      required: true,
      message: t('msg.toast.phoneRulesToast'),
      trigger: 'change',
      validator: validateMobileNumber()
    }
  ]
})
const handleReset = async () => {
  ElMessage.warning(t('msg.toast.notSupportPhoneLog'))
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
    class="mobileForm"
    :rules="mobileFormRules"
    :model="formData"
    @keypress.enter="handleReset"
  >
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
    <el-form-item class="enter-x count" prop="sms">
      <span class="svgComponent">
        <el-icon><ChatLineSquare /></el-icon>
      </span>
      <CountdownInput
        v-model="formData.sms"
        :placeholder="$t('msg.login.verifyCode')"
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
        {{ $t('msg.login.loginBtn') }}
      </el-button>
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button size="large" @click="handleBackLogin" style="width: 100%;">
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
.mobileForm {
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
