import '@unocss/reset/tailwind.css'
import 'uno.css'
import type { App, Plugin } from 'vue'
import { NaiveChat, NaiveChatPlugin } from './naive-chat'

import { NcMenu, NcMenuPlugin } from './menu'
import { NcContact, NcContactPlugin } from './contact'
import { NcMessage, NcMessagePlugin } from './message'
import { NcAvatar, NcAvatarPlugin } from './avatar'
import { NcEditor, NcEditorPlugin } from './editor'
import { NcBadge, NcBadgePlugin } from './badge'

export type NaiveChatType = InstanceType<typeof NaiveChat>
export type NcMenuType = InstanceType<typeof NcMenu>
export type NcContactType = InstanceType<typeof NcContact>
export type NcAvatarType = InstanceType<typeof NcAvatar>
export type NcMessageType = InstanceType<typeof NcMessage>
export type NcEditorType = InstanceType<typeof NcEditor>
export type NcBadgeType = InstanceType<typeof NcBadge>

const components = [
  NaiveChatPlugin,
  NcMenuPlugin,
  NcMessagePlugin,
  NcContactPlugin,
  NcAvatarPlugin,
  NcEditorPlugin,
  NcBadgePlugin,
]
const NaiveChatP: Plugin = {
  install(app: App) {
    components.forEach((plugin) => {
      plugin.install?.(app)
    })
  },
}

export {
  NaiveChat,
  NcContact,
  NcMessage,
  NcMenu,
  NcAvatar,
  NcEditor,
  NcBadge,
}
export * from './contact/types'
export * from './naive-chat/types'
export * from './menu/types'
export default NaiveChatP
