<template>
    <div>
        <a :href="data.payload.url" target="_black">
            <img @click="fullshow" class=" max-h-[5rem]  max-w-[30rem]   overflow-hidden p-1 bg-white  shadow rounded text-base
     text-gray-800" :src="data.payload.url" />
        </a>
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