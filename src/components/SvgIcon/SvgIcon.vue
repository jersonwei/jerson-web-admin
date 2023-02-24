<script setup>
import { isExternal as external } from '@/utils/isExternal'
import { computed, defineProps } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})
const isExternal = computed(() => external(props.icon))
/**
 * 外部图标
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50% `
}))
/**
 * 内部图标
 */
// const iconName = computed(() => `#icon-${props.icon}`)
</script>
<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  ></div>
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use />
  </svg>
</template>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15rem;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  display: inline-block;
  mask-size: cover !important;
  background-color: currentColor;
}
</style>
