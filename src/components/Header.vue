<template>
  <div
    class="flex flex-col flex-shrink-0 text-gray-500 justify-center items-center w-16 bg-gradient-to-r border-r bg-gray-50">
    <div class="h-24 ">
      <div
        class=" relative shadow  flex-shrink-0 rounded-full bg-white p-2 m-2 w-12 h-12 cursor-pointer hover:shadow-xl border-4 border-white"
        :class="{
          'shadow-md': active == 'account',
        }" :style="{
  backgroundImage: 'url(' + store.userInfo.user.avatar + ')',
  backgroundSize: 'cover',
}" @click="
  () => {
    $router.push({ path: '/account/profile' });
  }
">


        <div class="rounded-full flex justify-center items-center" v-if="!store.userInfo.user.avatar">
          <div class="text-2xl text-gray-700">
            {{ store.userInfo.user.nick_name[0] }}
          </div>
        </div>
      </div>
    </div>
    <a class="h-10 flex-shrink-0 relative" @click="
      () => {
        $router.push({ path: '/session' });
      }
    ">
      <!-- <span class="flex h-2 w-2 absolute -right-1">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span> -->
      <font-awesome-icon class="w-5 cursor-pointer hover:text-gray-800" icon="message" :class="{
        'text-blue-500': active == 'session',
      }" />
    </a>
    <a class="h-10 flex-shrink-0" @click="
      () => {
        $router.push({ path: '/contact' });
      }
    ">

      <font-awesome-icon class="w-5 cursor-pointer" icon="user" :class="{
        'text-blue-500': active == 'contact',
      }" />
    </a>
    <a class="h-10 flex-shrink-0" @click="
      () => {
        $router.push({ path: '/group' });
      }
    ">

      <font-awesome-icon class="w-5 cursor-pointer" icon="fa-solid fa-user-group" :class="{
        'text-blue-500': active == 'group',
      }" />
    </a>
    <div class="flex flex-col-reverse flex-grow items-center">
      <a class="h-10" @click="
        () => {
          $router.push({ path: '/login' });
        }
      ">
        <font-awesome-icon class="w-5 cursor-pointer" icon="arrow-right-from-bracket" />
      </a>

      <a class="h-10 relative">
        <span class="flex h-2 w-2 absolute -right-1" v-if="store.sysInfo.showMessageNotifucation">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <font-awesome-icon class="w-5 cursor-pointer" icon="bell" :class="{
          'text-blue-500': active == 'message',
        }" @click="
  () => {
    $router.push({ path: '/message' });
  }
" />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import Avatar from "./Avatar.vue";
import { appStore } from "../store/appStore";
import { mapActions } from "pinia";

export default {
  name: "Header",
  data: () => {
    return {
      isDisplay: false,
      active: "",
    };
  },
  setup() {
    const store = appStore();

    return {
      store,
    };
  },
  mounted() {
    this.active = this.$route.fullPath.split("/")[1];
  },
  methods: {
    ...mapActions(appStore, ["setLogout"]),
    displayMenu() {
      console.log("??????");
      this.isDisplay = true;
    },
    hideMenu() {
      this.isDisplay = false;
    },
  },
  watch: {
    $route: {
      deep: true,
      handler(n, o) {
        this.active = n.fullPath.split("/")[1];
      },
    },
  },
  components: {

    Avatar,
  },
};
</script>
