<template>
    <div class="flex flex-col   h-screen bg-gray-50">
        <div class=" px-2 py-2  h-12 flex items-center border-b flex-shrink-0 ">
            <router-link :to='{
                path:"./profile"
            }'>聊天室信息 </router-link>
        </div>
        <div class="flex-grow  p-2  overflow-scroll">
                <ChatView :data="list"></ChatView>
        </div>
        <div class=" h-1/3 border-t p-2 flex-shrink-0    ">
            <ChatInput />
        </div>
    </div>
</template>

<script lang="ts">
import ChatView from "./ChatView.vue";
import ChatInput from "./ChatInput.vue";
export default {
    name: "Chat",
    props: {
        data: Object,
    },
    data(){
        return {
            list: [
               
            ]
        }
    },
    components: { ChatView, ChatInput }
};
</script>