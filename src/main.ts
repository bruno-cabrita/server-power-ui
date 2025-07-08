import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router.ts'
import App from './App.vue'
import './style.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
