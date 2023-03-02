import variable from '@/style/variable.module.scss'
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: state => variable,
  siderBarOpen: state => state.app.siderBarOpen
}
export default getters
