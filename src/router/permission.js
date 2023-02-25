import store from '@/store'
import router from '.'
const whiteList = ['/login', 'about', '484', 'Not Found']
router.beforeEach((to, from, next) => {
  console.log(store.getters.token)
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
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
