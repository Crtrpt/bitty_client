<template>
  <div class="w-80 bg-gray-100 border-r">
    <SessionSearch :kewords="kewords" class="h-12"></SessionSearch>

    <div
      v-for="i in store.sessionList"
      :key="i"
      class="flex hover:bg-gray-200"
      :class="{
        'bg-gray-300': active == i.session_id,
      }"
      @click="
        () => {
          store.setChat(i);
          $router.push({ path: '/session/' + i.session_id + '/chat' });
        }
      "
    >
      <SessionItem :data="i"></SessionItem>
    </div>
  </div>
</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from "../../store/appStore";
import SessionItem from "./SessionItem.vue";
import SessionSearch from "./SessionSearch.vue";

export default {
  name: "SessionList",
  props: {
    active: {
      type: String,
      default: "",
    },
  },
  setup() {
    const store = appStore();
    return { store };
  },
  data() {
    return {
      kewords: "",
      list: [],
    };
  },
  mounted() {
    console.log("加载");
    var _this = this;
    api
      .get("session/list", { user_id: this.store.userInfo.user.user_id })
      .then((res) => {
        if (res.code == 0) {
          _this.store.setSessionList(res.data);
        }
      });
  },
  components: { SessionItem, SessionSearch },
};
</script>
