<script setup>
import CountDownButton from './CountDownButton.vue'
import { defineProps, defineEmits, ref } from 'vue'
defineProps({
  size: {
    type: String,
    validator: v => ['default', 'large', 'small'].includes(v)
  },
  count: {
    type: Number,
    default: 60
  },
  sendCodeApi: {
    type: Function,
    default: null
  },
  isDisabled: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['on-sendCaptcha'])
const haveSms = ref(true)
const handleGetSms = async () => {
  haveSms.value = !haveSms.value
  emits('on-sendCaptcha')
}
</script>
<template>
  <el-input :disabled="haveSms" class="count-down" v-bind="$attrs" :size="size">
  </el-input>
  <CountDownButton
    :disabled="isDisabled"
    :size="size"
    @getSms="handleGetSms"
    @resetSms="haveSms = true"
    :count="count"
    :beforeStartFunc="sendCodeApi"
  ></CountDownButton>
</template>
<style lang="scss" scoped>
.count-down {
  margin-right: 20px;
}
</style>
