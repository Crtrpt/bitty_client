<template>
    <div>
        <div v-for="m in list" :key="m">
            <div class="border p-4 my-4 flex flex-col w-1/2">
                <div>
                    {{ m.content }}
                </div>
                <div class="action mt-5 flex text-xs flex-row-reverse text-white">
                    <template v-if="m.type==0 && this.store.userInfo.user.user_id==m.target_id">
                                         <div class="
              rounded
              cursor-pointer
              whitespace-nowrap
              px-2
              py-1
              mx-2
              bg-blue-400
            ">
                        同意
                    </div>
                    <div class="
              rounded
              cursor-pointer
              whitespace-nowrap
              px-2
              py-1
              mx-2
              bg-blue-400
            ">
                        拒绝
                    </div>

                     <div class="
              rounded
              cursor-pointer
              whitespace-nowrap
              px-2
              py-1
              mx-2
              bg-blue-400
            ">
                        忽略
                    </div>
                    </template>
                    <div class="
              rounded
              cursor-pointer
              whitespace-nowrap
              px-2
              py-1
              mx-2
              bg-blue-400
            " v-if="m.type==1 && this.store.userInfo.user.user_id==m.source_id">
                        撤回
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from "../../store/appStore";
export default {
    name: "UnreadMessage",
    methods: {
        unreadMessage() {
            var _store = this.store;
            var _this = this;
            api
                .get("msg/unreadMessage", {
                    user_id: this.store.userInfo.user.user_id
                })
                .then((res) => {
                    _this.list = res.data;
                });
        },
    },
    mounted() {
        this.unreadMessage();
    },
    setup() {
        const store = appStore();

        return {
            store,
        };
    },
    data() {
        return {
            list: [],
        };
    },
};
</script>