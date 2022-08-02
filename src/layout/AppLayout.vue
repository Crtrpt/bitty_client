<template>
  <div class="applayout flex flex-row grow overflow-hidden h-screen w-screen">
    <Header class="shadow"></Header>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
export default {
  name: "AppLayout",
};
</script>
