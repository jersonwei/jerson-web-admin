import { MAIN_COLOR } from '@/constant/LoginState'
import { generateColors } from '@/utils/theme'
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: state => ({
    ...state.theme.variable,
    ...generateColors(localStorage.getItem(MAIN_COLOR))
  }),
  sideBarOpen: state => state.app.sideBarOpen,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor
}
export default getters
