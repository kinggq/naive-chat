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

const finish = ref(true)
function onLoad() {
  finish.value = false
}
</script>

<template>
  <div class="nc-avatar">
    <div
      v-if="finish || !url"
      h-full
      w-full
      flex
      items-center
      justify-center
      bg="gray/10"
      text="gray-500/50"
      :style="getImageStyle()"
    >
      <div i-carbon:user-filled />
    </div>
    <img
      v-show="!finish && url"
      class="nc-avatar"
      :src="url" alt=""
      :style="getImageStyle()"
      @load="onLoad"
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
