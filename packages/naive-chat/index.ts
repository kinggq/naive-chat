import type { App, Plugin } from 'vue'
import NaiveChat from './index.vue'

export const NaiveChatPlugin: Plugin = {
  install(app: App) {
    app.component(NaiveChat.name, NaiveChat)
  },
}

export { NaiveChat }
