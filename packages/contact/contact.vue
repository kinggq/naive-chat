<script setup lang="ts">
import { NcAvatar } from '..'
import { formatDate } from '../_utils'
import type { Contact } from './types'

defineProps<{
  contact: Contact
  lastMessage?: boolean
}>()

defineOptions({
  name: 'NcContact',
})
</script>

<template>
  <div
    cursor-pointer
    p-10px
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
        <div w-full text-right>
          {{ formatDate(contact.lastTime!) }}
        </div>
        <div v-if="contact.quiet" i-ri:notification-off-line />
      </div>
    </div>
  </div>
</template>
