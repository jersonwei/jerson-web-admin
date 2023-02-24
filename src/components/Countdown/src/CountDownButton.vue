<script setup>
import { isFunction } from '@/utils/is'
import { computed, ref, unref, defineProps } from 'vue'
const props = defineProps({
  count: {
    type: Number,
    default: 10
  },
  beforeStartFunc: {
    type: Function,
    default: null
  }
})
const loading = ref(false)
function useCountdown (count) {
  const currentCount = ref(count)
  const isStart = ref(false)

  let timerId

  function clear () {
    timerId && window.clearInterval(timerId)
  }

  function stop () {
    isStart.value = false
    clear()
    timerId = null
  }

  function start () {
    if (unref(isStart) || !!timerId) {
      return
    }
    isStart.value = true
    timerId = setInterval(() => {
      if (unref(currentCount) === 1) {
        stop()
        currentCount.value = count
      } else {
        currentCount.value -= 1
      }
    }, 1000)
  }

  function reset () {
    currentCount.value = count
    stop()
  }

  function restart () {
    reset()
    start()
  }

  function tryOnUnmounted () {
    return reset()
  }

  return {
    start,
    reset,
    restart,
    clear,
    stop,
    currentCount,
    isStart,
    tryOnUnmounted
  }
}
const { currentCount, isStart, start } = useCountdown(props.count)
const getButtonText = computed(() =>
  !unref(isStart) ? '获取验证码' : `${unref(currentCount)}秒后重新获取`
)
async function handleStart () {
  const { beforeStartFunc } = props
  if (beforeStartFunc && isFunction(beforeStartFunc)) {
    loading.value = true
    try {
      const canStart = await beforeStartFunc()
      canStart && start()
    } catch (error) {
    } finally {
      loading.value = false
    }
  } else {
    start()
  }
}
</script>
<template>
  <el-button :disabled="isStart" :loading="loading" @click="handleStart">
    {{ getButtonText }}
  </el-button>
</template>
<style lang="scss" scoped></style>
