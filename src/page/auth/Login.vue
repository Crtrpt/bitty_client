<template>
  <div class="container m-auto flex flex-col items-center justify-center h-screen">
    <div class="w-80">
      <div class="text-3xl mb-5">{{ $t("login_account") }}</div>
      <label class="block">
        <span class="text-gray-700"> {{ $t("account") }}</span>
        <input type="text" v-model="form.account" class="mt-1 block w-full rounded-md border-gray-300"
          :placeholder="$t('account_placeholder')" />
      </label>
      <label class="block">
        <span class="text-gray-700">{{ $t("password") }}</span>
        <input type="password" v-model="form.password" :placeholder="$t('password_placeholder')"
          class="mt-1 block w-full rounded-md border-gray-300" />
      </label>
      <div class="block">
        <div class="flex mt-2 items-center">
          <input type="checkbox" class="input" v-model="form.agreement" />

          <div class="ml-4 text-sm">
            {{ $t("i_agree") }}
            <router-link :to="{ name: 'agreement' }" class="underline">
              {{ $t("agreement") }}</router-link>
          </div>
        </div>


        <div class="flex mt-2 items-center text-sm">
          <input type="checkbox" v-model="form.remember_account" />
          <div class="ml-4">
            {{ $t("remember_account") }}
          </div>
        </div>
      </div>


      <div class="block">
        <div class="flex mt-2">
          <div @click="login"
            class="border p-2 px-5 rounded bg-blue-600 hover:bg-blue-700 text-white border-gray-300 hover:border-indigo-300 cursor-pointer">
            {{ $t("login_btn") }}
          </div>

          <div @click="
            () => {
              $router.push({
                path: 'signup',
              });
            }
          "
            class="border ml-2 p-2 px-5 rounded text-blue-600 hover:text-blue-700 bg-white border-gray-300 hover:border-indigo-300 cursor-pointer">
            {{ $t("go_signup") }}
          </div>
        </div>
      </div>
      <div class="block">
        <div class="flex mt-2 items-center text-sm">
          {{ $t("forgot_password") }}
          <router-link :to="{ name: 'reset_password' }" class="pl-2 underline">
            {{ $t("reset_password") }}</router-link>
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
      if (this.form.account == "") {
        this.error("账户不能为空");
        return;
      }
      if (!this.form.agreement) {
        this.alert("需要同意许可协议才能继续", { type: "error" });
        return;
      }
      api.post("auth/login", this.form).then((res) => {
        if (res.code == 0) {
          _this.setLogin(res.data);
          api.headers["Token"] = res.data.token;
          _this.$router.push({
            path: "my/profile",
          });
        }
        else {
          this.alert(res.msg, { type: "error" });
        }
      });
    },
    getCode() {
      api.post("auth/sendcode", {
        account: this.form.account,
        email: this.form.email
      }).then((res) => {
        if (res.code == 0) {
          this.alert("验证码已发送请查收");
        }
        else {
          this.alert(res.msg);
        }
      });
    },
  },
  mounted() { },
  data() {
    return {
      displayDiglog: true,
      form: {
        account: "",
        password: "",
        agreement: 0,
      },
    };
  },
};
</script>
