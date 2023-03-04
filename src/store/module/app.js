import { LANG, TAGS_VIEW } from '@/constant/LoginState'

export default {
  namespaced: true,
  state: () => ({
    sideBarOpen: true,
    language: localStorage.getItem(LANG) || 'zh',
    tagsViewList: localStorage.getItem(TAGS_VIEW) || []
  }),
  mutations: {
    setSiderBarState (state, val) {
      state.sideBarOpen = !state.sideBarOpen
    },
    setLanguage (state, val) {
      localStorage.setItem(LANG, val)
      state.language = val
    },
    addTagsViewList (state, tag) {
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.tagsViewList.push(tag)
        localStorage.setItem(TAGS_VIEW, state.tagsViewList)
      }
    }
  },
  actions: {},
  getters: {}
}
