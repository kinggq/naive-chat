<script setup lang="ts">
import { ref } from 'vue'
import type { Contact } from '../packages'

const contacts = ref<Contact[]>([])

for (let i = 0; i < 10; i++) {
  contacts.value.push({
    id: i,
    nickname: `好友${1 + i}`,
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
    lastMessage: 'hello',
    lastTime: Date.now(),
  })
}

function changeContact(contact: Contact) {
  console.log('组件', contact)
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <NaiveChat :contacts="contacts" @change-contact="changeContact" />
  </main>
</template>
