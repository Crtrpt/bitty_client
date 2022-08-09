<template>
  <div class="container mx-auto">
    <div class="text-3xl mt-10 px-4 mb-5">我的信息</div>
    <div class="w-full mx-auto flex justify-center items-center px-4">
      <div class="flex flex-col">
        <div class="flex items-start">
          <div
            class="hover:shadow-xl shadow border-8 border-white rounded-full relative flex-shrink-0"
          >
            <img
              class="w-20 h-20 rounded-full"
              :src="store.userInfo.user.avatar"
              ref="avatarImg"
            />
            <input
              type="file"
              class="absolute w-20 h-20 top-0 opacity-0"
              ref="avatarRef"
              @change="uploadAvatar"
            />
          </div>
          <div class="ml-10 flex flex-col w-80">
            <template v-if="editale">
              <input
                placeholder="昵称"
                class="text-xl py-1 text-gray-500 outline-none border rounded my-1 p-1 border-gray-700"
                v-model="store.userInfo.user.nick_name"
              />
              <input
                placeholder="邮箱"
                class="text-sm py-1 text-gray-500 outline-none border rounded my-1 p-1 border-gray-700"
                v-model="store.userInfo.user.email"
              />
              <textarea
                placeholder="状态"
                class="text-sm text-gray-500 outline-none rounded p-1 my-1 border-gray-700"
                v-model="store.userInfo.user.status"
              ></textarea>
              <div class="flex">
                <div
                  class="rounded text-sm border-blue-500 cursor-pointer border bg-blue-500 text-white px-2"
                  @click="saveUserInfo"
                >
                  保存
                </div>
                <div
                  class="rounded text-sm text-blue-500 cursor-pointer border border-blue-500 px-2 mx-1"
                  @click="() => (editale = false)"
                >
                  取消
                </div>
              </div>
            </template>
            <template v-if="!editale">
              <div class="flex items-baseline">
                <div class="text-xl py-1 text-gray-500 outline-none">
                  {{ store.userInfo.user.nick_name }}
                </div>
                <div class="text-xs py-1 pl-2 text-gray-500 outline-none">
                  {{ store.userInfo.user.email }}
                </div>
              </div>
              <div
                class="text-xs text-gray-400 outline-none rounded py-1"
                @click="() => (editale = true)"
              >
                {{ store.userInfo.user.status }}
              </div>
              <div class="flex">
                <div
                  class="text-sm text-blue-500 cursor-pointer"
                  @click="() => (editale = true)"
                >
                  编辑
                </div>
              </div>
            </template>
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
  name: "UserProfile",
  data() {
    return {
      editale: false,
    };
  },
  methods: {
    saveUserInfo() {
      var _store = this.store;
      var _this = this;
      api.post("user/save", this.store.userInfo.user).then((res) => {
        this.editale = false;
        _store.syncUserInfo();
      });
    },
    uploadAvatar() {
      var _this = this;
      const preview = this.$refs.avatarImg as HTMLImageElement;
      const file = this.$refs.avatarRef.files[0];

      console.log(file);
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          preview.src = reader.result;
        },
        false
      );

      if (file) {
        console.log("上传文件");
        api
          .upload("asset/uploadImage", {
            file: file,
          })
          .then((res) => {
            this.store.userInfo.user.avatar = res.data;
            _this.saveUserInfo();
          });
        reader.readAsDataURL(file);
      }
    },
  },
  setup() {
    const store = appStore();

    return {
      store,
    };
  },
};
</script>
