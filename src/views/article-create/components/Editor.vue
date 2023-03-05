<script setup>
import E from 'wangeditor'
import { onMounted, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import i18next from 'i18next'
import { commitArticle } from './commit'
const props = defineProps({
  title: {
    required: true,
    type: String
  }
})
const emits = defineEmits(['onSuccess'])
const store = useStore()
// Editor实例
let editor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化相关处理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}
const onSubmitClick = async () => {
  // 创建文章
  await commitArticle({
    title: props.title,
    content: editor.txt.html()
  })

  editor.txt.html('')
  emits('onSuccess')
}
</script>
<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
