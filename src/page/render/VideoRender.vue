<template>
    <div>
        <div class="border px-2 py-2 flex items-center">
            <font-awesome-icon class="w-5 pl-0  pr-2 cursor-pointer text-blue-500  hover:text-blue-600" icon="video" />
            <div>视频邀请</div>

        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        data: Object
    },
    name: "VideoRender",
    methods: {
        fullshow() {

        }
    }
};
</script>