<template>
    <div class="container mx-auto relative">
        <div class="text-3xl mt-10 px-4 mb-5">{{ $t("profile") }}</div>
        <div class=" absolute top-0 w-full h-full flex justify-center items-center ">

            <div class="flex items-start">
                <div
                    class="hover:shadow-xl flex justify-center items-center shadow border-8 border-white rounded-full relative flex-shrink-0">
                    <img class="w-20 h-20 rounded-full" :src="store.userInfo.user.avatar" ref="avatarImg"
                        v-if="store.userInfo.user.avatar" />
                    <div class="w-20 h-20 rounded-full flex justify-center items-center"
                        v-if="!store.userInfo.user.avatar">
                        <div class="text-5xl text-gray-700">
                            {{ store.userInfo.user.nick_name[0] }}
                        </div>
                    </div>
                    <input type="file" class="absolute w-20 h-20 top-0 opacity-0" ref="avatarRef"
                        @change="uploadAvatar" />
                </div>
                <div class="ml-10 flex flex-col w-80">

                    <div class="flex items-baseline">
                        <div class="text-xl py-1 text-gray-500 outline-none">
                            {{ store.userInfo.user.nick_name }}
                        </div>
                        <div class="text-xs py-1 pl-2 text-gray-500 outline-none">
                            {{ store.userInfo.user.email }}
                        </div>
                    </div>
                    <div class="text-xs text-gray-400 outline-none rounded py-1" @click="() => (editale = true)">
                        {{ store.userInfo.user.status }}
                    </div>


                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from "../../store/appStore";
import Bswitch from "../../components/Bswitch.vue";

export default {
    name: "UserProfile",
    data() {
        return {
            editale: false,
        };
    },
    methods: {


    },
    setup() {
        const store = appStore();
        return {
            store,
        };
    },
    components: { Bswitch }
};
</script>
