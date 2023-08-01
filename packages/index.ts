import '@unocss/reset/tailwind.css'
import 'uno.css'
import type { App } from 'vue'

import components from './components'

export * from './components'
function install(app: App) {
  components.forEach((component) => {
    // app.config.globalProperties[component.name] = component
    // app.provide(component.name, component)
    app.component(component.name, component)
  })
}

export * from './contact'
export default install
