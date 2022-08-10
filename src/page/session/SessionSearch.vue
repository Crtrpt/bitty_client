<template>
  <div
    class="flex flex-grow cursor-pointer items-center justify-center bg-white border-b"
  >
    <input
      class="flex-grow rounded-full px-4 py-1 m-1 outline-blue-500 bg-gray-100 text-sm"
      :placeholder="$t('search_text')"
    />
    <font-awesome-icon
      @click="
        () => {
          $router.push({ path: '/search' });
        }
      "
      class="w-3 h-3 m-1 p-2 rounded-full border hover:border-blue-500 hover:text-blue-500 cursor-pointer text-gray-500"
      icon="add"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "SessionItem",
  props: {
    data: Object,
  },
};
</script>
