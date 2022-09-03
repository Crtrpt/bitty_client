<template>
    <div class="container mx-auto">
        <div class="text-3xl mt-10 px-4">
            群成员({{ list.length }})
        </div>
        <div class="mx-4 flex  flex-col  mt-4 overflow-auto  ">
            <!-- 
            <div class="my-1">
                <div class="flex text-xs">
                    <input v-model="keywords" class="border mx-1 p-1 ml-0  outline-none" />
                    <div class=" rounded border px-2 py-1 mx-1 cursor-pointer border-red-500 text-red-500"
                        @click="removeSelect">
                        删除
                    </div>


                    <div class=" rounded border px-2 py-1 mx-1 cursor-pointer border-yellow-500 text-yellow-500"
                        @click="banSelect">
                        禁言
                    </div>
                </div>
            </div> -->
            <div v-for=" u in list" :key="u" class="flex my-2 items-center">
                <!-- <div>
                    <input type="checkbox" v-model="u._select" />
                </div> -->
                <div>
                    <Avatar :user_id=u.user_id></Avatar>
                </div>
                <div class="  rounded">
                    <select class="input rounded text-sm p-1 mx-2  w-32" v-model="u.type">
                        <option value="0">群主</option>
                        <option value="1">管理员</option>
                        <option value="2">普通成员</option>
                    </select>
                </div>
                <div class=" border rounded">
                    <input v-model="u.name" class="p-1" placeholder="群内备注名称" />
                </div>
                <div class="p-1 w-20 text-xs text-gray-500">
                    {{ prttyDate(u.created_at) || "" }}
                </div>

                <div class="flex text-xs">
                    <div class=" cursor-pointer border rounded px-2 py-1 mx-1 border-blue-500 text-blue-500"
                        @click="save(u)">保存</div>
                    <div class="cursor-pointer border rounded px-2 py-1 mx-1 border-red-500 text-red-500"
                        @click="remove(u.user_id)">删除
                    </div>
                    <!-- <div class="cursor-pointer border rounded px-2 py-1 mx-1 border-yellow-500 text-yellow-500"
                        @click="ban(u.user_id)">禁言
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import api from "../../api/api";
import { appStore } from "../../store/appStore";
import Avatar from "../../components/Avatar.vue";
export default {
    data() {
        return {
            data: {},
            list: [],
            contact: {},
        };
    },
    setup() {
        const store = appStore();
        return { store };
    },
    name: "GroupUsers",
    watch: {
        $router: {
            deep: true,
            handler(n, o) {
                this.fetchGroupMembers();
            },
        },
    },
    methods: {
        save(u: any) {
            api
                .post("group/user/save", u)
                .then((res) => {
                    if (res.code == 0) {
                        this.success("保存成员信息成功")
                    } else {
                        this.error(res.msg)
                    }
                });
        },
        remove(e: any) {
            api
                .post("group/user/remove", {
                    group_id: this.$route.params.id,
                    user_id: e
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.success("保存成员信息成功")
                    } else {
                        this.error(res.msg)
                    }
                });
        },
        ban(e: any) {
            api
                .post("group/user/ban", {
                    group_id: this.$route.params.id,
                    user_id: e
                })
                .then((res) => {
                    if (res.code == 0) {
                        this.success("保存成员信息成功")
                    } else {
                        this.error(res.msg)
                    }
                });
        },
        removeSelect() {

        },
        banSelect() {

        },
        fetchGroupMembers() {
            api
                .get("group/users", { group_id: this.$route.params.id })
                .then((res) => {
                    this.list = res.data;
                });
        },
    },
    created() {
        this.fetchGroupMembers();
    },
    components: { Avatar }
};
</script>