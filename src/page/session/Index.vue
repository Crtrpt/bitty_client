<template>
  <div class="flex flex-grow">
    <SessionList :active="active" />
    <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
  </div>
</template>

<script lang="ts">
import SessionList from "./SessionList.vue";
export default {
  name: "SessionView",
  watch: {
    $route: {
      deep: true,
      handler(n, o) {
        this.active = n.params.id;
      },
    },
  },
  data() {
    return {
      active: "",
      session: {},
    };
  },
  mounted() {
    this.active = this.$route.params.id;
  },

  components: { SessionList },
};
</script>
