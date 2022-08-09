<template>
  <div class="h-full flex flex-col">
    <div class="h-10 border-b"></div>
    <div class="p-2 w-full h-full">
      <textarea
        class="w-full h-full border-white"
        v-model="data.draft"
        placeholder="输入你要发送的内容 control+enter 键发送"
        @keyup.enter="store.send()"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { appStore } from "../../store/appStore";
export default {
  name: "ChatInput",
  props: {
    data: Object,
  },
  data() {
    console.log(this);
    return {
      draft: "",
    };
  },
  setup() {
    const store = appStore();
    return { store };
  },
};
</script>
