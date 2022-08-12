<template>
  <div class="h-full flex flex-col">
    <div class="  flex-shrink-0 h-10 border-b flex  items-center  px-2 text-gray-500">
      <font-awesome-icon class="w-5 pr-2 cursor-pointer hover:text-gray-900" icon="fa-brands fa-markdown" />
      <ImageInput :sn="sn"></ImageInput>
    </div>
    <div class="p-2  flex-grow">
      <textarea class="w-full h-full  outline-none" v-model="draft" placeholder="输入你要发送的内容 control+enter 键发送"
        @keyup.enter="send()"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { appStore } from "../../store/appStore";
import ImageInput from "./ImageInput.vue";
export default {
  name: "ChatInput",
  data() {
    return {
      draft: "",
      sn: 0,
      type: 0
    };
  },
  methods: {
    send() {
      var payload = {
        sender_id: this.store.userInfo.user.user_id,
        session_id: this.store.curSession.session_id,
        content: this.draft,
        payload: "",
        type: this.type,
        sn: this.sn++,
        created_at: Date.now()
      };
      this.store.send("/session/" + this.store.curSession.session_id + "/chat", payload);
      this.draft = "";
    },
  },
  setup() {
    const store = appStore();
    return { store };
  },
  components: { ImageInput }
};
</script>
