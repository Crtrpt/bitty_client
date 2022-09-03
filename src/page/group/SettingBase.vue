<template>
    <div class="container mx-auto">
        <div class="text-3xl mt-10 px-4">
            基本信息
        </div>

        <div class="mx-4 flex  flex-col  mt-4  ">
            <div>
                <div
                    class="w-20 h-20   hover:shadow-xl flex justify-center items-center shadow border-8 border-white rounded-full relative flex-shrink-0">
                    <img class=" w-full h-full rounded-full absolute" ref="groupAvatarImg" :src="form?.avatar" />
                    <div class="w-20 h-20 rounded-full flex justify-center items-center" v-if="!form.avatar">
                        <div class="text-5xl text-gray-700">
                            <!-- {{ form?.name[0] || '' }} -->
                        </div>
                    </div>
                    <div class=" text-gray-500 absolute top-0 w-full h-full flex items-center  justify-center  "
                        v-if="!form.avatar && !form.name">
                        <div>选择头像</div>
                    </div>
                    <input type="file" class="absolute w-20 h-20 top-0 opacity-0" ref="groupAvatarRef"
                        @change="uploadGroupAvatar" />
                </div>
            </div>


            <label class="flex flex-col mt-2">
                <span class="text-gray-700"> {{ $t("group_name") }}</span>
                <div>
                    <input type="text" v-model="form.name" class="mt-1 rounded-md border-gray-300"
                        :placeholder="$t('group_name_placeholder')" />
                </div>
            </label>
            <label class="flex flex-col mt-2">
                <span class="text-gray-700"> {{ $t("group_description") }}</span>
                <div>
                    <textarea v-model="form.description" class="mt-1 block w-full rounded-md border-gray-300"
                        :placeholder="$t('group_description_placeholder')">
                </textarea>
                </div>
            </label>
            <div class="flex mt-2">
                <div @click="saveGroupInfo"
                    class="border bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded py-1 px-4">保存
                </div>
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
            form: {},
            contact: {},
        };
    },
    setup() {
        const store = appStore();
        return { store };
    },
    name: "GroupSetting",
    watch: {
        $router: {
            deep: true,
            handler(n, o) {
                this.fetchGroupInfo();
            },
        },
    },
    methods: {
        saveGroupInfo() {
            api.post("group/save", this.form).then(res => {
                if (res.code == 0) {
                    this.store.fetchGroupList();
                    this.success("保存群信息成功")
                } else {

                }
            })
        },
        uploadGroupAvatar() {
            const preview = this.$refs.groupAvatarImg as HTMLImageElement;
            console.log(preview);
            const file = this.$refs.groupAvatarRef.files[0];
            console.log(file);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                preview.src = reader.result;
            }, false);
            if (file) {
                api
                    .upload("asset/uploadImage", {
                        file: file,
                    })
                    .then((res) => {
                        this.form.avatar = res.data;
                    });
                reader.readAsDataURL(file);
            }
        },
        fetchGroupInfo() {
            api
                .get("group/profile", { group_id: this.$route.params.id })
                .then((res) => {
                    this.form = res.data;
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
