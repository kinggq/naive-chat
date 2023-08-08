<script setup lang="ts">
const dark = ref(false)

watchEffect(() => {
  const el = document.querySelector('html')
  el?.classList.toggle('dark', dark.value)
})
</script>

<template>
  <div
    h-70px
    bg="gray/10"
    items-center
    flex="~"
    justify-between
    px-20px
  >
    <div flex="~ gap3" items-center>
      <h3>Naive Chat</h3>
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
