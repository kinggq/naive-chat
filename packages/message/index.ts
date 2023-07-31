import type { App } from 'vue'
import NcMessage from './message.vue'

NcMessage.install = (app: App) => {
  app.component(NcMessage.name, NcMessage)
}

export { NcMessage }
