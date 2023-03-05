<script setup>
import PanThumb from './PanThumb/index.vue'
</script>
<template>
  <div class="">
    <pan-thumb
      :image="$store.getters.userInfo.avatar"
      :height="'100px'"
      :width="'100px'"
      :hoverable="false"
    >
      <div>Hello</div>
      {{ $store.getters.userInfo.title }}
    </pan-thumb>
  </div>
</template>
<style lang="scss" scoped></style>
