<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumData" :key="item.path">
      <!-- 不可点击项 -->
      <span v-if="index === breadcrumData.length - 1" class="no-redirect">{{
        item.meta.title
      }}</span>
      <!-- 可点击项 -->
      <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
        item.meta.title
      }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const breadcrumData = ref([])
const getBreadcrumDta = () => {
  breadcrumData.value = route.matched.filter(
    item => item.meta && item.meta.title
  )
  console.log(breadcrumData.value)
}
const store = useStore()
// eslint-disable-next-line
const linkHoverColor = ref(store.getters.cssVar.menuBg)
const onLinkClick = item => {
  console.log(item)
  router.push(item.path)
}
watch(route, () => getBreadcrumDta(), { immediate: true })
</script>

<style lang="scss" scoped>
.breadcrumb {
  float: left;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
