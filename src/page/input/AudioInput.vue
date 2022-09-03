
      
<template>
  <div class=" max-w-sm">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton :class="open ? '' : 'text-opacity-90'"
        class="group inline-flex items-center rounded-md py-2 text-base font-medium outline-none ">
        <font-awesome-icon class="w-5 pr-2 cursor-pointer  hover:text-gray-900" icon="microphone" />
      </PopoverButton>
      <PopoverPanel v-slot="{ close }"
        class="flex items-center border absolute z-10  left-0 -top-12 p-2    h-12 bg-white overflow-hidden rounded shadow-lg">
        <font-awesome-icon class="w-5 pr-2 cursor-pointer  hover:text-gray-900" :icon="
        started ? 'stop' : 'play'" @click="toggleRecord()" />
        <audio controls ref="player"></audio>
        <div @click="uploadFile" style="word-break: keep-all"
          class="border   bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-2 py-1    break-normal text-xs  rounded">

          发送</div>
        <div @click="close()" style="word-break: keep-all"
          class="border bg-red-500 hover:bg-red -600 cursor-pointer text-white px-2 py-1  break-normal text-xs  rounded ">
          删除</div>

      </PopoverPanel>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { appStore } from '../../store/appStore';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

import { RecordRTCPromisesHandler } from "recordrtc"
import api from '../../api/api';
import { send } from 'process';
import { chat_file_type } from '../../const';
const props = defineProps({
  "sn": {
    type: Number,
  }
})

const started = ref(false);
let stream = null;
let recorder: RecordRTCPromisesHandler = null;
const player = ref(null);
let blob = null;
const store = appStore();
const toggleRecord = async () => {
  if (started.value) {
    await recorder.stopRecording();
    blob = await recorder.getBlob();
    console.log(blob)
    console.log(player);
    player._rawValue.src = URL.createObjectURL(blob);
    started.value = false;
    stream = null;
  } else {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    recorder = new RecordRTCPromisesHandler(stream, {
      type: 'audio'
    });
    recorder.startRecording();
    started.value = true;
  }
}

const uploadFile = async () => {
  if (blob == null) {
    return;
  }
  const res = await api.upload("asset/uploadFile", {
    file: blob
  });
  if (res.code == 0) {
    var payload = {
      sender_id: store.userInfo.user.user_id,
      session_id: store.curSession.session_id,
      content: "[音频]",
      payload: {
        type: 'audio',
        url: res.data
      },
      type: chat_file_type,
      sn: props.sn + 1,
      created_at: Date.now()
    };
    store.send("/session/" + store.curSession.session_id + "/chat", payload);
  }

}
const sendMsg = () => {

}


</script>

<script lang="ts">
export default defineComponent({
  name: 'AudioInput',
})
</script>