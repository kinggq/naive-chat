import type { App } from 'vue'
import NcMenu from './menu.vue'

export interface Menu {
  key: string
  icon: string
  activeIcon: string
  active: boolean
}
NcMenu.install = (app: App) => {
  app.component(NcMenu.name, NcMenu)
}

export { NcMenu }
