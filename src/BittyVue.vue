<template>
  <div class="w-full h-full relative">
    <router-view></router-view>

    <div id="dialog" class=" ">

    </div>
    <div v-if="store.sysInfo.alert.length > 0"
      class="absolute w-full h-full top-0 flex  flex-col  items-center pointer-events-none">
      <div class="msg text-sm px-4 py-1 border my-1 rounded shadow transition-all  hover:shadow-md  cursor-pointer"
        :class="{
          ' bg-green-500  text-white border-green-500': m.type == 'success',
          ' bg-yellow-500 text-white border-yellow-500': m.type == 'warning',
          ' bg-red-500 text-white border-red-500': m.type == 'error',
          ' bg-blue-500 text-white border-blue-500': m.type == 'info'
        }" v-for="m in store.sysInfo.alert" :key="m">
        {{ m.msg }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { appStore } from "./store/appStore";

export default {
  name: "BittyVue",
  methods: {},
  setup() {
    const store = appStore();
    return { store };
  },
  mounted() {
    this.store.fetchSysInfo();
    if (this.store.userInfo) {
      this.store.fetchSessionList();
      this.store.fetchUserSessionList();
      this.store.fetchContactList();
      this.store.fetchGroupList();
      this.store.mqttInit();
    }

    navigator.connection.addEventListener("change", () => {
      if (navigator.connection.rtt == 0) {
        this.warning("网络链接已经断开");
      }
    })
  },
};
</script>
