
      
<template>
  <div class=" max-w-sm">

    <Popover v-slot="{ open }" class="relative">
      <PopoverButton :class="open ? '' : 'text-opacity-90'"
        class="group inline-flex items-center rounded-md py-2 text-base font-medium outline-none ">
        <font-awesome-icon class="w-5 pr-2 cursor-pointer  hover:text-gray-900" icon="map" />
      </PopoverButton>
      <PopoverPanel v-slot="{ close }"
        class="absolute z-10  left-0 -top-[25rem]  w-[50rem]  h-[25rem] bg-white overflow-hidden rounded shadow-lg">
        <Map @clickMap="(e: any) => { sendMap(e), close() }"></Map>
      </PopoverPanel>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { defineComponent, ref } from 'vue';
import Map from '../../components/Map.vue'
import { chat_map_type } from '../../const';
import { appStore } from '../../store/appStore';

const store = appStore();

const dipslayMap = ref(true);

const props = defineProps({
  "sn": {
    type: Number,
  }
})
// const emits = defineEmits([""])
const sendMap = (e: any) => {
  console.log("发送位置消息")
  var payload = {
    sender_id: store.userInfo.user.user_id,
    session_id: store.curSession.session_id,
    content: "[位置]",
    payload: e,
    type: chat_map_type,
    sn: props.sn + 1,
    created_at: Date.now()
  };
  store.send("/session/" + store.curSession!.session_id + "/chat", payload);
  dipslayMap.value = false;
}


</script>

<script lang="ts">
export default defineComponent({
  name: 'MapInput',
})
</script>