<template>
  
    <div class="py-3 ">
        <div class=" px-2 py-2 border-b  border-gray-200">
            聊天室名称  

             <router-link :to='{
                path:"./chat"
            }'>聊天 </router-link>
        </div>
        <div class="border-b  border-gray-200 h-80">
            聊天室介绍
        </div>
        <div class="">
             <router-link :to='{
                path:"/user/111/profile"
            }'>成员1 </router-link>
             <router-link :to='{
                path:"/user/222/profile"
            }'>成员 2</router-link>
        </div>
    </div>

</template>

<script lang="ts">
import ChatCard from "./ChatCard.vue";
export default {
    name: "ChatProfile",
    components: { ChatCard }
};
</script>