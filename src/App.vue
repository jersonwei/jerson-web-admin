<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex'
import { watchSwitchLang } from './utils/i18n'
import { generateNewStyle, writeNewStyle } from './utils/theme'
const store = useStore()
generateNewStyle(store.getters.mainColor).then(newStyle => {
  writeNewStyle(newStyle)
})
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
