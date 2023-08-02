import type { App, Plugin } from 'vue'
import NcEditor from './editor.vue'

export const NcEditorPlugin: Plugin = {
  install(app: App) {
    app.component(NcEditor.name, NcEditor)
  },
}

export { NcEditor }
