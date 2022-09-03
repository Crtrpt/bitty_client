<template>
    <div class="border p-4 my-4 flex flex-col justify-start items-start md:w-1/2 hover:shadow rounded">

        <div class="pb-3 flex w-full  items-stretch ">
            <div class="flex-grow">{{ m.content }}</div>
            <div class="text-xs  text-gray-500">{{ prttyDate(m.created_at) }}</div>
        </div>

        <div class="border p-1 px-2 rounded text-xs" v-if="m.status == 1">
            {{ m.result_payload }}
        </div>

        <template v-if="m.status == 0">
            <!-- //未处理  -->
            <div class="action  flex text-xs flex-row-reverse w-full">
                <template v-if="m.source_id != store.userInfo.user.user_id">
                    <div class="rounded cursor-pointer whitespace-nowrap px-2 py-1 mx-2 bg-blue-500 hover:bg-blue-600 text-white"
                        @click="action(m, 0)">
                        同意
                    </div>
                    <div v-if="m.source_id != store.userInfo.user.user_id" @click="action(m, 1)"
                        class="rounded cursor-pointer whitespace-nowrap px-2 py-1 mx-2 bg-blue-400 hover:bg-blue-500 text-white">
                        拒绝
                    </div>
                </template>

                <template v-else>
                    <div v-if="m.source_id == store.userInfo.user.user_id" @click="action(m, -1)"
                        class="rounded cursor-pointer whitespace-nowrap px-2 py-1 mx-2 bg-blue-400 text-white">
                        撤回
                    </div>
                </template>
            </div>
        </template>
        <template v-else>
            <!-- 已处理 -->
        </template>

    </div>
</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from "../../store/appStore";

export default {
    name: "MessageItem",
    props: {
        m: Object,
    },
    methods: {
        action(m: any, ops: any) {
            api.post("msg/action", {
                id: m.id,
                type: m.type,
                action: ops,
            }).then(res => {
                if (res.code == 0) {
                    this.info("操作成功")
                } else {
                    this.error(res.msg);
                }
                this.$emit("update")
            })
        },
    },
    setup() {
        const store = appStore();

        return {
            store,
        };
    },
};
</script>
