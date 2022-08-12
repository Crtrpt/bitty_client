<template>
    <div class="chat_list  w-full  ">
        <ChatItem v-for="d in data.list" :key="d" class=" item" :data="d">
        </ChatItem>
    </div>
</template>

<script lang="ts">

import Avatar from "../../components/Avatar.vue";
import ChatItem from "./ChatItem.vue";
export default {
    name: "ChatList",
    props: {
        data: Object,
    },
    components: { Avatar, ChatItem }
};
</script>
