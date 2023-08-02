<script setup lang="ts">
const emits = defineEmits<{
  (e: 'send', content: string): void
}>()

const tools = [
  {
    name: '',
    icon: 'i-ri:emotion-line',
  },
  {
    name: '',
    icon: 'i-ri:folder-2-line',
  },
  {
    name: '',
    icon: 'i-mdi:comment-processing-outline',
  },
]

const editableRef = ref()
const content = ref('')
function send() {
  if (editableRef.value)
    content.value = editableRef.value.innerHTML
  emits('send', content.value)
  editableRef.value.innerHTML = ''
}
</script>

<template>
  <div flex="~ col" h-full>
    <div
      min-h-40px
      flex items-center
      px-20px
    >
      <div

        flex="~ gap5" items-center
        text="18px gray-500/60 "
      >
        <div
          v-for="i in tools"
          :key="i.icon"
          text="hover:green/80"
          cursor-pointer
          :class="`${i.icon} text-hover:green/80` "
        />
      </div>
      <div />
    </div>
    <div
      ref="editableRef"
      h-60px
      flex-1
      overflow-auto
      p-5px
      text-left
      outline-none
      contenteditable="true"
    />
    <div px-20px py-10px text-right>
      <button btn @click="send">
        <slot>
          发送
        </slot>
      </button>
    </div>
  </div>
</template>
