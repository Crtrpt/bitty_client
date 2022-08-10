<template>
  <div class="container mx-auto">
    <div class="text-3xl mt-10 px-4">
      {{ $t("profile") }}
    </div>
    <div class="w-full mx-auto flex justify-center items-center">
      <div class="ml-20 flex flex-col">
        <div class="flex items-center">
          <div class="shadow-xl rounded-full">
            <img class="w-20" :src="data.avatar" />
          </div>
          <div class="ml-10 w-80">
            <div class="text-xl">
              {{ data.nick_name || "" }}
            </div>
            <div class="text-sm text-gray-500">
              {{ data.status || "" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { appStore } from "../../store/appStore";
export default {
  props: {
    data: Object,
  },
  name: "MyProfile",
  setup() {
    const store = appStore();
    return {
      store,
    };
  },
};
</script>
