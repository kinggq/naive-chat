<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    url?: string
    size?: number
    rounded?: number
  }>(),
  {
    size: 34,
    rounded: 4,
  },
)

function getImageClass() {
  return `
      w-${props.size}px
      h-${props.size}px
      rounded-${props.rounded}px`
}
</script>

<template>
  <div>
    <img
      :class="getImageClass()"
      :src="url" alt=""
    >
  </div>
</template>
