<template>
  <div class="applayout flex flex-row grow overflow-hidden h-screen w-screen">
    <Header class="hover:shadow"></Header>
    <keep-alive>
      <router-view class="bg-gray-50">
      </router-view>
    </keep-alive>
  </div>
</template>
<script lang="ts">
export default {
  name: "AppLayout",
};
</script>
