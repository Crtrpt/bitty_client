<template>

    <div class="container mx-auto flex flex-col">
        <div class="flex items-baseline sticky">
            <div class="text-3xl mt-10 px-2 pb-5 w-full">
                虚拟账户
            </div>
        </div>
        <div class="px-2 flex-grow overflow-auto md:w-1/2 text-sm">
            <div class=" p-2 mt-2 flex">
                <Bdialog :title="'创建虚拟账户'" v-model="display" :okTitle="'创建'" @ok="createAccount" @cancel="() => {
                    display = false
                }">
                    <div class="p-2 ">

                        <div class="block m-1">
                            <input class="rounded input text-sm w-full" placeholder="账户" type="text"
                                v-model="form.account" />
                        </div>
                        <div class="block m-1">
                            <input class="rounded input text-sm w-full" placeholder="昵称" type="text"
                                v-model="form.nick_name" />
                        </div>
                    </div>
                </Bdialog>
                <div @click="() => {
                    display = true;
                }" class="border bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded py-1 px-4">创建
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import api from '../../api/api';
import { appStore } from "../../store/appStore";
import Bdialog from '../../components/Bdialog.vue';
export default {
    name: "VirtualAccount",
    setup() {
        const store = appStore();
        return { store };
    },
    methods: {
        createAccount() {
            api.post("account/create", this.form).then(res => {

            })
        }
    },
    data() {
        return {
            form: {
                account: "",
                nick_name: "",
            },
            display: false,
            languageList: [
                {
                    code: "en",
                    name: "English",
                },
                {
                    code: "zh",
                    name: "中文",
                },
            ],
        };
    },
    components: { Bdialog }
};
</script>
