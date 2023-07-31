<script setup lang="ts">
import type { Contact } from 'packages'

// import NcContact from '../'

const props = defineProps<{
  contacts: Contact[]
}>()

defineOptions({
  name: 'NaiveChat',
})

const activeMenuKey = ref<string>('')
const activeMessage = ref<Contact>()
provide('active-message', activeMessage)
provide('active-menu-key', activeMenuKey)

provide('contacts', props.contacts)
</script>

<template>
  {{ activeMenuKey === 'message' }}
  <div
    h-650px w-800px
    border rounded-4px
    flex="~"
  >
    <nc-menu />
    <div
      h-full w-220px
      border-r
      flex="~ col"
    >
      <NcContact v-if="activeMenuKey === 'message'" />
      <div v-else />
    </div>

    <nc-message />
  </div>
</template>
