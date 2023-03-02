<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const icon = computed(() => {
  return store.getters.sideBarOpen ? 'hamburger-opened' : 'hamburger-closed'
})
const toggleClick = () => {
  store.commit('app/setSiderBarState')
}
</script>
<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hanburger" :icon="icon"></svg-icon>
  </div>
</template>
<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
