<template>
    <div>
        <div class="px-2 py-2 h-12 flex border-b  items-center">
            <div class="flex-grow">

                <font-awesome-icon @click="() => { this.$emit('close') }"
                    class="w-5 h-4 hover:text-gray-600 cursor-pointer text-gray-500" icon="bars">
                </font-awesome-icon>
            </div>

            <font-awesome-icon @click="() => { this.$emit('close') }"
                class="w-5 h-4 hover:text-gray-600 cursor-pointer text-gray-500" icon="close">
            </font-awesome-icon>
        </div>
        <div class="">
            <component :is="renderMap[data.type]" :data="data"></component>
        </div>
    </div>
</template>


<script lang="ts">
import { appStore } from '../../store/appStore';

import TextRenderDetail from "../render/TextRenderDetail.vue";
import ImageRenderDetail from "../render/ImageRenderDetail.vue";
import FileRenderDetail from "../render/FileRenderDetail.vue";
import MapRenderDetail from "../render/MapRenderDetail.vue";
import VideoRenderDetail from "../render/VideoRenderDetail.vue";


export default {
    name: "Right",
    setup() {
        const store = appStore();
        return { store };
    },
    data() {
        return {
            renderMap: ["text-render-detail", "image-render-detail", "file-render-detail", "map-render-detail", "video-render-detail"]
        }
    },
    props: {
        data: Object
    },
    components: { TextRenderDetail, ImageRenderDetail, FileRenderDetail, MapRenderDetail, VideoRenderDetail }

};
</script>