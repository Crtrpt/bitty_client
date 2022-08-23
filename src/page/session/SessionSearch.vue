<template>
  <div class="flex flex-grow cursor-pointer items-center justify-center bg-white border-b">
    <input class="flex-grow rounded-full px-4 py-1 m-1 outline-blue-500 bg-gray-100 text-sm"
      :placeholder="$t('search_text')" />
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
