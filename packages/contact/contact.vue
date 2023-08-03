<script setup lang="ts">
import { NcAvatar } from '..'
import { dateFormat } from '../_utils'
import type { Contact } from './types'

const props = defineProps<{
  contact: Contact
  lastMessage?: boolean
}>()

defineOptions({
  name: 'NcContact',
})

const activeContact = inject<Ref<Contact>>('current-contact')

function getContactClass(contact: Contact) {
  if (props.lastMessage)
    return contact.id === activeContact?.value?.id ? 'bg-gray-500/10' : 'gray-500/4 hover:gray-500/10'
}
</script>

<template>
  <div
    cursor-pointer
    p-10px
    :class="getContactClass(contact)"
  >
    <div
      flex="~"
      justify-between
    >
      <div flex="~ items-center" overflow-hidden>
        <NcAvatar :url="contact.avatar" />
        <div flex-1 truncate pl-10px text-left>
          <div text-14px font-400>
            {{ contact.nickname }}
          </div>
          <div
            v-if="lastMessage"
            w-full
            truncate
            text="gray-500/80 12px"
          >
            {{ contact.lastMessage }}
          </div>
        </div>
      </div>
      <div
        v-if="lastMessage"
        flex="~ col items-center"
        text="12px gray-500/50 right"
        justify-top min-w-50px
      >
        <div>
          {{ dateFormat(contact.lastTime!) }}
        </div>
        <div v-if="contact.quiet" i-ri:notification-off-line />
      </div>
    </div>
  </div>
</template>
