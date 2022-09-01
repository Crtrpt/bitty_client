<template>

    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                选择联系人({{ selectContactList.length }})
                            </DialogTitle>
                            <div class="mt-2">
                                <!-- <div>
                                    {{ selectContactList }}
                                </div> -->
                                <div class="my-1">
                                    <input type="text" class="border rounded-full text-xs" v-model="words"
                                        @keydown.enter="changeWords" />
                                </div>
                                <div class=" h-32 overflow-auto px-2">
                                    <template v-for="i in list" :key="i">
                                        <div class="flex" v-if="words == '' || i.contact.name.indexOf(words) != -1">
                                            <div>
                                                <input class="input rounded" type="checkbox"
                                                    @change="changeSelect($event, i)" />
                                            </div>
                                            <div class="ml-2">
                                                {{ i.contact.name }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <div class="mt-4">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="okModal">
                                    确定
                                </button>
                                <button type="button"
                                    class="ml-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="cancelModal">
                                    取消
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { appStore } from "../../store/appStore";
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import api from '../../api/api';
import alertUtil from "../../utils/alertUtils.js"


const store = appStore();
const isOpen = ref(true)
const words = ref("");

const list = store.contactList;
const props = defineProps({
    open: Boolean,
    groupId: String,
})

const emit = defineEmits(['close'])
var selectContactList = ref([]);
function changeWords() {

}
watch(props, (n, o) => {
    console.log("变更")
    if (n.open) {
        selectContactList.value = [];
    }
    isOpen.value = n.open
})
function changeSelect(e, i) {
    let list = selectContactList.value
    if (e.srcElement.checked) {
        list.push(i.user.user_id);
        selectContactList.value = list;
    } else {
        var idx = 0;
        for (const key in list) {
            if (list[key] == i.user.user_id) {
                idx = +key;
                break
            }
        }
        var newList = [
            ...list.slice(0, idx),
            ...list.slice(idx + 1, list.length),
        ]
        selectContactList.value = newList;
    }

}
isOpen.value = props.open;

function okModal() {
    console.log("发起api请求")
    api.post("group/invite", {
        group_id: props.groupId,
        user_ids: selectContactList.value
    }).then(res => {
        if (res.code == 0) {
            emit("close", selectContactList);
            console.log(this);
            alertUtil.success("邀请发送成功")
        } else {
            alertUtil.error(res.msg)
        }
    })

}

function cancelModal() {
    emit("close", []);
}
function openModal() {
    isOpen.value = true
}



</script>



<script lang="ts">
export default {
    name: "ContactSelect"
}
</script>
