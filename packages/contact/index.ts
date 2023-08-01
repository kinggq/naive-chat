import type { App, Plugin } from 'vue'
import NcContact from './contact.vue'

export const NcContactPlugin: Plugin = {
  install(app: App) {
    app.component(NcContact.name, NcContact)
  },
}

export { NcContact }
