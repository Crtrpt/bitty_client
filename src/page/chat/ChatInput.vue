<template>
  <div class="h-full flex flex-col">
    <div class="  flex-shrink-0 h-10 border-b flex  items-center  px-2 text-gray-500">
      <font-awesome-icon class="w-5  pr-2 cursor-pointer  hover:text-gray-900" icon="fa-solid fa-font" />
      <ImageInput :sn="sn"></ImageInput>
      <FileInput :sn="sn"></FileInput>
      <MapInput :sn="sn"></MapInput>
      <AudioInput :sn="sn"></AudioInput>
      <VideoInput :sn="sn"></VideoInput>
    </div>
    <div class="p-2  flex-grow">
      <textarea class=" border-none  w-full h-full  " v-model="draft" placeholder="输入你要发送的内容 control+enter 键发送"
        @keyup.enter="send"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { appStore } from "../../store/appStore";
import ImageInput from "../input/ImageInput.vue";
import FileInput from "../input/FileInput.vue";
import MapInput from "../input/MapInput.vue";
import AudioInput from "../input/AudioInput.vue";
import VideoInput from "../input/VideoInput.vue";
import { chat_text_type } from "../../const";

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
    send(e: Event) {
      if (!e.ctrlKey) {
        return
      }
      var payload = {
        sender_id: this.store.userInfo.user.user_id,
        session_id: this.store.curSession.session_id,
        content: this.draft,
        payload: "",
        type: chat_text_type,
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
  components: { ImageInput, FileInput, MapInput, AudioInput, VideoInput }
};
</script>
