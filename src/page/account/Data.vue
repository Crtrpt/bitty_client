<template>

  <div class="container mx-auto flex flex-col">
    <div class="flex items-baseline sticky">
      <div class="text-3xl mt-10 px-2 pb-5 w-full">
        数据
      </div>
    </div>
    <div class="px-2 flex-grow overflow-auto md:w-1/2 text-lg">
      <div class=" p-2 mt-2 flex">
        <div @click="saveUserConfig"
          class="border bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded py-1 px-4">保存
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from '../../api/api';
import { appStore } from "../../store/appStore";
export default {
  name: "data",
  setup() {
    const store = appStore();
    return { store };
  },
  methods: {

  },
  data() {
    return {
      languageList: [
        {
          code: "en",
          name: "English",
        },
        {
          code: "zh",
          name: "中文",
        },
      ],
    };
  },
};
</script>
