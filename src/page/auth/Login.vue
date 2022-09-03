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
          <input type="checkbox" class="input  rounded" v-model="form.agreement" />

          <div class="ml-4 text-sm">
            {{ $t("i_agree") }}
            <router-link :to="{ name: 'agreement' }" class="underline">
              {{ $t("agreement") }}</router-link>
          </div>
        </div>


        <div class="flex mt-2 items-center text-sm">
          <input type="checkbox" v-model="form.remember_account" class="input rounded" />
          <div class="ml-4">
            {{ $t("remember_account") }}
          </div>
        </div>
      </div>
      <div class="block">
        <div class="flex mt-2">
          <div @click="login"
            class=" transition-all border p-2 px-5 rounded bg-blue-500  text-white border-blue-500  hover:bg-blue-600 hover:border-blue-600 cursor-pointer">

            {{ $t("login_btn") }}
            <font-awesome-icon v-if="processing" class="animate-spin w-5 h-3  text-white" icon=" fa-solid fa-spinner">
            </font-awesome-icon>
          </div>
          <div v-if="store?.sysInfo?.conf.allow_signup ?? false" @click="
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
    const store = appStore();
    return {
      store,
    };
  },
  watch: {
    'form': {
      deep: true,
      handler(n: any) {
        if (n.remember_account == true) {
          window.localStorage.remember_account = this.form.account;
        } else {
          window.localStorage.removeItem('remember_account');
        }
      }
    }
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
      this.processing = true;
      api.post("auth/login", this.form).then((res) => {
        this.processing = false;
        if (res.code == 0) {
          _this.setLogin(res.data);
          api.headers["Token"] = res.data.token;
          _this.$router.push({
            path: "account/profile",
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
  mounted() {
    this.form.account = window.localStorage.remember_account;
    this.form.remember_account = !!this.form.account
  },
  data() {
    return {
      processing: false,
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
