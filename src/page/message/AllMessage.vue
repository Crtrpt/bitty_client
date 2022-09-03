<template>
  <div class="container mx-auto flex flex-col">
    <div class="text-3xl mt-10 px-4 mb-5">全部消息</div>
    <div class="  flex-grow overflow-auto">
      <div class="px-4">
        <message-item :m="m" v-for="m in list" :key="m" @update="allMessage"></message-item>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from "../../store/appStore";
import MessageItem from "./MessageItem.vue";

export default {
  name: "AllMessage",
  methods: {
    allMessage() {
      var _this = this;
      api
        .get("msg/allMessage", {
          user_id: this.store.userInfo.user.user_id,
        })
        .then((res) => {
          _this.list = res.data;
        });
    },
  },
  mounted() {
    this.allMessage();
  },
  setup() {
    const store = appStore();
    return {
      store,
    };
  },
  data() {
    return {
      list: [],
    };
  },
  components: { MessageItem },
};
</script>
