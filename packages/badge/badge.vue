<script setup lang="ts">
const props = withDefaults(defineProps<{
  count?: number
  isDot?: boolean
}>(), {
})

const showCount = computed(() => {
  if (props.count && !props.isDot)
    return true
  return false
})

const badgeClass = computed(() => {
  if (showCount.value)
    return 'rounded-10px color-white px-5px top--5px right--4px h-18px'
  return 'w-8px h-8px rounded top--2px right--4px'
})
</script>

<template>
  <div relative>
    <slot />
    <div
      v-if="count"
      absolute text-12px
      bg="red"
      :class="badgeClass"
    >
      {{ showCount ? count : '' }}
    </div>
  </div>
</template>
