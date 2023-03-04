import variable from '@/style/variable.module.scss'
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: state => variable,
  sideBarOpen: state => state.app.sideBarOpen,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor
}
export default getters
