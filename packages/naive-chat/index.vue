<script setup lang="ts">
import { provide, ref } from 'vue'
import type { Contact } from '../'

import { NcContact, NcMenu, NcMessage } from '../'

const props = defineProps<{
  contacts: Contact[]
}>()

const emits = defineEmits<{
  (e: 'changeContact', contact: Contact): void
}>()
defineOptions({
  name: 'NaiveChat',
})

const activeMenuKey = ref<string>('')
const activeMessage = ref<Contact>()
provide('active-message', activeMessage)
provide('active-menu-key', activeMenuKey)

provide('contacts', props.contacts)

function changeContact(contact: Contact) {
  emits('changeContact', contact)
}
</script>

<template>
  {{ activeMenuKey === 'message' }}
  <div
    h-650px w-800px
    border rounded-4px
    flex="~"
  >
    <NcMenu />
    <div
      h-full w-220px
      border-r
      flex="~ col"
    >
      <NcContact v-if="activeMenuKey === 'message'" @change-contact="changeContact" />
      <div v-else />
    </div>

    <NcMessage />
  </div>
</template>
