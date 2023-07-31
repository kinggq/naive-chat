import type { App } from 'vue'
import NcMenu from './menu.vue'

NcMenu.install = (app: App) => {
  app.component(NcMenu.name, NcMenu)
}

export { NcMenu }
