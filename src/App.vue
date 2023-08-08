<script setup lang="ts">
import type { Contact, NaiveChatType, PullMessageOption, SendOption } from '../packages'
import { NaiveChat } from '../packages'
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
</script>

<template>
  <BaseHeader />
  <main p="x-4 y-10">
    <NaiveChat
      ref="naiveChatRef"
      :user-info="userInfo"
      @change-contact="changeContact"
      @pull-message="pullMessage"
      @send="send"
    />

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
