<template>
  <div class="flex flex-col text-gray-500   justify-center  items-center w-20  bg-gray-200">
    <div class="rounded-full bg-blue-500   w-8 h-8  p-5 m-5"  @click="() => {
            this.$router.push({ path: '/user/profile' });
          }">
        <img class="  w-full h-full" src="https://api.multiavatar.com/Starcrasher.png"   />
    </div>
    <a class="h-10" 
        @click="() => {
            this.$router.push({ path: '/chat' });
        }"
    >
          <font-awesome-icon class="w-5 cursor-pointer hover:text-gray-800" icon="message" />
    </a>
     <a class="h-10" 
       @click="() => {
            this.$router.push({ path: '/contact' });
        }"
     >
          <font-awesome-icon class="w-5 cursor-pointer" icon="user-group" />
    </a>
    <div class="flex flex-col-reverse flex-grow items-center "> 
     
       <a class="h-10" @click="() => {
            this.$router.push({ path: '/login' });
        }">
          <font-awesome-icon class="w-5 cursor-pointer" icon="arrow-right-from-bracket" />
      </a>
       <a class="h-10">
          <font-awesome-icon class="w-5 cursor-pointer" icon="bars" />
      </a>
       <a class="h-10" @click="() => {
            this.$router.push({ path: '/search' });
        }">
          <font-awesome-icon class="w-5 cursor-pointer" icon="search" />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import Menu from "./Menu.vue";
import Avatar from "./Avatar.vue";
import { mapState } from "pinia";
import { appStore } from "../store/appStore";
import { mapActions } from "pinia";


export default {
  name: "Header",
  data: () => {
    return {
      isDisplay: false,
    };
  },
  setup() {
    const appstore = appStore();
    return {
      appStore,
    };
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
  components: {
    Menu,
    Avatar
  },
};
</script>
