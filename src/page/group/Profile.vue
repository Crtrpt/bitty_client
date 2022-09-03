<template>
    <div class="container mx-auto">
        <div class="text-3xl mt-10 px-4">
            {{ $t("group_profile") }}
        </div>
        <div class="w-full mx-auto flex justify-center items-center mt-4">
            <div class="ml-20 flex flex-col">
                <div class="flex ">

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
                        <div class="text-xs mt-4 text-gray-500  overflow-hidden">
                            创建于: {{ data.created_at || "" }}
                        </div>
                        <!-- <div class="text-xs text-gray-500  overflow-hidden">
                            成员数量: ({{ data.member_count || 0 }})
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 flex items-center justify-center mt-4">
            <div class="px-4 py-2 border rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
                @click="createSession('chat')">
                进入群组
            </div>

            <div v-if="data.owner_user_id == store.userInfo.user.user_id"
                class="px-4 py-2 border rounded text-blue-500 mx-2 cursor-pointer hover:text-red-500" @click="() => {
                    $router.push({
                        path: 'setting/base'
                    })
                }">
                设置
            </div>
            <div class="px-4 py-2 border rounded text-blue-500 mx-2 cursor-pointer hover:text-red-500" @click="() => {
                $router.push({
                    path: 'setting/group_users'
                })
            }">
                群成员
            </div>

            <ContactSelect :open="openContactSelect" :groupId="$route.params.id"
                @close="() => openContactSelect = false">
            </ContactSelect>
            <div class=" px-4 py-2 border rounded text-blue-500 mx-2 cursor-pointer hover:text-red-500" @click="() => {
                openContactSelect = true
            }">
                邀请好友
            </div>

            <div v-if="data.owner_user_id != store.userInfo.user.user_id"
                class="px-4 py-2 border rounded text-red-500 bg-white cursor-pointer hover:text-red-600"
                @click="exitGroup()">
                退出
            </div>

            <div v-if="data.owner_user_id == store.userInfo.user.user_id"
                class="px-4 py-2 border rounded text-red-500 mx-2 cursor-pointer hover:text-red-500" @click="remove">
                删除
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import api from "../../api/api";
import { appStore } from "../../store/appStore";
import ContactSelect from './ContactSelect.vue';


export default {
    components: { ContactSelect },
    data() {
        return {
            openContactSelect: false,
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
        selectContact(payload) {
            this.openContactSelect = false;
        },
        fetchGroupInfo() {
            api
                .get("group/profile", { group_id: this.$route.params.id })
                .then((res) => {
                    this.data = res.data;
                });
        },
        exitGroup() {
            api
                .post("group/user/remove", {
                    user_id: this.store.userInfo.user.user_id,
                    group_id: this.$route.params.id
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.success("退出成功");
                        this.store.fetchGroupList();
                    }
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
            api
                .post("session/create", {
                    user_id: this.store.userInfo.user.user_id,
                    target_id: this.$route.params.id,
                    type: "group",
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.store.fetchSessionList();
                        this.$router.push({
                            path: "/session/" + this.data.session_id + "/" + "chat",
                        });
                    }
                })

        },
    },
    created() {
        this.fetchGroupInfo();
    },
};
</script>
