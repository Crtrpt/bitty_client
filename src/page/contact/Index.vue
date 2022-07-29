<template>
    <div class="flex flex-grow">
        <contact-list></contact-list>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import ContactList from "./ContactList.vue";

export default {
    name: "Contact",
    components: { ContactList }
}
</script>