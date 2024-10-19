import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createTheme } from './plugins/theme'
import router from './router'
import App from './App.vue'
import './assets/styles.css'

const app = createApp(App)
const pinia = createPinia()
const theme = createTheme({ storageKey: 'later-on-theme' })

app.use(pinia)
app.use(theme)
app.use(router)
app.mount('#app')
