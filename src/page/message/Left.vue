<template>
    <div class="sm:w-60 md:w-80 flex flex-col bg-gray-100 border-r flex-shrink-0">
        <div
            class=" flex-shrink-0 px-2 h-12 text-base  bg-gray-50 border-b text-gray-500 flex  justify-between items-center">

            <div class="flex justify-center items-center">
                <font-awesome-icon class="w-5  px-2 text-gray-500 cursor-pointer hover:text-gray-800" icon="bell" />
                <div>消息中心</div>
                <div></div>
            </div>


        </div>

        <div class="flex-grow overflow-x-auto">
            <div class="flex flex-col " :class="{}">
                <router-link :to="{ path: '/message/unread' }"
                    class="h-14 hover:bg-gray-200 cursor-pointer flex  items-center">
                    <font-awesome-icon class="w-5  px-2 text-gray-500 cursor-pointer hover:text-gray-800" icon="list" />
                    <div>未读消息</div>
                </router-link>
                <router-link :to="{ path: '/message/all' }"
                    class="h-14 hover:bg-gray-200 cursor-pointer flex  items-center">
                    <font-awesome-icon class="w-5  px-2 text-gray-500 cursor-pointer hover:text-gray-800"
                        icon="list-check" />
                    <div>全部消息</div>
                </router-link>


            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { appStore } from "../../store/appStore";

export default {
    name: "Left",
    setup() {
        const store = appStore();
        return { store };
    },
    data() {
        return {
            kewords: "",
            displaySearch: false,
            list: [],
        };
    },
    mounted() { },
    components: {},
};
</script>
