<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <el-submenu v-if="route.children.length" :index="route.path">
    <template #title>
      <MenuItem :title="route.meta.title" :icon="route.meta.icon"></MenuItem>
    </template>
    <!-- 循环渲染 -->
    <!-- 循环渲染 -->
    <siderbar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></siderbar-item>
  </el-submenu>
  <el-menu-item v-else :index="route.path">
    <MenuItem :title="route.meta.title" :icon="route.meta.icon"></MenuItem>
  </el-menu-item>
</template>
<style lang="scss" scoped></style>
