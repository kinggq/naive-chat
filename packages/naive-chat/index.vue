<script setup lang="ts">
defineOptions({
  name: 'NaiveChat',
})
</script>

<template>
  <div
    h-650px w-800px
    border rounded-4px
    flex="~"
  >
    <nc-menu />
    <nc-contact />
    <nc-message />
  </div>
</template>
