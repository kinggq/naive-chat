import type { App } from 'vue'
import NaiveChat from './index.vue'

NaiveChat.install = (app: App) => {
  app.component(NaiveChat.name, NaiveChat)
  return app
}

export { NaiveChat }
