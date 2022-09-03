<template>
    <div class="chat_list  w-full  ">
        <ChatItem v-for="d in data.list" :key="d" class=" item" :data="d" @click="showMessageDetail(d)">
        </ChatItem>
    </div>
</template>

<script lang="ts">

import ChatItem from "./ChatItem.vue";
export default {
    name: "ChatList",
    props: {
        data: Object,
    },
    methods: {
        showMessageDetail(d) {
            this.$emit("showMessageDetail", d)
        }
    },
    components: { ChatItem }
};
</script>
