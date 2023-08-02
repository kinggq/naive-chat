<script setup lang="ts">
import { provide, ref } from 'vue'
import type { Contact, PullMessageNext } from '../'
import { NcContact, NcMenu, NcMessage } from '../'
import type { MessageStatus, MessageStore, PullMessageOption, UserInfo } from './types'

const props = defineProps<{
  userInfo: UserInfo
  contacts: Contact[]
}>()

const emits = defineEmits<{
  (e: 'changeContact', contact: Contact): void
  (e: 'pullMessage', { next, contactId }: PullMessageOption): void
}>()

defineOptions({
  name: 'NaiveChat',
})

const activeMenuKey = ref<string>('')
const currentContact = ref<Contact>()

const messageStore = reactive<MessageStore>({} as MessageStore)
const currentMessage = ref<MessageStatus>({} as MessageStatus)

provide('message-store', messageStore)
provide('current-message', currentMessage)
provide('current-contact', currentContact)
provide('active-menu-key', activeMenuKey)
provide('user-info', computed(() => props.userInfo))
provide('contacts', props.contacts)

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

    <NcMessage
      ref="nativeMessageRef"
      @pull-message="next => emitPullMessage(next)"
    />
  </div>
</template>
