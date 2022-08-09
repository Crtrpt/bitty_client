<template>
  <div
    class="container m-auto flex flex-col items-center justify-center h-screen"
  >
    <div class="w-80">
      <div class="text-3xl mb-5">登录账户</div>
      <label class="block">
        <span class="text-gray-700"> {{ $t("account") }}</span>
        <input
          type="text"
          v-model="form.account"
          class="mt-1 block w-full rounded-md border-gray-300"
          placeholder="账户"
        />
      </label>
      <label class="block">
        <span class="text-gray-700">{{ $t("password") }}</span>
        <input
          type="password"
          v-model="form.password"
          placeholder="密码"
          class="mt-1 block w-full rounded-md border-gray-300"
        />
      </label>
      <div class="block">
        <div class="flex mt-2 items-center">
          <input type="checkbox" v-model="form.agreement" />

          <div class="ml-4">
            我同意
            <router-link :to="{ name: 'agreement' }" class="underline"
              >许可协议</router-link
            >
          </div>
        </div>
      </div>

      <div class="block">
        <div class="flex mt-2">
          <div
            @click="login"
            class="border p-2 px-5 rounded bg-blue-600 hover:bg-blue-700 text-white border-gray-300 hover:border-indigo-300 cursor-pointer"
          >
            {{ $t("login_btn") }}
          </div>

          <div
            @click="
              () => {
                $router.push({
                  path: 'signup',
                });
              }
            "
            class="border ml-2 p-2 px-5 rounded text-blue-600 hover:text-blue-700 bg-white border-gray-300 hover:border-indigo-300 cursor-pointer"
          >
            去注册
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { appStore } from "../../store/appStore";
import { mapActions } from "pinia";
import api from "../../api/api";

export default {
  name: "Login",
  setup() {
    const appstore = appStore();
    return {
      appStore,
    };
  },
  methods: {
    ...mapActions(appStore, ["setLogin"]),
    login() {
      let _this = this;
      if (!this.form.agreement) {
        alert("需要同意许可协议才能继续");
        return;
      }
      api.post("auth/login", this.form).then((res) => {
        if (res.code == 0) {
          _this.setLogin(res.data);
          _this.$router.push({
            path: "my/profile",
          });
        }
      });
    },
  },
  mounted() {},
  data() {
    return {
      form: {
        account: "",
        password: "",
        agreement: 0,
      },
    };
  },
};
</script>
