<template>
  <div class="h-full flex flex-col">
    <div class="h-10 border-b"></div>
    <div class="p-2 w-full h-full">
      <textarea class="w-full h-full  outline-none" v-model="draft" placeholder="输入你要发送的内容 control+enter 键发送"
        @keyup.enter="send()"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from "../../store/appStore";
export default {
  name: "ChatInput",
  props: {
    data: Object,
  },
  data() {
    return {
      draft: "",
      sn: 0,
    };
  },
  methods: {
    send() {
      var payload = {
        user_id: this.data.user.user_id,
        session_id: this.data.session.session_id,
        content: this.draft,
        payload: "",
        type: 0,
        sn: this.sn++,
      };

      api.post("chat/sendMsg", payload).then((res) => {
        console.log("发送消息回调");
      });
    },
  },
  setup() {
    const store = appStore();
    return { store };
  },
};
</script>
