<script setup>
import { generateI18nTitle } from '@/utils/i18n'
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>
<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ generateI18nTitle(props.title) }}</span>
</template>
<style lang="scss" scoped></style>
