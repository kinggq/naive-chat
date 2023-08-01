import { NaiveChat, NaiveChatPlugin } from './naive-chat'

import { NcMenu, NcMenuPlugin } from './menu'
import { NcContact, NcContactPlugin } from './contact'
import { NcMessage, NcMessagePlugin } from './message'

export {
  NaiveChat,
  NcContact,
  NcMessage,
  NcMenu,
}
export default [
  NaiveChatPlugin,
  NcMenuPlugin,
  NcMessagePlugin,
  NcContactPlugin,
]
