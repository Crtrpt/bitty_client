<template>
    <div class="container mx-auto">
        <div class="text-3xl mt-10 px-4">
            {{ $t("group_profile") }}
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
                            {{ data.name || "" }}
                        </div>
                        <div class="text-sm text-gray-500 h-10 overflow-hidden">
                            {{ data.description || "" }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 flex items-center justify-center mt-4">
            <div class="px-4 py-2 border rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
                @click="createSession('chat')">
                进入群组
            </div>

            <div class="px-4 py-2 border rounded text-blue-500 mx-2 cursor-pointer hover:text-red-500" @click="remove">
                删除
            </div>
        </div>
    </div>
</template>

<script lang="ts">

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
    name: "GroupProfile",
    watch: {
        $router: {
            deep: true,
            handler(n, o) {
                this.fetchGroupInfo();
            },
        },
    },
    methods: {
        fetchGroupInfo() {
            api
                .get("group/profile", { group_id: this.$route.params.id })
                .then((res) => {
                    this.data = res.data;
                });
        },
        remove() {
            api
                .post("group/remove", {
                    group_id: this.$route.params.id
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.success("删除成功");
                        this.store.fetchGroupList();
                    }
                });
        },
        createSession(type: string) {
            var _this = this;
            _this.$router.push({
                path: "/session/" + this.data.session_id + "/" + "chat",
            });
        },
        // fetchGroupInfo() {
        //     api
        //         .get("group/info", {
        //             user_id: this.store.userInfo.user.user_id,
        //             target_id: this.$route.params.id,
        //         })
        //         .then((res) => {
        //             this.contact = res.data;
        //         });
        // },
    },
    created() {
        this.fetchGroupInfo();
    },
};
</script>
