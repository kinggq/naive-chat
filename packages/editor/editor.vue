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
  content.value = ''
}

function handleEnter(event: KeyboardEvent) {
  if (event.ctrlKey)
    insertNewLine()
  else
    send()
}

function updateContent() {
  if (editableRef.value)
    content.value = editableRef.value.innerText
}

function insertNewLine() {
  const selection = window.getSelection()
  if (!selection)
    return

  const range = selection.getRangeAt(0)
  const br = document.createElement('br')
  const textNode = document.createTextNode('\u00A0') // 创建一个空的文本节点
  range.deleteContents()
  range.insertNode(br)
  range.collapse(false) // 将光标移动到插入的元素后面
  range.insertNode(textNode)
  range.selectNodeContents(textNode)

  // Move the caret after the line break
  range.collapse(false) // 将光标移动到插入的元素后面
  selection.removeAllRanges()
  selection.addRange(range)
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
      @keydown.enter.prevent="handleEnter"
      @input="updateContent"
    />
    <div px-20px py-10px text-right>
      <button btn :disabled="!content.trim()" @click="send">
        <slot>
          发送
        </slot>
      </button>
    </div>
  </div>
</template>
