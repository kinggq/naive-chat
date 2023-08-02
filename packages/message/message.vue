<script setup lang="ts">
import type { Contact, Message, MessageStatus, UserInfo } from 'packages'
import { NcAvatar } from '../'

const emits = defineEmits<{
  (e: 'pullMessage', next: () => void): void
}>()

defineOptions({
  name: 'NcMessage',
})

const userInfo = inject<ComputedRef<UserInfo>>('user-info')
const currentContact = inject<Ref<Contact>>('current-contact')!

const currentMessage = inject<Ref<MessageStatus>>('current-message')!

function getContentClass(content: Message) {
  if (content.fromUser.id === userInfo?.value.id)
    return 'flex flex-row-reverse'
  return 'flex flex-justify-start'
}

async function onScroll(event: Event) {
  const el = event.target as HTMLElement

  theTop(el.scrollTop)
}

watch(() => currentContact.value, () => {
  theTop()
})

const scrollContainer = ref<HTMLElement>()

async function scrollToBottom() {
  await nextTick()
  if (scrollContainer.value)
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
}

async function theTop(scrollTop?: number) {
  if (currentMessage.value.isEnd)
    return
  if (scrollTop && scrollTop === 0) {
    // console.log('onScroll 1')
    currentMessage.value.loading = true
    emits('pullMessage', () => {
      currentMessage.value.loading = false
    })
  }
  await nextTick()
  if (scrollContainer.value?.scrollTop === 0) {
    // console.log('onScroll 2')
    currentMessage.value.loading = true
    emits('pullMessage', () => {
      currentMessage.value.loading = false
    })
  }
}

defineExpose({ scrollToBottom })
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
        {{ currentContact?.nickname }}
      </div>
      <div i-ri:more-line />
    </div>
    <div
      ref="scrollContainer"
      flex-1
      overflow-auto px-15px
      py-10px
      @scroll="onScroll"
    >
      <div v-if="currentMessage?.loading">
        Loading...
      </div>
      <div
        v-for="item in (currentMessage ?? {}).data"
        :key="item.id"
        w-full py-10px
      >
        <div :class="getContentClass(item)">
          <div>
            <NcAvatar :url="item.fromUser.avatar || ''" />
          </div>
          <div flex items-center>
            <div v-if="item.status === 'going'">
              <div i-ri:loader-4-line text="gray-500/60" class="loading-icon" />
            </div>
            <div v-else-if="item.status === 'error'" cursor-pointer>
              <div i-ri:error-warning-line text="red-500/80" />
            </div>
            <div
              text="14px"
              flex="~ items-center"
              bg="green-500/60"
              ml-10px mr-10px
              rounded-6px
              px-10px py-5px
            >
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      border-t="1px gray-500/10"
      min-h-200px
    >
      <slot name="editor" />
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-icon {
  animation: spin 1s linear infinite;
}
</style>
