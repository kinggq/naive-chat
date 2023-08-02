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
const size = `${props.size}px`
function getImageClass() {
  return `nc-avatar rounded-${props.rounded}px`
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

<style setup>
.nc-avatar {
  min-width: v-bind(size);
  min-height: v-bind(size);
  width: v-bind(size);
  height: v-bind(size);
}
</style>
