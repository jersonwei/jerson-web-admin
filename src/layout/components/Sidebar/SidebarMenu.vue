<script setup>
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import { computed } from 'vue'
import SiderbarItem from './SiderbarItem.vue'
const routes = computed(() => {
  const filterRoute = filterRouters(router.getRoutes())
  return generateMenus(filterRoute)
})
console.log(routes)
const router = useRouter()
</script>
<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!$store.getters.sideBarOpen"
    :uniqueOpened="true"
    default-active="2"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <SiderbarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></SiderbarItem>
  </el-menu>
</template>
<style lang="scss" scoped>
.hideSidebar {
  .el-menu-item,
  .el-sub-menu__title {
    padding: 0px !important;

    padding-left: 20px !important;
  }
}
</style>
