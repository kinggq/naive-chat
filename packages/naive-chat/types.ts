export interface UserInfo {
  id: number
  nickname: string
  avatar: string
}

export type ContentType = 'text' | 'event' | 'file' | 'image'

export interface FromUser {
  id: number
  nickname?: string
  avatar?: string
}

export type SendMessageStatus = 'success' | 'error' | 'going'

export interface Message {
  id: string
  content: string
  type: ContentType
  toContactId: number
  fromUser: FromUser
  sendTime: number
  status: SendMessageStatus
  fileName?: string
  fileSize?: number
}

export type PullMessageNext = (message: Message[], isEnd?: boolean) => void

export interface PullMessageOption {
  next: PullMessageNext
  contactId: number
}

export interface MessageStatus {
  loading: boolean
  data: Message[]
  isEnd: boolean
}

export interface MessageStore {
  [id: number]: MessageStatus
}

type SomeOptionalMessage = {
  toContactId: number
  id: string
  status: SendMessageStatus
} & Partial<Omit<Message, 'toContactId' | 'id' | 'status'>>

export interface SendOption {
  message: Message
  next: (message: SomeOptionalMessage) => void
  file?: File
}
