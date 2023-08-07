export interface Contact {
  id: number
  nickname: string
  lastMessage?: string
  lastTime?: number
  avatar: string
  quiet?: boolean
  unread?: number
  index: string
}
