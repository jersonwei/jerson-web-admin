<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import TagsView from '@/components/TagsView/index.vue'
// import variable from '@/style/variable.module.scss'
</script>
<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sideBarOpen ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 menu -->
    <sidebar
      id="guide-sidebar"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
      class="sidebar-container"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
        <tags-view id="guide-tags"></tags-view>
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '~@/style/mixin.scss';
@import '~@/style/variable.module.scss';
$sideBarWidth: 210px;
$hideSideBarWidth: 54px;
$sideBarDuration: 0.28s;
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
  transition: width #{$sideBarDuration};
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
