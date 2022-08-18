<template>
    <div class="flex flex-grow">
        <group-list></group-list>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import GroupList from "./GroupList.vue";

export default {
    name: "Group",
    components: { GroupList }
}
</script>