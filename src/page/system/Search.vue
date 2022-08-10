<template>
  <div class="container mx-auto">
    <div class="text-3xl mt-10 px-4 mb-5">
      {{ $t("search") }}
    </div>
    <div class="w-full flex items-center justify-center pb-4">
      <div class="border rounded-l-full hover:shadow-inner border-r-0">
        <input
          v-model="keywords"
          @keyup.enter="search"
          placeholder="输入你要搜索的内容"
          class="outline-none px-2 m-2 w-60"
        />
      </div>
      <div
        class="border rounded-r-full px-4 py-2 bg-blue-500 text-white cursor-pointer hover:shadow"
        @click="search"
      >
        {{ $t("search") }}
        <font-awesome-icon class="w-5 cursor-pointer" icon="search" />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 p-4">
      <div v-for="i in list" :key="i">
        <div class="border p-4 rounded hover:shadow overflow-hidden">
          <div class="flex flex-col">
            <div class="flex items-start">
              <div class="shadow-xl rounded-full flex-shrink-0">
                <img class="w-10 rounded-full" :src="i.avatar" />
              </div>
              <div class="ml-2">
                <div class="text-xl">
                  {{ i.nick_name }}
                </div>
                <div class="text-xs text-gray-500 h-8 overflow-hidden">
                  {{ i.status }}
                </div>
              </div>
            </div>
            <div class="action mt-5 flex text-xs text-white">
              <!-- <div class="   rounded cursor-pointer    whitespace-nowrap  px-2 py-1  mr-2 bg-blue-400 ">
                                    发起聊天
                                </div> -->
              <div
                class="rounded cursor-pointer whitespace-nowrap px-2 py-1 mr-2 bg-blue-400"
                @click="addEndpoint(i)"
              >
                加为好友
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from "../../store/appStore";

export default {
  name: "Search",
  setup() {
    const store = appStore();
    return { store };
  },
  methods: {
    search() {
      var _this = this;
      api
        .get("contact/search", {
          keywords: this.keywords,
        })
        .then((res) => {
          _this.list = res.data;
        });
    },
    addEndpoint(u) {
      var _this = this;
      api
        .post("contact/add", {
          type: 1,
          user_id: _this.store.userInfo.user.user_id,
          target_id: u.user_id,
        })
        .then((res) => {
          if (res.code == 0) {
            alert("已经发送好友申请");
          } else {
            alert(res.msg);
          }
        });
    },
  },
  data() {
    return {
      keywords: "",
      list: [],
    };
  },
};
</script>
