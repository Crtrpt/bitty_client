<template>
    <div class="py-1 bg-white p-2 shadow rounded text-base text-gray-800">
        {{ data.content }}
    </div>
</template>

<script lang="ts">
export default {
    props: {
        data: Object
    },
    name: "MarkdownRender",
};
</script>