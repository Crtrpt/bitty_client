<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <div class="px-2 py-2 h-12 flex items-center border-b flex-shrink-0">
      <router-link
        :to="{
          path: './profile',
        }"
        >{{ store.curChat?.name || "null" }}
      </router-link>
    </div>

    <div class="flex-grow p-2 overflow-scroll">
      <ChatView :data="store.curChat?.chat?.list || []"></ChatView>
    </div>
    <div class="h-1/3 border-t flex-shrink-0">
      <ChatInput :data="store.curChat?.chat || {}" />
    </div>
  </div>
</template>

<script lang="ts">
import ChatView from "./ChatView.vue";
import ChatInput from "./ChatInput.vue";
import { appStore } from "../../store/appStore";

export default {
  name: "Chat",
  props: {
    data: Object,
  },
  setup() {
    const store = appStore();
    return { store };
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "苏轼",
          msg: "十年生死两茫茫，不思量，自难忘。",
          time: "刚刚",
        },
        {
          id: 2,
          name: "杜甫",
          msg: "国破山河在，城春草木深。",
          time: "刚刚",
        },
        {
          id: 3,
          name: "李白",
          msg: "君不见黄河之水天上来，奔流到海不复回。",
          time: "刚刚",
        },
        {
          id: 4,
          name: "白居易",
          msg: "汉皇重色思倾国，御宇多年求不得。",
          time: "刚刚",
        },
        {
          id: 5,
          name: "王维",
          msg: "空山新雨后，天气晚来秋。",
          time: "刚刚",
        },
        {
          id: 6,
          name: "王维",
          msg: "空山新雨后，天气晚来秋。",
          time: "刚刚",
        },
        {
          id: 7,
          name: "王维",
          msg: "空山新雨后，天气晚来秋。",
          time: "刚刚",
        },
        {
          id: 8,
          name: "王维",
          msg: "空山新雨后，天气晚来秋。",
          time: "刚刚",
        },
      ],
    };
  },
  components: { ChatView, ChatInput },
};
</script>
