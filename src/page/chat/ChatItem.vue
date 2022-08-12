<template>
    <div class="flex" :class="{
        'flex-row-reverse': data.sender_id == this.store.userInfo.user.user_id,
    }">
        <Avatar :user_id="data.sender_id"></Avatar>
        <div class="mb-4">
            <component :is="renderMap[data.type]" :data="data"></component>



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
export default {
    name: "ChatItem",
    data() {
        return {
            renderMap: ["text-render", "image-render"]
        }
    },
    setup() {
        const store = appStore();
        return { store };
    },
    props: {
        data: Object
    },
    components: { TextRender, ImageRender }
};
</script>