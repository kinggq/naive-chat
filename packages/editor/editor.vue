<script setup lang="ts">
const emits = defineEmits<{
  (e: 'send', content: string): void
  (e: 'upload', file: File): void
}>()

const tools = [
  {
    name: 'emoji',
    icon: 'i-ri:emotion-line',
  },
  {
    name: 'file',
    icon: 'i-ri:folder-2-line',
  },
  {
    name: 'other',
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

function focusInput() {
  if (editableRef.value)
    editableRef.value.focus()
}

const fileInputRef = ref<HTMLInputElement>()

async function toolClick(toolType: string) {
  if (toolType === 'file') {
    await nextTick()
    fileInputRef.value?.click()
  }
}

function changeInputFile(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files) {
    Array.from(files)
      .forEach((item) => {
        emits('upload', item)
      })
  }
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

defineExpose({
  focusInput,
})
</script>

<template>
  <div flex="~ col" h-full>
    <input
      ref="fileInputRef"
      multiple="true"
      display-none
      type="file"
      @change="changeInputFile"
    >
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
          @click="toolClick(i.name)"
        />
      </div>
      <div />
    </div>
    <div
      ref="editableRef"
      h-60px
      flex-1
      overflow-auto
      px-20px py-5px
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
