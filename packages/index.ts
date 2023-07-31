import type { App } from 'vue'
import components from './components'

function install(app: App) {
  components.forEach((component) => {
    app.use(component as unknown as { install: () => any })
  })
}

export * from './contact'
export * from './components'
export default install
