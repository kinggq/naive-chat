import { NaiveChat, NaiveChatPlugin } from './naive-chat'

import { NcMenu, NcMenuPlugin } from './menu'
import { NcContact, NcContactPlugin } from './contact'
import { NcMessage, NcMessagePlugin } from './message'
import { NcAvatar, NcAvatarPlugin } from './avatar'

export {
  NaiveChat,
  NcContact,
  NcMessage,
  NcMenu,
  NcAvatar,
}
export default [
  NaiveChatPlugin,
  NcMenuPlugin,
  NcMessagePlugin,
  NcContactPlugin,
  NcAvatarPlugin,
]
