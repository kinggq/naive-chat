import type { App, Plugin } from 'vue'
import NcAvatar from './avatar.vue'

export const NcAvatarPlugin: Plugin = {
  install(app: App) {
    app.component(NcAvatar.name, NcAvatar)
  },
}

export { NcAvatar }
