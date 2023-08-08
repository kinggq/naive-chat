<script setup lang="ts">
import type { Contact, PullMessageOption, SendOption } from '../packages'
import { NaiveChat } from '../packages'
import { contacts, messages } from './utils'

const userInfo = {
  nickname: 'King',
  avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
  id: 1000,
}

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
