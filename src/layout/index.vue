<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import variable from '@/style/variable.module.scss'
</script>
<template>
  <div class="app-wrapper">
    <!-- 左侧 menu -->
    <sidebar
      id="guide-sidebar"
      :style="{ backgroundColor: variable.menuBg }"
      class="sidebar-container"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '~@/style/mixin.scss';
// @import '~@/style/variable.module.scss';
$sideBarWidth: 210px;
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>
