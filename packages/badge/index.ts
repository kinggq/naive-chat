import type { App, Plugin } from 'vue'
import NcBadge from './badge.vue'

export const NcBadgePlugin: Plugin = {
  install(app: App) {
    app.component(NcBadge.name, NcBadge)
  },
}

export { NcBadge }
