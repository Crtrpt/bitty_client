<template>
    <div class="flex flex-grow">
        <Left />
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Left from "./Left.vue";

export default {
    name: "MyIndex",
    components: { Left },
};
</script>
