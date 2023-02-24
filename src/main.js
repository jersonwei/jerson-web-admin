import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { toLine } from '@/utils/toLine'
import './style/index.scss'
import * as Icons from '@element-plus/icons-vue'
import installElementPlus from './plugins/element'
const app = createApp(App)
for (const [key, component] of Object.entries(Icons)) {
  app.component(`el-icon-${toLine(key)}`, component)
}
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}
installElementPlus(app)
app
  .use(store)
  .use(router)
  .mount('#app')
