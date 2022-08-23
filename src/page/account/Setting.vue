<template>

  <div class="container mx-auto flex flex-col">
    <div class="flex items-baseline sticky">
      <div class="text-3xl mt-10 px-2 pb-5 w-full">
        {{ $t("systemConfig") }}
      </div>
    </div>
    <div class="px-2 flex-grow overflow-auto md:w-1/2 text-sm">
      <div class="border p-2 mt-2 flex flex-col  rounded">
        <div>头像</div>
        <div class="action mt-2 flex">
          <div
            class="hover:shadow-xl flex justify-center items-center shadow border-8 border-white rounded-full relative flex-shrink-0">
            <img class="w-20 h-20 rounded-full" :src="store.userInfo.user.avatar" ref="avatarImg"
              v-if="store.userInfo.user.avatar" />
            <div class="w-20 h-20 rounded-full flex justify-center items-center" v-if="!store.userInfo.user.avatar">
              <div class="text-5xl text-gray-700">
                {{ store.userInfo.user.nick_name[0] }}
              </div>
            </div>
            <input type="file" class="absolute w-20 h-20 top-0 opacity-0" ref="avatarRef" @change="uploadAvatar" />
          </div>
        </div>
      </div>
      <div class="border p-2 mt-2 flex flex-col  rounded">
        <div>用户昵称</div>
        <div class="action mt-2 flex">
          <input v-model="store.userInfo.user.nick_name" type="text" class=" input rounded p-1 m-1" />
        </div>
      </div>
      <div class="border p-2 mt-2 flex flex-col  rounded">
        <div>当前状态</div>
        <div class="action mt-2 flex">
          <textarea class=" w-full input rounded" v-model="store.userInfo.user.status">
          </textarea>
        </div>
      </div>
      <div class="border p-2 mt-2 flex flex-col  rounded">
        <div>是否可以被搜索</div>
        <div class="action mt-2 flex">
          <input v-model="store.userInfo.user.allow_search" type="checkbox" class=" input rounded" value="0" />
        </div>
      </div>

      <div class="border p-2 mt-2 flex flex-col  rounded">
        <div>是否允许匿名聊天</div>
        <div class="action mt-2 flex">
          <input v-model="store.userInfo.user.allow_anon_session" type="checkbox" class=" input rounded" value="0" />
        </div>
      </div>

      <div class=" p-2 mt-2 flex">
        <div @click="saveUserInfo"
          class="border bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded py-1 px-4">保存
        </div>
      </div>




      <div class="border p-2 mt-2 flex flex-col  rounded">
        <div>添加好友验证信息</div>
        <div class="action mt-2 flex">
          <select v-model="store.userInfo.user.add_contact_type" class=" input rounded">
            <option value=-1>不允许添加好友</option>
            <option value=0>直接通过</option>
            <option value=1>经过我的同意</option>
            <option value=2>答对问题通过</option>
            <option value=3>答对问题并且经过我的同意</option>
          </select>
        </div>
        <div class="action mt-2 flex" v-if="store.userInfo.user.add_contact_type > 1">
          <input v-model="store.userInfo.config.add_contact_question" class="p-1 m-1 border  input rounded"
            placeholder="问题" />
          <input v-model="store.userInfo.config.add_contact_answer" class="p-1 m-1 border  input rounded"
            placeholder="答案" />
        </div>
      </div>

      <div class="border p-2 mt-2 flex flex-col  rounded">
        <div>允许多个账号同时登陆</div>
        <div class="action mt-2 flex">
          <input v-model="store.userInfo.config.all_multiple_accounts_login" type="checkbox" class=" input rounded" />
        </div>
      </div>

      <div class="border p-2 mt-2 flex flex-col  rounded">
        <div>使用语言</div>
        <div class="action mt-2 flex">
          <select @change="changeLanguage" v-model="store.userInfo.config.language" class=" input rounded">
            <option v-for="l, i in languageList" :key="l" :value="i">
              {{ l.name }}
            </option>
          </select>
        </div>
      </div>

      <div class=" p-2 mt-2 flex">
        <div @click="saveUserConfig"
          class="border bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded py-1 px-4">保存
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from '../../api/api';
import { appStore } from "../../store/appStore";
export default {
  name: "Setting",
  setup() {
    const store = appStore();
    return { store };
  },
  methods: {
    uploadAvatar() {
      var _this = this;
      const preview = this.$refs.avatarImg as HTMLImageElement;
      const file = this.$refs.avatarRef.files[0];
      console.log(file);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        preview.src = reader.result;
      }, false);
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
    saveUserConfig() {
      var _store = this.store;
      var _this = this;
      api.post("user/saveConfig", {
        ...this.store.userInfo.config,
        ...{
          allow_anon_session: +this.store.userInfo.config.allow_anon_session,
          allow_search: +this.store.userInfo.config.allow_search,
          all_multiple_accounts_login: +this.store.userInfo.config.all_multiple_accounts_login,
          add_contact_type: +this.store.userInfo.config.add_contact_type
        }
      }).then((res) => {
        if (res.code == 0) {
          this.success("保存用户信息成功")
          _store.syncUserInfo();
        } else {
          this.error("保存用户信息失败")
        }

      });
    },
    saveUserInfo() {
      var _store = this.store;
      var _this = this;
      api.post("user/save", {
        ...this.store.userInfo.user,
        ...{
          allow_search: +this.store.userInfo.user.allow_search,
          allow_anon_session: +this.store.userInfo.config.allow_anon_session,
        }
      }).then((res) => {
        if (res.code == 0) {
          this.success("保存用户信息成功")
          _store.syncUserInfo();
        } else {
          this.error("保存用户信息失败")
        }

      });
    },
    changeLanguage(i) {
      this.$i18n.locale = this.store.config.language;
    },
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
