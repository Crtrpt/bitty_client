<template>
  <div class="container m-auto flex flex-col items-center justify-center h-screen">
    <div class="w-80">
      <div class="text-3xl mb-5">{{ $t("reset_password") }}</div>
      <label class="block">
        <span class="text-gray-700"> {{ $t("account") }}</span>
        <input type="text" v-model="form.account" class="mt-1 block w-full rounded-md border-gray-300"
          :placeholder="$t('account_placeholder')" />
      </label>
      <label class="block">
        <span class="text-gray-700">{{ $t("email") }}</span>
        <input v-model="form.email" type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          :placeholder="$t('email_placeholder')" />
      </label>
      <div class="block">
        <div class="flex mt-2">
          <div @click="getCode"
            class="border p-2 px-5 rounded bg-blue-600 hover:bg-blue-700 text-white border-gray-300 hover:border-indigo-300 cursor-pointer">
            {{ $t("get_code") }}
          </div>
        </div>
      </div>

      <label class="block">
        <span class="text-gray-700">{{ $t("code") }}</span>
        <input v-model="form.code" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          :placeholder="$t('code_placeholder')" />
      </label>

      <label class="block">
        <span class="text-gray-700">{{ $t("password") }}</span>
        <input type="password" v-model="form.password" :placeholder="$t('password_placeholder')"
          class="mt-1 block w-full rounded-md border-gray-300" />
      </label>

      <div class="block">
        <div class="flex mt-2">
          <div @click="reset"
            class="border p-2 px-5 rounded bg-blue-600 hover:bg-blue-700 text-white border-gray-300 hover:border-indigo-300 cursor-pointer">
            {{ $t("confirm_reset_password") }}
          </div>

          <div @click="
            () => {
              $router.push({
                path: 'login',
              });
            }
          "
            class="border ml-2 p-2 px-5 rounded text-blue-600 hover:text-blue-700 bg-white border-gray-300 hover:border-indigo-300 cursor-pointer">
            {{ $t("go_login") }}
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
  name: "ResetPassword",
  setup() {
    const appstore = appStore();
    return {
      appStore,
    };
  },
  methods: {
    ...mapActions(appStore, ["setLogin"]),
    getCode() {
      api.post("auth/sendcode", {
        account: this.form.account,
        email: this.form.email
      }).then((res) => {
        if (res.code == 0) {
          alert("验证码已发送请查收")
        } else {
          alert(res.msg)
        }
      });
    },
    reset() {
      let _this = this;

      api.post("auth/resetpassword", this.form).then((res) => {
        if (res.code == 0) {
          alert("重置秘密成功")
        }
      });
    },
  },
  mounted() { },
  data() {
    return {
      form: {
        account: "",
        email: "",
        code: "",
        password: "",
      },
    };
  },
};
</script>
