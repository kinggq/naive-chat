import type { App } from 'vue'
import NcContact from './contact.vue'

NcContact.install = (app: App) => {
  app.component(NcContact.name, NcContact)
}

export { NcContact }
