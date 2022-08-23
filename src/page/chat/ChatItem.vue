<template>
    <div class="flex" :class="{
        'flex-row-reverse': data.sender_id == this.store.userInfo.user.user_id,
    }">
        <Avatar :user_id="data.sender_id" :className="{ 'justify-start': true }"></Avatar>
        <div class="mb-1">
            <component class=" bg-gray-100 hover:shadow-md" :is="renderMap[data.type]" :data="data"></component>
            <div class="text-xs text-gray-300 py-0.5">
                {{ prttyDate(data.created_at) }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { appStore } from "../../store/appStore";
import TextRender from "../render/TextRender.vue";
import ImageRender from "../render/ImageRender.vue";
import FileRender from "../render/FileRender.vue";
import MapRender from "../render/MapRender.vue";
export default {
    name: "ChatItem",
    data() {
        return {
            renderMap: ["text-render", "image-render", "file-render", "map-render"]
        }
    },
    setup() {
        const store = appStore();
        return { store };
    },
    props: {
        data: Object
    },
    components: { TextRender, ImageRender, FileRender, MapRender }
};
</script>