import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as routers from './router/permission'
import { toLine } from '@/utils/toLine'
import installIcons from '@/icons'
import './style/index.scss'
import * as Icons from '@element-plus/icons-vue'
import installElementPlus from './plugins/element'
import i18n from './i18n'
// filter
import installFilter from '@/filter'

const app = createApp(App)
installFilter(app)
for (const [key, component] of Object.entries(Icons)) {
  app.component(`el-icon-${toLine(key)}`, component)
}

for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}
installIcons(app)
installElementPlus(app)
async function call () {
  await routers.init()
  app
    .use(router)
    .use(store)
    .use(i18n)
    .mount('#app')
}
call()
