<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { appStore } from "./store/appStore";

export default {
  name: "BittyVue",
  methods: {},
  setup() {
    const store = appStore();
    return { store };
  },
  mounted() {
    if (this.store.userInfo) {
      this.store.fetchSessionList();
      this.store.fetchContactList();
    }
  },
};
</script>
