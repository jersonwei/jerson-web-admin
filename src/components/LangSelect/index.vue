<script setup>
import { ElMessage } from 'element-plus'
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validate: function (params) {
      return ['dark', 'light'].indexOf(params) !== -1
    }
  }
})
const store = useStore()
const i18n = useI18n()
const language = computed(() => store.getters.language)
const selectLang = lang => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>
<template>
  <el-dropdown class="inernation" trigger="click" @command="selectLang">
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <svg-icon id="guide-lang" icon="language"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="language === 'zh'"
          >中文</el-dropdown-item
        >
        <el-dropdown-item command="en" :disabled="language === 'en'"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style lang="scss" scoped></style>
