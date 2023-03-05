<template>
  <div class="navbar">
    <hamburger class="hamburger-container"></hamburger>
    <bread-crumb
      id="guide-breadcrumb"
      class="breadcrumb-container"
    ></bread-crumb>
    <div class="right-menu">
      <Guide class="right-menu-item  hover-effect"></Guide>
      <HeaderSearch class="right-menu-item  hover-effect"></HeaderSearch>
      <Screenfull class="right-menu-item  hover-effect"></Screenfull>
      <ThemeSelect class="right-menu-item  hover-effect"></ThemeSelect>
      <lang-select
        effect="dark"
        class="right-menu-item hover-effect"
      ></lang-select>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="circle"
            :size="40"
            :src="avatar || $store.getters.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('msg.navBar.home') }} </el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/jersonwei/jerson-web-admin"
            >
              <el-dropdown-item>{{
                $t('msg.navBar.repoSite')
              }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="handleLogOut">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import hamburger from '@/components/Hamburger/index.vue'
import breadCrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
import Guide from '@/components/Guide/index.vue'
const store = useStore()
const avatar = require('../../assets/ailun.jpeg')
const handleLogOut = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    padding-right: 16px;

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        // margin-top: 5px;
        display: flex;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          // margin-right: 12px;
          &:hover {
            background-color: #eee;
          }
        }
        i {
          padding-top: 8px;
          padding-left: 5px;
          font-size: 25px;
          vertical-align: super;
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
  ::v-deep .right-menu-item {
    display: inline-block;
    padding: 0 18px 0 0;
    font-size: 28px;
    // position: absolute;
    // right: 80px;
    // top: 15px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
    }
  }
}
</style>
