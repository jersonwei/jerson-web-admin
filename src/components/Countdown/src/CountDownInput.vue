<script setup>
import CountDownButton from './CountDownButton.vue'
import { defineProps } from 'vue'
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
  }
})
</script>
<template>
  <el-input class="count-down" v-bind="$attrs" :size="size"> </el-input>
  <CountDownButton
    :size="size"
    :count="count"
    :beforeStartFunc="sendCodeApi"
  ></CountDownButton>
</template>
<style lang="scss" scoped>
.count-down {
  margin-right: 20px;
}
</style>
