<template>
    <div class="flex flex-col-reverse ">
        <div class="mx-2">
            <!-- 发送中 -->
            <font-awesome-icon v-if="data.send_type == 0"
                class="animate-spin w-5 h-3 hover:text-gray-600 cursor-pointer text-gray-500"
                icon=" fa-solid fa-spinner">
            </font-awesome-icon>
            <!-- 失败 -->
            <font-awesome-icon v-if="data.send_type == 10"
                class="w-5 h-3 hover:text-red-600 cursor-pointer text-red-500" icon="fa-solid fa-circle-exclamation">
            </font-awesome-icon>
            <!-- 超时 -->
            <font-awesome-icon v-if="data.send_type == 20"
                class="w-5 h-3 hover:text-yellow-600 cursor-pointer text-yellow-500" icon="clock">

            </font-awesome-icon>
            <!-- 发送成功 -->
            <font-awesome-icon v-if="data.send_type == 40"
                class="w-5 h-3 hover:text-green-600 cursor-pointer text-green-500" icon="check" />
        </div>
    </div>
</template>

<script lang="ts">
import { appStore } from '../../store/appStore';


export default {
    name: "MessageStatus",
    setup() {
        const store = appStore();
        return { store };
    },
    props: {
        data: Object
    },
    components: {}
};
</script>