import type { App, Plugin } from 'vue'
import NcMessage from './message.vue'

export const NcMessagePlugin: Plugin = {
  install(app: App) {
    app.component(NcMessage.name, NcMessage)
  },
}

export { NcMessage }
