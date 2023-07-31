<script setup lang="ts">
import type { Contact } from 'packages'

defineOptions({
  name: 'NcMessage',
})
const activeMessage = inject<Contact>('active-message')
</script>

<template>
  <div flex="~ 1 col" overflow-hidden>
    <div
      flex="~ justify-between"
      border-b="1px gray-500/10"
      px-20px py-15px
    >
      <div
        font-500
        text="14px gray-500/100"
      >
        {{ activeMessage?.nickname }}
      </div>
      <div i-ri:more-line />
    </div>
    <div flex="~ 1" />
    <div
      border-t="1px gray-500/10"
      h-200px
    />
  </div>
</template>
