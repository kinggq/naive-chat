<script setup lang="ts">
import packageJson from '../../package.json'

const dark = ref(false)

watchEffect(() => {
  const el = document.querySelector('html')
  el?.classList.toggle('dark', dark.value)
})
</script>

<template>
  <div

    bg="gray-100 dark:gray-900"

    flex="~"

    fixed left-0 top-0 z-1000 h-70px w-full items-center justify-between px-20px
  >
    <div flex="~ gap3" items-center>
      <h3 text="26px green-600/80" font-500>
        Naive Chat
      </h3>
      <div text="12px" bg="orange-600/80" rounded-10px px-10px py-2px>
        Beta v{{ packageJson.version }}
      </div>
    </div>
    <div flex="~ gap5">
      <div cursor-pointer @click="dark = !dark">
        <div v-if="!dark" i-ri:sun-line />
        <div v-else i-ri:moon-line />
      </div>
      <a href="https://github.com/kinggq/naive-chat" target="_blank">
        <div i-ri:github-fill />
      </a>
    </div>
  </div>
</template>
