import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { usePiniaLocalStorage } from './composables/piniaLocalStorage'
import { createTheme } from './plugins/theme'
import router from './router'
import App from './App.vue'
import './assets/styles.css'

const pinia = createPinia().use(usePiniaLocalStorage({ storageKey: 'later-on-REMOVEME' }))
const theme = createTheme({ storageKey: 'later-on-theme' })

createApp(App)
    .use(pinia)
    .use(theme)
    .use(router)
    .mount('#app')
