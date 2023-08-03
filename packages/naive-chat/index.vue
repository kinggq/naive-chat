<script setup lang="ts">
import { provide, ref } from 'vue'
import type { Contact, Menu, MenuKey } from '../'
import { NcAvatar, NcContact, NcMenu, NcMessage } from '../'
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

const menus = ref<Menu[]>([
  {
    key: 'message',
    icon: 'i-ri:chat-3-line',
    activeIcon: 'i-ri:chat-3-fill',
    active: true,
  },
  {
    key: 'contact',
    icon: 'i-ri:contacts-line',
    activeIcon: 'i-ri:contacts-fill',
    active: false,
  },
  {
    key: 'more',
    icon: 'i-ri:more-line',
    activeIcon: 'i-ri:more-fill',
    active: false,
  },
])

const contacts = ref(props.contacts)
const activeMenuKey = ref<MenuKey>('message')
const currentContact = ref<Contact>()
const editorRef = ref<InstanceType<typeof NcEditor>>()

const messageStore = reactive<MessageStore>({} as MessageStore)
const currentMessage = ref<MessageStatus>({} as MessageStatus)
const lastMessages = computed(
  () => contacts.value
    .filter(item => item.lastMessage)
    .sort((a, b) => b.lastTime! - a.lastTime!),
)

provide('menus', menus)
provide('message-store', messageStore)
provide('current-message', currentMessage)
provide('current-contact', currentContact)
provide<Ref<MenuKey>>('active-menu-key', activeMenuKey)
provide('user-info', computed(() => props.userInfo))
provide('contacts', contacts)
provide('last-messages', lastMessages)

const nativeMessageRef = ref<InstanceType<typeof NcMessage>>()

watchEffect(() => {
  currentMessage.value = messageStore[currentContact.value?.id || NaN]
})

function changeLastMessage(contact: Contact) {
  currentContact.value = contact

  if (!messageStore[contact.id]) {
    messageStore[contact.id] = {
      loading: true,
      data: [],
      isEnd: false,
    }
    emitPullMessage(() => {
      scrollToBottom()
    }, contact.id)
  }
  else {
    scrollToBottom()
  }
  focusInput()
  // console.log(messageStore)
}

async function focusInput() {
  await nextTick()
  editorRef.value?.focusInput()
}

function emitPullMessage(next: () => void, contactId?: number) {
  emits('pullMessage', {
    contactId: currentContact.value!.id,
    next(messages, isEnd) {
      messageStore[contactId!].loading = false
      messageStore[contactId!].isEnd = !!isEnd
      addMessage(messages, contactId!, 'unshift')
      if (!messages.length)
        return
      const lastMsg = messages[messages.length - 1]
      updateContact({
        id: contactId,
        lastMessage: lastMsg.content,
        lastTime: lastMsg.sendTime,
      } as Contact)
      next()
    },
  })
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
    addMessage([message], message.toContactId, 'push')
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

function addMessage(messages: Message[], contactId: number, type: 'push' | 'unshift') {
  messageStore[contactId].data[type](...messages)
}

let contactIndex = ''
function innerContactIndex(index: string) {
  if (index !== contactIndex) {
    contactIndex = index
    return true
  }

  return false
}

const currentOpenContact = ref<Contact>()
provide('current-open-contact', currentOpenContact)
function handleClickContact(contact: Contact) {
  currentOpenContact.value = contact
}

function toMessage(contact: Contact) {
  activeMenuKey.value = 'message'
  menus.value.forEach((item) => {
    if (item.key === activeMenuKey.value)
      item.active = true
    else
      item.active = false
  })
  updateContact({
    id: contact.id,
    lastMessage: ' ',
    lastTime: Date.now(),
  } as Contact)
  changeLastMessage(contact)
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
      <div v-if="activeMenuKey === 'message'" overflow-hidden flex="~ col">
        <slot name="sidebar-header">
          <div px-10px py-10px bg="gray/2">
            <input
              w-full
              rounded-2px
              px-10px py-2px text-14px
              bg="gray/10"
              type="text"
              placeholder="搜索"
            >
          </div>
        </slot>
        <div flex-1 overflow-y-auto>
          <NcContact
            v-for="item in lastMessages" :key="item.id"
            :contact="item"
            :last-message="true"
            :class="item.id === currentContact?.id ? 'bg-gray-500/10' : 'gray-500/4 hover:gray-500/10'"
            @click="changeLastMessage(item)"
          />
        </div>
      </div>
      <div v-else-if="activeMenuKey === 'contact'" overflow-y-auto>
        <div
          v-for="item in contacts"
          :key="item.id"
        >
          <div
            v-show="innerContactIndex(item.index)"
            text="left 12px gray-500/50"
            px-10px
          >
            <div py-10px border-b="1px gray-500/6">
              {{ item.index }}
            </div>
          </div>
          <NcContact
            :contact="item"
            :class="item.id === currentOpenContact?.id ? 'bg-gray-500/10' : 'gray-500/4 hover:gray-500/10'"
            @click="handleClickContact(item)"
          />
        </div>
      </div>
    </div>
    <div flex-1 overflow-hidden>
      <NcMessage
        v-if="currentContact && activeMenuKey === 'message'"
        ref="nativeMessageRef"
        @pull-message="emitPullMessage"
      >
        <template #editor>
          <NcEditor ref="editorRef" @send="send" />
        </template>
      </NcMessage>
      <div v-else-if="activeMenuKey === 'contact'" h-full>
        <div
          v-if="currentOpenContact"
          h-full
          flex items-center
          justify-center
        >
          <div>
            <NcAvatar :size="100" :url="currentOpenContact.avatar" />
            <div py-20px text="gray-800/90" font-500>
              {{ currentOpenContact.nickname }}
            </div>
            <button btn @click="toMessage(currentOpenContact)">
              发送消息
            </button>
          </div>
        </div>
      </div>
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
