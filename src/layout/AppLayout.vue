<template>
  <div class="applayout flex flex-row grow overflow-hidden h-screen w-screen">
    <Header class="hover:shadow"></Header>
    <router-view v-slot="{ Component }" class="bg-gray-50">
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
