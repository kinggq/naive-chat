<script setup lang="ts">
import { provide, ref } from 'vue'
import type { Contact, PullMessageNext } from '../'
import { NcContact, NcMenu, NcMessage } from '../'
import NcEditor from '../editor/editor.vue'
import type { Message, MessageStatus, MessageStore, PullMessageOption, SendOption, UserInfo } from './types'
import { generateUUID } from '~/_utils'

const props = defineProps<{
  userInfo: UserInfo
  contacts: Contact[]
}>()

const emits = defineEmits<{
  (e: 'changeContact', contact: Contact): void
  (e: 'pullMessage', { next, contactId }: PullMessageOption): void
  (e: 'send', { message, next }: SendOption): void
}>()

defineOptions({
  name: 'NaiveChat',
})

const contacts = ref(props.contacts)
const activeMenuKey = ref<string>('')
const currentContact = ref<Contact>()

const messageStore = reactive<MessageStore>({} as MessageStore)
const currentMessage = ref<MessageStatus>({} as MessageStatus)
const lastMessages = computed(
  () => contacts.value
    .filter(item => item.lastMessage)
    .sort((a, b) => b.lastTime! - a.lastTime!),
)

provide('message-store', messageStore)
provide('current-message', currentMessage)
provide('current-contact', currentContact)
provide('active-menu-key', activeMenuKey)
provide('user-info', computed(() => props.userInfo))
provide('contacts', contacts)
provide('last-messages', lastMessages)

const nativeMessageRef = ref<InstanceType<typeof NcMessage>>()

watchEffect(() => {
  currentMessage.value = messageStore[currentContact.value?.id || NaN]
})

function changeContact(contact: Contact) {
  if (!messageStore[contact.id]) {
    messageStore[contact.id] = {
      loading: true,
      data: [],
      isEnd: false,
    }
    emitPullMessage((messages, isEnd = false) => {
      messageStore[contact.id].loading = false
      messageStore[contact.id].isEnd = isEnd
      messageStore[contact.id].data.push(...messages)
      if (!messages.length)
        return
      const lastMsg = messages[messages.length - 1]
      updateContact({
        id: contact.id,
        lastMessage: lastMsg.content,
        lastTime: lastMsg.sendTime,
      } as Contact)
      scrollToBottom()
    })
  }
  else {
    scrollToBottom()
  }
  // console.log(messageStore)
}

function emitPullMessage(next: PullMessageNext) {
  emits('pullMessage', { contactId: currentContact.value!.id, next })
}

function scrollToBottom() {
  if (nativeMessageRef.value)
    nativeMessageRef.value.scrollToBottom()
}

function send(content: string) {
  const message = createMessage({ content } as Message)
  appendMessage(message)
  emits('send', {
    message,
    next(asyncMessage) {
      updateMessage(asyncMessage as Message)
    },
  })
}

function updateMessage(message: Message) {
  const index = messageStore[message.toContactId].data.findIndex(item => item.id === message.id)
  const historyMessage = messageStore[message.toContactId].data[index]
  messageStore[message.toContactId].data[index] = Object.assign(historyMessage, message, { toContactId: historyMessage.toContactId })
}

function appendMessage(message: Message) {
  if (messageStore[message.toContactId]) {
    messageStore[message.toContactId].data.push(message)
    updateContact({
      id: message.toContactId,
      lastMessage: message.content,
      lastTime: message.sendTime,
    } as Contact)
    scrollToBottom()
  }
}

function updateContact(contact: Contact) {
  const index = contacts.value.findIndex(item => item.id === contact.id)
  if (index === -1)
    return
  const oldContact = contacts.value[index]
  contacts.value[index] = { ...oldContact, ...contact }
}

function createMessage<T extends Message>(message: T): Message {
  return {
    ...{
      id: generateUUID(),
      sendTime: Date.now(),
      type: 'text',
      status: 'going',
      toContactId: currentContact.value!.id,
      fromUser: props.userInfo,
    },
    ...message,
  }
}

defineExpose<{

}>()
</script>

<template>
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
    <div flex-1 overflow-hidden>
      <NcMessage
        v-if="currentContact"
        ref="nativeMessageRef"
        @pull-message="next => emitPullMessage(next)"
      >
        <template #editor>
          <NcEditor @send="send" />
        </template>
      </NcMessage>
      <slot v-else name="default-page">
        <div
          h-full
          w-full
          flex="~"
          items-center
          justify-center
        >
          <div
            text="gray-500/50 100px"
            i-ri:wechat-line
          />
        </div>
      </slot>
    </div>
  </div>
</template>
