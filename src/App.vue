<script setup lang="ts">
import { NaiveChat } from '../packages'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type {
  Contact,
  Message,
  NaiveChatType,
  PullMessageOption,
  SendOption,
} from '../packages'

import { contacts, messages } from './utils'

const naiveChatRef = ref<NaiveChatType>()
const userInfo = {
  nickname: 'King',
  avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
  id: 1000,
}

onMounted(() => {
  naiveChatRef.value?.initContacts(contacts)
})

// console.log('1')
function changeContact(contact: Contact) {
  // console.log('组件', contact)
  Boolean(contact.avatar)
}

function pullMessage({ next, contactId }: PullMessageOption) {
  // console.log('pullMessage')
  if (contactId === 1) {
    asyncFn(() => {
      next(messages, true)
    })
  }
  else {
    asyncFn(() => {
      next([], true)
    })
  }
}

function asyncFn(fn: () => void) {
  setTimeout(() => {
    fn()
  }, 1000)
}

function send({ message, next }: SendOption) {
  asyncFn(() => {
    next({
      id: message.id,
      toContactId: message.toContactId,
      status: 'success',
    })
  })
}

function handleAppendMessage() {
  const msg: Message = {
    id: 'id1',
    content: '最近忙什么呢?',
    type: 'text',
    toContactId: 3,
    fromUser: {
      id: 3,
      nickname: '梁宏达',
      avatar: 'http://rz1wa9fyb.hb-bkt.clouddn.com/liang.jpeg',
    },
    sendTime: Date.now(),
    status: 'success',
    fileName: undefined,
  }
  naiveChatRef.value?.appendMessage(msg)
}

function handleRemoveMessage() {
  const lastMessage = naiveChatRef.value?.getCurrentLastMessage()
  if (lastMessage?.id) {
    const r = naiveChatRef.value?.removeOneMessage(lastMessage.toContactId, lastMessage.id)
    if (!r)
      alert('删除失败')
  }

  else { alert('删除失败') }
}

function handleSendMessage() {
  const c = naiveChatRef.value?.getCurrentContact()
  if (!c?.id) {
    alert('先开启一个好友的聊天窗口')
    return
  }
  const msg: Message = {
    id: 'id1x1',
    content: `hi,${c.nickname}`,
    type: 'text',
    toContactId: c.id,
    fromUser: userInfo,
    sendTime: Date.now(),
    status: 'success',
    fileName: undefined,
  }
  naiveChatRef.value?.appendMessage(msg)
}

function handleUpdateMessage() {
  const m = naiveChatRef.value?.getCurrentMessage()
  const len = m?.length
  if (!len) {
    alert('该联系没有可修改的消息')
    return
  }
  naiveChatRef.value?.updateMessage({
    ...m[len - 1],
    type: 'file',
    content: '',
    fileName: '修改了一条消息',
    fileSize: 10000,
  } as Message)
}

function handleUpdateContact() {
  const c = naiveChatRef.value?.getCurrentContact()
  naiveChatRef.value?.updateContact({
    ...c,
    nickname: '梁老师',
  } as Contact)
}

let createContactId = 10011
function handleAddContact() {
  createContactId += 1
  naiveChatRef.value?.appendContact({
    id: createContactId,
    nickname: `好友${createContactId}`,
    avatar: '',
    index: 'H',
  })
}

function handleSendEventMessage() {
  const c = naiveChatRef.value?.getCurrentContact()
  if (!c?.id) {
    alert('先开启一个好友的聊天窗口')
    return
  }
  const msg: Message = {
    id: 'id1x1',
    content: '我撤回了一条消息*重新编辑',
    type: 'event',
    toContactId: c.id,
    fromUser: userInfo,
    sendTime: Date.now(),
    status: 'success',
    fileName: undefined,
  }
  naiveChatRef.value?.appendMessage(msg)
}

function handleEventMessageClick() {
  alert('点击了Event消息')
}

function handleSetValue() {
  naiveChatRef.value?.setValue('you wife is charming')
}

const rounded = ref(4)
function handleAvatarRounded() {
  if (rounded.value === 4)
    rounded.value = 40
  else
    rounded.value = 4
}
</script>

<template>
  <BaseHeader />
  <main p="x-4 y-10" mt-100px min-w-800px>
    <NaiveChat
      ref="naiveChatRef"
      :user-info="userInfo"
      :avatar-rounded="rounded"
      @change-contact="changeContact"
      @pull-message="pullMessage"
      @send="send"
      @event-message-click="handleEventMessageClick"
    />

    <div py-20px flex="~ gap3">
      <button btn @click="handleAppendMessage">
        梁老师发来一条消息
      </button>
      <button btn @click="handleRemoveMessage">
        删除一条消息
      </button>
      <button btn @click="handleSendMessage">
        发送一条消息
      </button>
      <button btn @click="handleUpdateMessage">
        修改一条消息
      </button>
      <button btn @click="handleUpdateContact">
        修改联系人
      </button>
    </div>
    <div flex="~ gap3">
      <button btn @click="handleAddContact">
        添加一个联系人
      </button>
      <button btn @click="handleSendEventMessage">
        发送一条Event消息
      </button>
      <button btn @click="handleSetValue">
        给输入框插入内容
      </button>
      <button btn @click="handleAvatarRounded">
        切换头像形状
      </button>
    </div>

    <div mt-50px text="center gray-700 dark:gray-200">
      <Props />
      <Events />
      <Methods />
      <Slots />
      <UserInfo />
      <ContactType />
      <Message />
    </div>
  </main>
</template>

<style>
table {
  width: 100%;
  text-align: left;
  border: solid 1px rgba(156, 163, 175, 0.1);
  border-bottom: none;
  border-right: none;
}
thead {
  background-color: rgba(156, 163, 175, 0.1);
}
th {
  font-weight: 500;
}
td {
  font-size: 14px;
}
th, td {
  border-bottom: solid 1px rgba(156, 163, 175, 0.1);
  border-right: solid 1px rgba(156, 163, 175, 0.1);
  padding: 10px;
}
code {
  padding: 2px 10px;
  background-color: rgba(156, 163, 175, 0.1);
  border-radius: 2px;
}
</style>
