<script setup lang="ts">
import { dateFormat } from '../_utils'
import type { Contact } from './types'

const emits = defineEmits<{
  (e: 'changeContact', contact: Contact): void
}>()

defineOptions({
  name: 'NcContact',
})

const contacts = inject<Contact[]>('contacts')
// const activeContact = ref<Contact | undefined>(undefined)
const activeContact = inject<Ref<Contact>>('current-contact')
function onClickContact(contact: Contact) {
  // console.log(contact)
  activeContact!.value = contact
  emits('changeContact', contact)
}

function getContactClass(contact: Contact) {
  return contact === activeContact?.value ? 'bg-gray-500/10' : 'gray-500/4 hover:gray-500/10'
}
</script>

<template>
  <div>
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
    <div overflow-auto>
      <div
        v-for="contact in contacts" :key="contact.id"
        cursor-pointer
        p-10px
        :class="getContactClass(contact)"
        @click="onClickContact(contact)"
      >
        <div
          flex="~ items-center"
        >
          <img

            h-34px w-34px rounded-4px
            src="https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132" alt=""
          >
          <div flex-1 truncate pl-10px text-left>
            <div text-14px font-400>
              {{ contact.nickname }}
            </div>
            <div
              w-full
              truncate
              text="gray-500/80 12px"
            >
              {{ contact.lastMessage }}
            </div>
          </div>
          <div
            w-30px
            flex="~ col items-center"
            text="12px gray-500/50"
          >
            <div>{{ dateFormat(contact.lastTime) }}</div>
            <div i-ri:notification-off-line />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
