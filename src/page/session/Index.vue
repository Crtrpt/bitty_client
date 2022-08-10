<template>
  <div class="flex flex-grow">
    <SessionList :active="active" />
    <router-view></router-view>
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
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    this.active = this.$route.params.id;
  },
  components: { SessionList },
};
</script>
