<template>
    <div class="w-80 bg-gray-100 border-r flex-shrink-0">
        <div class="px-2 h-12 text-base  bg-gray-50 border-b text-gray-500 flex  justify-between items-center">

            <div class="flex justify-center items-center">
                <font-awesome-icon class="w-5  px-2 text-gray-500 cursor-pointer hover:text-gray-800" icon="user" />
                <div>联系人</div>
                <div>({{ store.sessionList.size||0 }})</div>
            </div>

            <div class="flex justify-center">
                <!-- <font-awesome-icon @click="
                    () => {
                        $router.push({ path: '/search' });
                    }
                " class="w-3 h-3 m-1 p-2 rounded-full border hover:border-blue-500 hover:text-blue-500 cursor-pointer text-gray-500"
                    icon="add" /> -->
                <font-awesome-icon @click="() => displaySearch = !displaySearch"
                    class="w-3 h-3 m-1 p-2 rounded-full border hover:border-blue-500 hover:text-blue-500 cursor-pointer text-gray-500"
                    icon="search" />
            </div>
        </div>
        <ContactSearch v-if="displaySearch" :kewords="kewords" class="h-12"></ContactSearch>
        <div v-for="i in store.contactList" :key="i" class="flex hover:bg-gray-200" @click="
            () => {
                store.setContact(i);
                $router.push({ path: '/contact/' + i.user.user_id + '/profile' });
            }
        ">
            <div class="cell p-2 flex flex-grow cursor-pointer justify-center items-center">
                <div :style="{
                    backgroundImage: 'url(' + i.user?.avatar + ')',
                    backgroundSize: 'cover',
                }" class="rounded-full w-8 h-8 flex-grow-0 flex-shrink-0" :src="i.user?.avatar || ''" @click="
    () => {
        $router.push({ path: '/user/profile' });
    }
"></div>
                <div class="mx-2 flex-grow overflow-hidden flex-shrink">
                    <div class="text-base">{{ i.user?.nick_name }}</div>
                    <div class="text-xs text-gray-400 whitespace-nowrap w-0 h-4">
                        {{ i.user?.status || "" }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ContactSearch from "./ContactSearch.vue";
import { appStore } from "../../store/appStore";
import api from "../../api/api";
export default {
    name: "ContactList",
    data() {
        return {
            keywords: "",
            displaySearch: false,
        };
    },
    setup() {
        const store = appStore();
        return { store };
    },
    mounted() {
        console.log("加载");
        var _this = this;

    },
    components: { ContactSearch },
};
</script>
