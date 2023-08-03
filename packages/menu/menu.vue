<script setup lang="ts">
import { NcAvatar } from '..'
import type { Menu, MenuKey } from './types'

defineOptions({
  name: 'NcMenu',
})

const menus = ref<Menu[]>([
  {
    key: 'message',
    icon: 'i-ri:chat-3-line',
    activeIcon: 'i-ri:chat-3-fill',
    active: true,
  },
  {
    key: 'contact',
    icon: 'i-ri:contacts-line',
    activeIcon: 'i-ri:contacts-fill',
    active: false,
  },
  {
    key: 'more',
    icon: 'i-ri:more-line',
    activeIcon: 'i-ri:more-fill',
    active: false,
  },
])
const activeMenuKey = inject<Ref<MenuKey>>('active-menu-key')

activeMenuKey!.value = menus.value.filter(item => item.active)[0].key

function onClickMenu(menu: Menu) {
  menus.value.forEach((item) => {
    item.active = false
  })
  menu.active = true
  activeMenuKey!.value = menu.key
}

function getMenuClass(menu: Menu) {
  if (menu.active)
    return `${menu.activeIcon} text-green/80`
  return `${menu.icon} text-gray/50`
}
</script>

<template>
  <div
    h-full min-w-60px
    border-r
    bg="gray-500/10"
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
        cursor-pointer :class="getMenuClass(menu)"
        @click="onClickMenu(menu)"
      />
    </div>
  </div>
</template>
