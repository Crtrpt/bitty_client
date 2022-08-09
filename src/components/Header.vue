<template>
  <div
    class="flex flex-col text-gray-500 justify-center items-center w-20 bg-gradient-to-r border-r bg-gray-50"
  >
    <div
      class="rounded-full bg-white p-5 m-5 cursor-pointer hover:shadow-xl border-4 border-white"
      :class="{
        ' shadow': active == 'my',
      }"
      :style="{
        backgroundImage: 'url(' + store.userInfo.user.avatar + ')',
        backgroundSize: 'cover',
      }"
      @click="
        () => {
          $router.push({ path: '/my/profile' });
        }
      "
    ></div>
    <a
      class="h-10"
      @click="
        () => {
          $router.push({ path: '/chat' });
        }
      "
    >
      <font-awesome-icon
        class="w-5 cursor-pointer hover:text-gray-800"
        icon="message"
        :class="{
          'text-blue-500': active == 'chat',
        }"
      />
    </a>
    <a
      class="h-10"
      @click="
        () => {
          $router.push({ path: '/contact' });
        }
      "
    >
      <font-awesome-icon
        class="w-5 cursor-pointer"
        icon="user-group"
        :class="{
          'text-blue-500': active == 'contact',
        }"
      />
    </a>
    <div class="flex flex-col-reverse flex-grow items-center">
      <a
        class="h-10"
        @click="
          () => {
            $router.push({ path: '/login' });
          }
        "
      >
        <font-awesome-icon
          class="w-5 cursor-pointer"
          icon="arrow-right-from-bracket"
        />
      </a>
      <a class="h-10">
        <font-awesome-icon
          class="w-5 cursor-pointer"
          icon="bars"
          :class="{
            'text-blue-500': active == 'setting',
          }"
          @click="
            () => {
              $router.push({ path: '/setting' });
            }
          "
        />
      </a>
      <a class="h-10">
        <font-awesome-icon
          class="w-5 cursor-pointer"
          icon="bell"
          :class="{
            'text-blue-500': active == 'message',
          }"
          @click="
            () => {
              $router.push({ path: '/message' });
            }
          "
        />
      </a>
      <a
        class="h-10"
        @click="
          () => {
            $router.push({ path: '/search' });
          }
        "
      >
        <font-awesome-icon
          class="w-5 cursor-pointer"
          icon="search"
          :class="{
            'text-blue-500': active == 'search',
          }"
        />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import Menu from "./Menu.vue";
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
      console.log("显示");
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
    Menu,
    Avatar,
  },
};
</script>
