import '@unocss/reset/tailwind.css'
import 'uno.css'
import type { App } from 'vue'

import components from './components'

export * from './components'
function install(app: App) {
  components.forEach((component) => {
    app.use(component as unknown as { install: () => void })
  })
}

export * from './contact'
export default { install }
