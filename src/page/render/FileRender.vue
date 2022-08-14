<template>
    <div class="flex border py-2  items-center  w-60">
        <font-awesome-icon class="w-5 px-4  cursor-pointer  hover:text-gray-900" icon="file" />
        <div>
            <a class=" text-xs text-gray-900" :href="data.payload.url" target="_black">
                {{ data.payload.name }}
            </a>
            <div class=" text-xs text-gray-500">
                {{ prttySize(data.payload.size) }}
            </div>
        </div>
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