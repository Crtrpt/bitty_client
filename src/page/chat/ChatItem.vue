<template>
    <div class="flex  cursor-pointer" :class="{
        'flex-row-reverse': data.sender_id == this.store.userInfo.user.user_id,
    }" @mouseenter="() => {
    this.displayAction = true
}" @mouseleave="() => {
    this.displayAction = false
}">
        <Avatar :user_id="data.sender_id" :className="{ 'justify-start': true }"></Avatar>
        <div class="mb-1">
            <div class="flex " :class="{
                'flex-row-reverse': data.sender_id == this.store.userInfo.user.user_id,
            }">
                <component class=" bg-gray-100 hover:shadow-md" :is="renderMap[data.type]" :data="data"></component>

                <MessageStatus :data="data" v-if="data.sender_id == this.store.userInfo.user.user_id"></MessageStatus>

                <!-- <MessageAction v-if="displayAction" :msg="data"></MessageAction> -->


            </div>
            <div class="text-xs text-gray-300 py-0.5 mt-1" :class="{
                'flex justify-end': data.sender_id == this.store.userInfo.user.user_id,
            }">
                <div>{{ prttyDate(data.created_at) }}</div>
            </div>
        </div>
        <div>
        </div>
    </div>
</template>

<script lang="ts">
import { appStore } from "../../store/appStore";
import TextRender from "../render/TextRender.vue";
import ImageRender from "../render/ImageRender.vue";
import FileRender from "../render/FileRender.vue";
import MapRender from "../render/MapRender.vue";
import VideoRender from "../render/VideoRender.vue";
import MessageAction from "./MessageAction.vue";
import MessageStatus from "./MessageStatus.vue";

export default {
    name: "ChatItem",
    data() {
        return {
            displayAction: false,
            renderMap: ["text-render", "image-render", "file-render", "map-render", "video-render"]
        }
    },
    setup() {
        const store = appStore();
        return { store };
    },
    props: {
        data: Object
    },
    components: { TextRender, ImageRender, FileRender, MapRender, MessageAction, MessageStatus, VideoRender }
};
</script>