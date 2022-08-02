<template>
  <div class="flex flex-col text-gray-500   justify-center  items-center w-20  bg-gray-200">
 
    <div class="rounded-full bg-blue-500    p-5 m-5"
    
    :style="{
        backgroundImage: 'url('  + store.userInfo.user.avatar + ')',
        backgroundSize: 'cover'
        }"
    @click="() => {
            $router.push({ path: '/my/profile' });
          }">
    </div>
    <a class="h-10" 
        @click="() => {
            $router.push({ path: '/chat' });
        }"
    >
          <font-awesome-icon class="w-5 cursor-pointer hover:text-gray-800" icon="message" />
    </a>
     <a class="h-10" 
       @click="() => {
            $router.push({ path: '/contact' });
        }"
     >
          <font-awesome-icon class="w-5 cursor-pointer" icon="user-group" />
    </a>
    <div class="flex flex-col-reverse flex-grow items-center "> 
     
       <a class="h-10" @click="() => {
            $router.push({ path: '/login' });
        }">
          <font-awesome-icon class="w-5 cursor-pointer" icon="arrow-right-from-bracket" />
      </a>
       <a class="h-10">
          <font-awesome-icon class="w-5 cursor-pointer" icon="bars"  
          @click="() => {
            $router.push({ path: '/setting' });
        }"/>
      </a>
      <a class="h-10">
          <font-awesome-icon class="w-5 cursor-pointer" icon="bell"  @click="() => {
            $router.push({ path: '/message' });
        }"/>
      </a>
       <a class="h-10" @click="() => {
            $router.push({ path: '/search' });
        }">
          <font-awesome-icon class="w-5 cursor-pointer" icon="search" />
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
    };
  },
  setup() {
    const store = appStore();
   
    return {
      store,
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
