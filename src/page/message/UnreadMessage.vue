<template>
    <div class="container mx-auto">
        <div class="text-3xl mt-10 px-4 mb-5">未读消息</div>
        <div>
            <div class="px-4">
                <message-item :m="m" v-for="m in list" :key="m"></message-item>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from "../../store/appStore";
import MessageItem from "./MessageItem.vue";
export default {
    name: "UnreadMessage",
    components: { MessageItem },
    methods: {
        unreadMessage() {
            var _store = this.store;
            var _this = this;
            api
                .get("msg/unreadMessage", {
                    user_id: this.store.userInfo.user.user_id,
                })
                .then((res) => {
                    _this.list = res.data;
                });
        },
    },
    mounted() {
        this.unreadMessage();
    },
    setup() {
        const store = appStore();

        return {
            store,
        };
    },
    data() {
        return {
            list: [],
        };
    },
};
</script>
