<script setup>
import SidebarMenu from './SidebarMenu.vue'
const avatar = require('../../../assets/ailun.jpeg')
</script>
<template>
  <div>
    <div class="logo-container">
      <el-avatar
        shape="circle"
        :size="40"
        :src="avatar || $store.getters.userInfo.avatar"
      ></el-avatar>
      <span v-if="$store.getters.sideBarOpen" class="sideTitle">JersonWei</span>
    </div>
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>
<style lang="scss" scoped>
.logo-container {
  height: 54px;
  padding: 15px 0 15px 0;
  display: flex;
  align-items: start;
  justify-content: center;
  border-bottom: 1px solid #fff;
}
.el-avatar {
  vertical-align: middle;
}
.sideTitle {
  margin-left: 18px;
  font-size: 20px;
  font-weight: 700;
  line-height: 44px;
  color: #fff;
  white-space: nowrap;
}
</style>
