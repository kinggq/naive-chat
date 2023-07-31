import { createApp } from 'vue'
import NaiveChat from '../packages'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)
app.use(NaiveChat)
app.mount('#app')
