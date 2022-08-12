<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <div class="px-2 py-2 h-12 flex items-center border-b flex-shrink-0">
      <router-link :to="{
        path: './profile',
      }">{{ this.store.curSession?.name || "加载中..." }}
      </router-link>
    </div>

    <ChatList ref="chatlist" class="flex-grow p-2 overflow-scroll" :data="this.store.curSession?.chat || {}"></ChatList>


    <ChatInput class="h-1/3 border-t flex-shrink-0" />

  </div>
</template>

<script lang="ts">
import ChatList from "./ChatList.vue";
import ChatInput from "./ChatInput.vue";
import { appStore } from "../../store/appStore";
import api from "../../api/api";
import { nextTick } from '@vue/runtime-core';

export default {
  name: "Chat",
  setup() {
    const store = appStore();
    return { store };
  },
  data() {
    return {
      session_id: this.$route.params.id,
      session: {},
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
  methods: {
    getSessionInfo() {
      var _this = this;
      this.store.setSessionById(this.$route.params.id);
      api
        .get("session/info", {
          session_id: this.$route.params.id,
          user_id: this.store.userInfo.user.user_id,
        })
        .then((res) => {
          _this.session = res.data;
        });
    },
  },
  mounted() {
    this.getSessionInfo();
  },
  components: { ChatList, ChatInput },
};
</script>
