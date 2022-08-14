<template>
  <div class=" ">
    <div class="p-2 h-12 border-b border-gray-200 flex items-center">
      <router-link :to="{
        path: './chat',
      }">
        <font-awesome-icon class="w-5 px-2 cursor-pointer hover:text-gray-800" icon="arrow-left" />
        {{ store.curSession?.name }}
      </router-link>

    </div>
    <div class="flex flex-row">
      <!-- 成员列表 -->
      <div class="p-2 flex flex-col justify-center items-center" v-for="m in store.curSession?.member || []" :key="m"
        @click="
          () => {
            $router.push({ path: '/contact/' + m.id + '/profile' });
          }
        ">
        <div class="rounded-full bg-blue-500 w-8 h-8 flex-grow-0 flex-shrink-0">
          <img class="w-full h-full" :src="m.user?.avatar || ''" />
        </div>
        <div class="text-xs text-gray-400">{{ m.user.name }}</div>
      </div>
      <!-- 配置列表 -->
      <div class="action p-2">
        <a class="border px-2 py-4">删除会话</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { appStore } from "../../store/appStore";
export default {
  name: "SessionProfile",
  data() {
    return {
      session: {}
    }
  },
  mounted() {
    //获取session信息
    //获取
  },
  setup() {
    const store = appStore();
    return { store };
  },
};
</script>
