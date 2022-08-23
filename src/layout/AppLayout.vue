<template>
  <!-- // 'blur-sm': !store.sysInfo.isConnect -->
  <div class="applayout flex flex-row grow overflow-hidden h-screen w-screen" :class="{
  
  }">
    <Header class="hover:shadow"></Header>
    <keep-alive>
      <router-view class="bg-gray-50">
      </router-view>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import { appStore } from '../store/appStore';
export default {
  name: "AppLayout",
  setup() {
    const store = appStore();
    return { store };
  },
};
</script>
