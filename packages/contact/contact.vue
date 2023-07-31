<script setup lang="ts">
defineOptions({
  name: 'NcContact',
})
</script>

<template>
  <div
    h-full w-220px
    border-r
    flex="~ col"
  >
    <div py-10px bg="gray/2">
      <input
        rounded-2px
        px-10px py-2px text-14px
        bg="gray/10"
        type="text"
        placeholder="搜索"
      >
    </div>
    <div overflow-auto>
      <div
        v-for="contact in 10" :key="contact"
        bg="gray-500/4" p-10px
      >
        <div
          flex="~ items-center"
        >
          <img

            h-34px w-34px rounded-4px
            src="https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132" alt=""
          >
          <div flex-1 truncate pl-10px text-left>
            <div text-14px font-400>
              好友{{ contact }}
            </div>
            <div
              w-full
              truncate
              text="gray-500/80 12px"
            >
              {{ contact % 2 === 0 ? '[语音]' : '下个月六号晚上七点半开会' }}
            </div>
          </div>
          <div
            w-30px
            flex="~ col items-center"
            text="12px gray-500/50"
          >
            <div>13:10</div>
            <div i-ri:notification-off-line />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
