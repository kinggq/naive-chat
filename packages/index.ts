import '@unocss/reset/tailwind.css'
import 'uno.css'
import type { App, Plugin } from 'vue'
import plugins from './components'

const NaiveChatP: Plugin = {
  install(app: App) {
    plugins.forEach((plugin) => {
      plugin.install?.(app)
    })
  },
}

export * from './types'
export * from './components'
export default NaiveChatP
