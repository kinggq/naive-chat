<script setup lang="ts">
defineOptions({
  name: 'NcMenu',
})
</script>

<template>
  <div
    h-full w-60px
    border-r
    bg="gray-500/10"
    py-10px
    flex="~ col items-center"
  >
    <div mt-20px>
      <img
        h-30px w-30px
        rounded-1

        src="https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132"
      >
    </div>
    <div
      mt-20px
      w-full py-10px text-20px
      flex="~ col gap6 items-center"
    >
      <div i-ri:chat-3-line />
      <div i-ri:contacts-line />
      <div i-ri:more-line />
    </div>
  </div>
</template>
