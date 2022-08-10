<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <div class="px-2 py-2 h-12 flex items-center border-b flex-shrink-0">
      <router-link
        :to="{
          path: './profile',
        }"
        >{{ data?.user?.session_name || "加载中..." }}
      </router-link>
    </div>

    <div class="flex-grow p-2 overflow-scroll">
      <ChatView :data="data.chat || []"></ChatView>
    </div>
    <div class="h-1/3 border-t flex-shrink-0">
      <ChatInput :data="data" />
    </div>
  </div>
</template>

<script lang="ts">
import ChatView from "./ChatView.vue";
import ChatInput from "./ChatInput.vue";
import { appStore } from "../../store/appStore";
import api from "../../api/api";

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
      data: {},
    };
  },
  methods: {
    getSessionInfo() {
      var _this = this;
      api
        .get("session/info", {
          session_id: this.$route.params.id,
          user_id: this.store.userInfo.user.user_id,
        })
        .then((res) => {
          _this.data = res.data;
        });
    },
  },
  mounted() {
    this.getSessionInfo();
  },
  components: { ChatView, ChatInput },
};
</script>
