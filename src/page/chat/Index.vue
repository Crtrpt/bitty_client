<template>
    <div class="flex flex-grow">
        <ChatList :active="active"/>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">

import ChatList from "./ChatList.vue";
export default {
    name: "Chat",
    watch:{
    "$route":{
      deep:true,
      handler(n,o){
        this.active=n.params.id;
      }
    },
    data(){
        return {
            active:"",
        }
    },
    mounted(){
        console.log("=======");
        
    }
  },
    components: { ChatList }
}
</script>