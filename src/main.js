import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { getInitialTheme, applyTheme } from './utils/theme.js'

// Apply stored or system theme before app mounts
applyTheme(getInitialTheme())

createApp(App).use(router).mount('#app')