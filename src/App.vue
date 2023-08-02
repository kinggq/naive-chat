<script setup lang="ts">
import { ref } from 'vue'
import type { Contact, Message, PullMessageOption, SendOption } from '../packages'
import { NaiveChat } from '../packages'

const userInfo = {
  nickname: 'King',
  avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
  id: 1000,
}
const contacts = ref<Contact[]>([])

for (let i = 0; i < 10; i++) {
  contacts.value.push({
    id: i + 1,
    nickname: `好友${1 + i}`,
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    lastMessage: 'hello',
    lastTime: Date.now(),
  })
}
// console.log('1')
function changeContact(contact: Contact) {
  // console.log('组件', contact)
  Boolean(contact.avatar)
}

function pullMessage({ next, contactId }: PullMessageOption) {
  // console.log('pullMessage')
  if (contactId === 1000) {
    const messages: Message[] = []

    for (let i = 0; i < 20; i++) {
      messages.push({
        id: `${i}`,
        content: `消息${i + 1}`,
        type: 'text',
        toContactId: i % 2 !== 0 ? 1000 : 100 + i,
        status: 'success',
        sendTime: Date.now(),
        fromUser: {
          id: i % 2 === 0 ? 1000 : 100 + i,
          avatar: i % 2 === 0
            ? 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132'
            : 'https://img2.baidu.com/it/u=3681172266,4264167375&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690995600&t=1cff4e7d456c4118076598b7c03fe190',
        },
      })
    }
    asyncFn(() => {
      next(messages)
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
  }, 3000)
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
