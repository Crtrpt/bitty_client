<template>
    <div class=" w-80  bg-gray-100 border-r ">
       
        <ChatSearch :kewords="kewords" class="  h-12"></ChatSearch>
      
        <div v-for=" i in store.chatList" :key="i" class="flex  hover:bg-gray-200 "
        :class="{
            'bg-gray-300':active==i.id
        }"
        @click="()=>{
                store.setChat(i);
                $router.push({ path: '/chat/'+i.id+'/chat' });
            }">
            <ChatItem :data="i"></ChatItem>
        </div>
    </div>
</template>

<script lang="ts">
import { appStore } from '../../store/appStore';
import ChatItem from "./ChatItem.vue"
import ChatSearch from "./ChatSearch.vue";

export default {
    name: "ChatList",
    props:{
        active:{
            type:String,
            default:"",
        }
    },
    setup() {
        const store = appStore()
        return { store }
    },
    data() {
        return {
            kewords:"",
            list: [],
        };
    },
    components: { ChatItem, ChatSearch }
}
</script>