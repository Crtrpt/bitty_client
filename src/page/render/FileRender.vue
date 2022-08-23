<template>
    <div class="flex border py-2  items-center  w-60" :class="{
        ' w-96': data.payload.type == 'audio'
    }">
        <font-awesome-icon v-if="data.payload.type == undefined" class="w-5 px-4  cursor-pointer  hover:text-gray-900"
            icon="file" />
        <font-awesome-icon v-if="data.payload.type == 'video'" class="w-5 px-4  cursor-pointer  hover:text-gray-900"
            icon="microphone" />
        <font-awesome-icon v-if="data.payload.type == 'audio'" class="w-5 px-4  cursor-pointer  hover:text-gray-900"
            icon="video" />
        <div v-if="data.payload.type == undefined">
            <a class=" text-xs text-gray-900" :href="data.payload.url" target="_black">
                {{ data.payload.name }}
            </a>
            <div class=" text-xs text-gray-500">
                {{ prttySize(data.payload.size) }}
            </div>
        </div>
s
        <video class="  flex-grow" v-if="data.payload.type == 'video'" :src="data.payload.url" controls>

        </video>

        <audio class="flex-grow" v-if="data.payload.type == 'audio'" :src="data.payload.url" controls>

        </audio>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        data: Object
    },
    name: "ImageRender",
    methods: {
        fullshow() {
            console.log("全屏显示")
        }
    }
};
</script>