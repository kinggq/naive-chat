export interface UserInfo {
  id: number
  nickname: string
  avatar: string
}

export type ContentType = 'text'

export interface FromUser {
  id: number
  avatar?: string
}

export interface Message {
  id: string
  content: string
  type: ContentType
  fromUser: FromUser
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
