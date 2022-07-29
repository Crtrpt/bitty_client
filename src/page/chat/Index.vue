<template>
    <div class="flex flex-grow">
        <ChatList/>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import ChatList from "./ChatList.vue";
export default {
    name: "Chat",
    components: { ChatList }
}
</script>