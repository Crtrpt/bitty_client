<template>
    <div class="container mx-auto">
        <div class="text-3xl mt-10 px-4">
            {{ $t("contact_profile") }}
        </div>
        <div class="w-full mx-auto flex justify-center items-center mt-4">
            <div class="ml-20 flex flex-col">
                <div class="flex items-center">

                    <div :style="{
                        backgroundImage: 'url(' + data.avatar + ')',
                        backgroundSize: 'cover',
                    }" class="rounded-full w-16 h-16 hover:shadow-md flex-grow-0 flex-shrink-0" @click="() => {
    $router.push({ path: '/user/profile' });
}">
                    </div>

                    <div class=" ml-10 w-80">
                        <div class="text-xl">
                            {{ data.nick_name || "" }}
                        </div>
                        <div class="text-sm text-gray-500 h-10 overflow-hidden">
                            {{ data.status || "" }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 flex items-center justify-center mt-4">
            <div class="px-4 py-2 border rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
                @click="createSession('chat')">
                发起聊天
            </div>

            <div class="px-4 py-2 border rounded text-blue-500 mx-2 cursor-pointer hover:text-red-500" @click="() => {
                $router.push({
                    path: 'setting'
                })
            }">
                设置
            </div>

            <div class="px-4 py-2 border rounded text-red-500 mx-2 cursor-pointer hover:text-red-500" @click="remove">
                删除
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Profile from "../user/Profile.vue";
import api from "../../api/api";
import { appStore } from "../../store/appStore";
export default {
    data() {
        return {
            data: {},
            contact: {},
        };
    },
    setup() {
        const store = appStore();
        return { store };
    },
    name: "ContactProfile",
    watch: {
        $router: {
            deep: true,
            handler(n, o) {
                this.fetchUserInfo();
            },
        },
    },
    methods: {
        fetchUserInfo() {
            api
                .get("user/profile", { user_id: this.$route.params.id })
                .then((res) => {
                    this.data = res.data;
                    this.fetchContactInfo();
                });
        },
        remove() {
            api
                .post("contact/remove", {
                    user_id: this.store.userInfo.user.user_id,
                    target_id: this.$route.params.id,
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.alert("删除成功");
                    }
                });
        },
        createSession(type: string) {
            var _this = this;
            api
                .post("session/create", {
                    user_id: this.store.userInfo.user.user_id,
                    target_id: this.$route.params.id,
                    type: "chat",
                })
                .then((res) => {
                    if (res.code == 0) {
                        _this.$router.push({
                            path: "/session/" + res.data.session_id + "/" + "chat",
                        });
                    }
                });
        },
        fetchContactInfo() {
            api
                .get("contact/info", {
                    user_id: this.store.userInfo.user.user_id,
                    target_id: this.$route.params.id,
                })
                .then((res) => {
                    this.contact = res.data;
                });
        },
    },
    created() {
        this.fetchUserInfo();
    },
    components: { Profile },
};
</script>
