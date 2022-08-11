<template>
  <div class="cell p-2 flex flex-grow cursor-pointer items-center justify-center">

    <img @click="() => {
      $router.push({ path: '/user/profile' });
    }" class=" rounded-full w-8 h-8 flex-grow-0 flex-shrink-0" :src="data.avatar" />

    <div class="mx-2 flex-grow overflow-hidden flex-shrink">
      <div class="text-base">{{ data.name }}</div>
      <div class="text-xs text-gray-400 whitespace-nowrap w-0">
        {{ data.lastmsg || "暂无" }}
      </div>
    </div>
    <div class=" flex flex-col justify-between  h-full">
      <div class=" text-xs text-center bg-red-500 rounded-full text-white">{{ data.msg_number || "99" }}</div>
      <div class=" text-xs text-gray-500">{{ data.lastmsg_at || "刚刚" }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { appStore } from "../../store/appStore";
export default {
  name: "SessionItem",
  props: {
    data: Object,
  },

  setup() {
    const store = appStore();
    return { store };
  },
};
</script>
