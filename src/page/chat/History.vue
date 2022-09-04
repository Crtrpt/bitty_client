<template>
    <div class=" ">
        <div class="p-2 h-12 border-b border-gray-200 flex items-center">
            <div @click="$router.go(-1)">
                <font-awesome-icon class=" w-5 px-2 cursor-pointer hover:text-gray-800" icon="arrow-left" />
                会话记录
            </div>
        </div>
        <div class="flex flex-col ">
            <div class="filter mt-2 mx-2 flex">
                <div>
                    <input type="text" placeholder="输入你要检索的内容" class=" text-sm rounded" v-model="search.keyword" />
                </div>
                <div class="ml-2">
                    <input type="date" class=" text-sm rounded" v-model="search.start_at" />
                </div>
                <div class="ml-2">
                    <input type="date" class=" text-sm rounded" v-model="search.end_at" />
                </div>
                <div class="ml-2">
                    <div
                        class=" cursor-pointer border px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm">
                        搜索</div>
                </div>
            </div>
            <div class="mt-2 border-t">

            </div>
        </div>
    </div>
</template>
  
  <script lang="ts">
  import api from "../../api/api";
  import { appStore } from "../../store/appStore";
  import Avatar from "../../components/Avatar.vue";
  export default {
    name: "SessionProfile",
    props: {
      "session": Object,
      "config": Object,
    },
    data() {
      return {
        search:{},
        members: []
      };
    },
    watch: {
      
    },
    methods: {
     
      
    },
    mounted() {
    },
    setup() {
      const store = appStore();
      return { store };
    },
    components: { Avatar }
  };
  </script>
  