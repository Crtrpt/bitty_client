<template>
  <div class="container mx-auto">
    <div class="flex items-baseline">
      <div class="cursor-pointer text-3xl mt-10 px-4">系统消息</div>
      <div
        class="cursor-pointer text-xl my-10 mx-3"
        @click="
          () => {
            $router.push({ path: './unreadMessage' });
          }
        "
      >
        未读消息
      </div>
      <div
        class="cursor-pointer text-xl my-10 mx-3"
        @click="
          () => {
            $router.push({ path: './allMessage' });
          }
        "
      >
        全部消息
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: "Inbox",
  data() {
    return {
      list: [
        {
          content: "苏轼添加你为好友",
        },
        {
          content: "李白添加你为好友",
        },
      ],
    };
  },
};
</script>
