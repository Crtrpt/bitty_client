<template>
    <div class="w-80 bg-gray-100 border-r flex-shrink-0">
        <ContactSearch :data="keywords" class="h-12"></ContactSearch>
        <div v-for="i in store.contactList" :key="i" class="flex hover:bg-gray-200" @click="
            () => {
                store.setContact(i);
                $router.push({ path: '/contact/' + i.user.user_id + '/profile' });
            }
        ">
            <div class="cell p-2 flex flex-grow cursor-pointer justify-center items-center">
                <img class="rounded-full w-8 h-8 flex-grow-0 flex-shrink-0" :src="i.user?.avatar || ''" @click="
                    () => {
                        $router.push({ path: '/user/profile' });
                    }
                " />
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
