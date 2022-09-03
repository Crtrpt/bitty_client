<template>
  <font-awesome-icon class="w-5 pr-2 cursor-pointer  hover:text-gray-900" icon="video" @click="sendVideoInvite" />
</template>

<script lang="ts">
import api from "../../api/api";
import { chat_video_type } from "../../const";
import { appStore } from '../../store/appStore';

export default {
  name: "VideoInput",
  setup() {
    const store = appStore();
    return { store };
  },
  props: {
    sn: Number
  },
  methods: {
    async sendVideoInvite() {
      var payload = {
        sender_id: this.store.userInfo.user.user_id,
        session_id: this.store.curSession.session_id,
        content: "[视频]",
        payload: {
          stream: "xxx",
        },
        type: chat_video_type,
        sn: this.sn + 1,
        created_at: Date.now()
      };
      this.store.send("/session/" + this.store.curSession.session_id + "/chat", payload);
    }
  }
}
</script>