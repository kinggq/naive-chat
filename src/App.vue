<script setup lang="ts">
import { ref } from 'vue'
import type { Contact, Message, PullMessageOption, SendOption } from '../packages'
import { NaiveChat } from '../packages'
import { generateUUID } from '../packages/_utils'

const userInfo = {
  nickname: 'King',
  avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
  id: 1000,
}
const contacts = ref<Contact[]>([])

for (let i = 0; i < 20; i++) {
  const id = i + 1
  contacts.value.push({
    id,
    nickname: `好友${1 + i}`,
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    lastMessage: (i + 2) % 2 === 0 ? 'helloooooooo00000000' : undefined,
    lastTime: i === 6 ? 1690639200000 : Date.now(),
    index: i <= 3 ? 'A' : i > 3 && i <= 7 ? 'C' : 'D',
    unread: id === 1 ? 10 : id === 3 ? 2 : 0,
  })
}
// console.log('1')
function changeContact(contact: Contact) {
  // console.log('组件', contact)
  Boolean(contact.avatar)
}

const avatar1 = 'https://img2.baidu.com/it/u=3681172266,4264167375&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690995600&t=1cff4e7d456c4118076598b7c03fe190'
const avatar2 = 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132'
const messages: Message[] = [
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: 1690639200000,
    fromUser: {
      id: 1,
      avatar: avatar1,
    },
  },
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: 1690624800000,
    fromUser: {
      id: 1,
      avatar: avatar1,
    },
  },
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1,
    status: 'success',
    sendTime: 1690740000000,
    fromUser: {
      id: 1000,
      avatar: avatar2,
    },
  },
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: 1690714800000,
    fromUser: {
      id: 1,
      avatar: avatar1,
    },
  },
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: 1690992000000,
    fromUser: {
      id: 1,
      avatar: avatar1,
    },
  },
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: 1690992000000,
    fromUser: {
      id: 1,
      avatar: avatar1,
    },
  },
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: 1690992000000,
    fromUser: {
      id: 1,
      avatar: avatar1,
    },
  },
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1,
    status: 'success',
    sendTime: 1690966800000,
    fromUser: {
      id: 1000,
      avatar: avatar2,
    },
  },
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1,
    status: 'success',
    sendTime: 1691074800000,
    fromUser: {
      id: 1000,
      avatar: avatar2,
    },
  },
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1,
    status: 'success',
    sendTime: 1691074800000,
    fromUser: {
      id: 1000,
      avatar: avatar2,
    },
  },
  {
    id: generateUUID(),
    content: `消息${generateUUID()}`,
    type: 'text',
    toContactId: 1000,
    status: 'success',
    sendTime: 1691056800000,
    fromUser: {
      id: 1,
      avatar: avatar1,
    },
  },
  {
    id: generateUUID(),
    content: '',
    type: 'file',
    toContactId: 1000,
    status: 'success',
    sendTime: 1691056800000,
    fileName: '艳萍简历.doc',
    fileSize: 18238,
    fromUser: {
      id: 1,
      avatar: avatar1,
    },
  },
  {
    id: generateUUID(),
    content: '',
    type: 'file',
    toContactId: 1,
    status: 'success',
    sendTime: 1691056800000,
    fileName: '我的简历.js',
    fileSize: 18238,
    fromUser: {
      id: 1000,
      avatar: avatar2,
    },
  },
]

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
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <NaiveChat
      :user-info="userInfo"
      :contacts="contacts"
      @change-contact="changeContact"
      @pull-message="pullMessage"
      @send="send"
    />
  </main>
</template>
