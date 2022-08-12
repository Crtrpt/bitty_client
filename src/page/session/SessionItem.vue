<template>
  <div class="cell p-2 flex flex-grow cursor-pointer items-center justify-center">

    <div class=" rounded-full relative w-8 h-8 flex-grow-0 flex-shrink-0" :style="{
      backgroundImage: 'url(' + data.avatar + ')',
      backgroundSize: 'cover',
    }" @click="() => {
  $router.push({ path: '/user/profile' });
}">




      <div class=" text-center  absolute -top-3 -right-6" v-if="data.unread > 0">
        <div class=" scale-50    text-center   border-2 border-white  p-1   bg-red-500
          rounded-full  px-3 text-white">
          {{ data.unread ||
              ""
          }}
        </div>
      </div>
    </div>
    <div class="mx-2 flex-grow overflow-hidden flex-shrink pl-2">
      <div class="text-base">{{ data.name }}</div>
      <div class="text-xs text-gray-400 whitespace-nowrap w-0">
        {{ data.lastmsg || "暂无" }}
      </div>
    </div>

    <div class=" flex flex-col justify-between  h-full">

      <div class="flex flex-row-reverse">
        <div class=" text-xs text-gray-500">{{ prttyDate(data.lastmsg_at) || "暂无" }}</div>
      </div>
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
