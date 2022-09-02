<template>
  <div class="flex">
    <div class="flex flex-col h-screen bg-gray-50   flex-grow border-r">
      <div class="px-2 py-2 h-12 flex items-center border-b flex-shrink-0">


        <router-link class="flex-grow" :to="{
          path: './profile',
        }">

          <font-awesome-icon class="w-5  px-2 text-gray-500 cursor-pointer hover:text-gray-800" icon="comments" />
          {{ this.store.curSession?.name || "加载中..." }}
        </router-link>


        <router-link :to="{
          path: './profile',
        }">
          <font-awesome-icon class="w-5  px-2 text-gray-500 cursor-pointer hover:text-gray-800"
            icon="fa-solid fa-ellipsis-vertical" />
        </router-link>


      </div>

      <ChatList ref="chatlist" class="flex-grow p-2 overflow-scroll" :data="this.store.curSession?.chat || {}">
      </ChatList>

      <ChatInput class="h-1/3 border-t flex-shrink-0" />
    </div>
    <!-- <Right class="w-1/3"></Right> -->
  </div>
</template>

<script lang="ts">
import ChatList from "./ChatList.vue";
import ChatInput from "./ChatInput.vue";
import { appStore } from "../../store/appStore";
import { nextTick } from '@vue/runtime-core';
import Right from "./Right.vue";

export default {
  name: "Chat",
  setup() {
    const store = appStore();
    return { store };
  },
  props: {
    session: Object,
    config: Object,
  },
  data() {
    return {

    };
  },
  watch: {
    "store.curSession.chat.list": {
      deep: true,
      handler(n, o) {
        nextTick(() => {
          var el = (this.$refs.chatlist.$el as HTMLElement);
          el.scrollTop = el.scrollHeight
        })
      }
    }
  },

  components: { ChatList, ChatInput, Right },
};
</script>
