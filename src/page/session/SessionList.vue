<template>
  <div class="sm:w-60 md:w-80 flex flex-col bg-gray-100 border-r flex-shrink-0">
    <div
      class=" flex-shrink-0 px-2 h-12 text-base  bg-gray-50 border-b text-gray-500 flex  justify-between items-center">

      <div class="flex justify-center items-center">
        <font-awesome-icon class="w-5  px-2 text-gray-500 cursor-pointer hover:text-gray-800" icon="message" />
        <div>会话</div>
        <div>({{ store.sessionList.length }})</div>
      </div>

      <div class="flex justify-center">
        <!-- <font-awesome-icon @click="
          () => {
            $router.push({ path: '/search' });
          }
        " class="w-3 h-3 m-1 p-2 rounded-full border hover:border-blue-500 hover:text-blue-500 cursor-pointer text-gray-500"
          icon="add" /> -->
        <font-awesome-icon @click="() => displaySearch = !displaySearch"
          class="w-3 h-3 m-1 p-2 rounded-full border hover:border-blue-500 hover:text-blue-500 cursor-pointer text-gray-500"
          icon="search" />
      </div>
    </div>
    <SessionSearch v-if="displaySearch" :keywords="keywords"  class="flex-shrink-0 "></SessionSearch>

    <div class="flex-grow overflow-x-auto">
      <div v-for="i in store.sessionList" :key="i" class="flex hover:bg-gray-200" :class="{
        'bg-gray-300': active == i.session_id,
      }" @click="
  () => {
    store.setChat(i);
    $router.push({ path: '/session/' + i.session_id + '/chat' });
  }
">
        <SessionItem :data="i"></SessionItem>
      </div>
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
      displaySearch: false,
      list: [],
    };
  },
  mounted() { },
  components: { SessionItem, SessionSearch },
};
</script>
