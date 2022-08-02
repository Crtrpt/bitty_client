<template>
     <div class="   flex flex-grow  cursor-pointer items-center justify-center   bg-white  border-b">
           <input class="rounded-full px-4 py-1 m-1 outline-blue-500 bg-gray-100   text-sm" placeholder="搜索" />
        </div>
</template>

<script lang="ts">
export default {
  name: "ContactSearch",
  props:{
    data:Object,
  }
};
</script>