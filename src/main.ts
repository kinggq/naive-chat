import { createApp } from 'vue'
import NChat from '../packages'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)
app.use(NChat)
app.mount('#app')
