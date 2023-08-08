<script setup lang="ts">
import type { Contact } from '..'
import { NcAvatar, NcBadge } from '..'
import type { Menu, MenuKey } from './types'

const emits = defineEmits<{
  (e: 'menuClick', menuKey: string, menu: Menu): void
}>()

defineOptions({
  name: 'NcMenu',
})

const menus = inject<Ref<Menu[]>>('menus')!
const activeMenuKey = inject<Ref<MenuKey>>('active-menu-key')
const lastMessages = inject<ComputedRef<Contact[]>>('last-messages')

activeMenuKey!.value = menus.value.filter(item => item.active)[0].key

function onClickMenu(menu: Menu) {
  menus.value.forEach((item) => {
    item.active = false
  })
  menu.active = true
  activeMenuKey!.value = menu.key
  emits('menuClick', menu.key, menu)
}

function getMenuClass(menu: Menu) {
  if (menu.active)
    return `${menu.activeIcon} text-green/80`
  return `${menu.icon} text-gray/50`
}

const count = computed(() => {
  let count = 0
  if (lastMessages) {
    lastMessages.value.forEach((item) => {
      count += item.unread ? item.unread : 0
    })
  }
  return count
})
</script>

<template>
  <div
    h-full min-w-60px
    border-r
    bg="gray-900/10"
    py-10px
    flex="~ col items-center"
  >
    <div mt-20px>
      <NcAvatar url="https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132" />
    </div>
    <div
      mt-20px
      w-full py-10px text-20px
      flex="~ col gap6 items-center"
    >
      <div
        v-for="menu in menus"
        :key="menu.key"
        cursor-pointer
        @click="onClickMenu(menu)"
      >
        <NcBadge v-if="menu.key === 'message'" :count="count">
          <div :class="getMenuClass(menu)" />
        </NcBadge>
        <div v-else :class="getMenuClass(menu)" />
      </div>
    </div>
  </div>
</template>
