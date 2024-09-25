import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createTheme } from './plugins/theme'
import App from './App.vue'
import './assets/styles.css'

const app = createApp(App)
const pinia = createPinia()
const theme = createTheme()

app.use(pinia)
app.use(theme)
app.mount('#app')
