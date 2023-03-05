import store from '@/store'
import router from '.'
const whiteList = ['/login', 'about', '404', 'Not Found']
export async function init () {
  if (store.getters.token) {
    const { permission } = await store.dispatch('user/getUserInfo')
    console.log(permission)
    // 处理用户权限，筛选出需要添加的权限
    const filterRoutes = await store.dispatch(
      'permission/filterRoutes',
      permission.menus
    )
    // 利用 addRoute 循环添加
    filterRoutes.forEach(item => {
      router.addRoute(item)
    })
  }
}
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    console.log(to, store.state.permission.routes)
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在
      if (!store.getters.hasUserInfo) {
        // await store.dispatch('user/getUserInfo')
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await store.dispatch('user/getUserInfo')
        console.log(permission)
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        // eslint-disable-next-line
        return next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
