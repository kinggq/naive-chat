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

const avatarRounded = inject<ComputedRef<number>>('avatar-rounded')
function getImageStyle() {
  return `border-radius: ${avatarRounded?.value}px;`
}
</script>

<template>
  <div>
    <img
      class="nc-avatar"
      :src="url" alt=""
      :style="getImageStyle()"
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
