import type { App } from 'vue'
import NcContact from './contact.vue'

export interface Contact {
  id: number
  nickname: string
  lastMessage: string
  lastTime: number
  avatar: string
  quiet?: boolean
}

NcContact.install = (app: App) => {
  app.component(NcContact.name, NcContact)
  return app
}

export default NcContact
