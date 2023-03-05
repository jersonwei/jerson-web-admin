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
        localStorage.setItem(TAGS_VIEW, JSON.stringify(state.tagsViewList))
      }
    },
    changeTagsData (state, { index, tag }) {
      state.tagsViewList[index] = tag
    },
    /**
     * @param {type: 'other' || 'right' || 'index'} payload
     */
    removeTagData (state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      localStorage.setItem(TAGS_VIEW, JSON.stringify(state.tagsViewList))
    }
  },
  actions: {},
  getters: {}
}
