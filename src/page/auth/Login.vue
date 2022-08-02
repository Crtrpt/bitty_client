<template>
  <div class="container m-auto flex items-center justify-center h-screen">
    <div class="w-1/4">
      <label class="block">
        <span class="text-gray-700"> {{ $t("account") }}</span>
        <input
          type="text"
          v-model="form.account"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder=""
        />
      </label>
      <label class="block">
        <span class="text-gray-700">{{ $t("password") }}</span>
        <input
          type="password"
          v-model="form.password"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <div class="block">
        <div class="flex mt-2">
          <div
            @click="login"
            class="border p-2 px-5 rounded bg-blue-600 hover:bg-blue-700 text-white border-gray-300 hover:border-indigo-300 cursor-pointer"
          >
            {{ $t("login_btn") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { appStore } from "../../store/appStore";
import { mapActions } from "pinia";
import api from '../../api/api';

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
      let _this=this;
      api.post("auth/login",this.form).then((res)=>{
        if(res.code==0){
          _this.setLogin(res.data);
          _this.$router.push({
            path:"my/profile"
          });
        }
      })
      
    },
  },
  mounted() {},
  data() {
    return {
      form:{
        account:"",
        password:""
      }
    };
  },
};
</script>
