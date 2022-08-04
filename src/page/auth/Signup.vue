<template>

  <div class="container m-auto flex items-center justify-center h-screen">
    <div class="w-80">
      <label class="block">
        <span class="text-gray-700"> {{ $t("account") }}</span>
        <input type="text" v-model="form.account"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="" />
      </label>
      <label class="block">
        <span class="text-gray-700">{{ $t("password") }}</span>
        <input type="password" v-model="form.password"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">{{ $t("email") }}</span>
        <input v-model="form.email" type="email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <div class="block">
        <div class="flex mt-2 items-center">
          <input type="checkbox" v-model="form.agreement" />

           <div class="ml-4">我同意

            <a  href="/agreement.txt" class="underline">许可协议</a>
          </div>
        </div>
      </div>
      <div class="block">
        <div class="flex mt-2">
          <div @click="signup"
            class="border p-2 px-5 rounded bg-blue-600 hover:bg-blue-700 text-white border-gray-300 hover:border-indigo-300 cursor-pointer">
            {{ $t("signup_btn") }}
          </div>

          <div @click='() => {
            $router.push({
              path: "login"
            })
          }'
            class="border ml-2 p-2 px-5 rounded text-blue-600 hover:text-blue-700 bg-white border-gray-300 hover:border-indigo-300 cursor-pointer">
            去登陆
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from '../../api/api';
export default {
  name: "Signup",
  methods: {

    signup() {
      let _this = this;
      if (!this.form.agreement) {
        alert("需要同意许可协议才能继续")
        return;
      }
      api.post("auth/signup", this.form).then((res) => {
        if (res.code == 0) {
          _this.$router.push({
            name: "login"
          });
        } else {
          alert(res.msg);
        }
      })
    }
  },
  mounted() {

  },
  data() {
    return {
      form: {
        account: "",
        password: "",
        email: "",
      }
    };
  },
};
</script>
