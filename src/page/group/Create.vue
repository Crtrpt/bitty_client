<template>

    <div class="container mx-auto">
        <div class="text-3xl mt-10 px-4">
            创建群组
        </div>
        <div class="w-full mx-auto flex  flex-col justify-center items-center mt-4">
            <div class="block">
                <div
                    class="w-20 h-20   hover:shadow-xl flex justify-center items-center shadow border-8 border-white rounded-full relative flex-shrink-0">
                    <img class=" w-full h-full rounded-full absolute" ref="groupAvatarImg" />
                    <div class="w-20 h-20 rounded-full flex justify-center items-center" v-if="!form.avatar">
                        <div class="text-5xl text-gray-700">
                            {{ form.name[0] }}
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


            <label class="block">
                <span class="text-gray-700"> {{ $t("group_name") }}</span>
                <input type="text" v-model="form.name" class="mt-1 block w-full rounded-md border-gray-300"
                    :placeholder="$t('group_name_placeholder')" />
            </label>
            <label class="block">
                <span class="text-gray-700"> {{ $t("group_description") }}</span>
                <textarea v-model="form.description" class="mt-1 block w-full rounded-md border-gray-300"
                    :placeholder="$t('group_description_placeholder')">
                </textarea>
            </label>
            <div class="block">
                <div @click="create"
                    class="  hover:bg-blue-600 text-white border  rounded-md px-4 py-2 mt-1  bg-blue-500 cursor-pointer">
                    创建群组</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import api from '../../api/api'
import { appStore } from '../../store/appStore';

export default {
    name: "CreateGroup",
    data() {
        return {
            form: {
                avatar: "",
                name: "",
                description: "",
            }
        }
    },
    setup() {
        const store = appStore();
        return { store };
    },
    methods: {
        create() {
            api.post("group/create", this.form).then(res => {
                if (res.code == 0) {
                    this.info("群组创建成功")
                    this.store.fetchGroupList();
                    this.store.fetchSessionList();
                    this.$router.push({path:"/group/"+res.data.group_id+"/profile"})
                }
            })
        },
        uploadGroupAvatar() {
            const preview = this.$refs.groupAvatarImg as HTMLImageElement;
            const file = this.$refs.groupAvatarRef.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                preview.src = reader.result;
            }, false);
            if (file) {
                this.info("文件开始上传")
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
    }
}
</script>