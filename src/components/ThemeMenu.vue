<template>
  <a
    href="javascript:void(0);"
    class="relative h-12 flex justify-center items-center px-2 cursor-pointer"
    
    @click="
          () => {
            $router.push({ path: '/system/themeBuilder' });
          }
    "
  >
    <div class="flex items-center px-3">
      <font-awesome-icon class="w-5" icon="palette" />
    </div>
  </a>
</template>

<script lang="ts">
import Menu from "./Menu.vue";
import Avatar from "./Avatar.vue";
import { mapState } from "pinia";
import { appStore } from "../store/appStore";
import { mapActions } from "pinia";

export default {
  name: "ThemeMenu",
  data: () => {
    return {
      isDisplay: false,
    };
  },
  setup() {
    const appstore = appStore();
    return {
      appStore,
    };
  },
  methods: {
    ...mapActions(appStore, ["setLogout"]),
    displayMenu() {
      console.log("显示");
      this.isDisplay = true;
    },
    hideMenu() {
      this.isDisplay = false;
    },
  },
  components: { Menu, Avatar },
};
</script>
