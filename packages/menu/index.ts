import type { App, Plugin } from 'vue'
import NcMenu from './menu.vue'

export const NcMenuPlugin: Plugin = {
  install(app: App) {
    app.component(NcMenu.name, NcMenu)
  },
}

export { NcMenu }
