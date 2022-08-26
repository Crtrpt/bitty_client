<template>
    <Left></Left>
    <RouterView class="flex-grow"></RouterView>
</template>

<script lang="ts">
import Left from "./Left.vue";
export default {
    name: "GroupSetting",
    components: { Left }
};
</script>