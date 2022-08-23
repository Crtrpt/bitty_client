<template>
    <teleport to="#dialog" v-if="displayDiglog">
        <div class="border py-2 m-2 pb-0 mb-0  bg-white rounded  shadow hover:shadow-2xl
            absolute  top-0 left-1/2 -ml-40
        " :class="{
            // ' shadow-green-500  border-green-200 bg-green-50': type == 'success',
            // ' shadow-yellow-500 border-yellow-200 bg-yellow-50': type == 'warning',
            // ' shadow-red-100  border-red-200 bg-red-50': type == 'error',
            // ' shadow-blue-500 border-blue-200 bg-blue-50': type == 'info'
        }">
            <div class="title flex items-center px-2 pb-2 w-80 border-b text-base">
                <font-awesome-icon class=" h-2 m-1 p-1 text-base
                     hover:text-gray-800 cursor-pointer text-gray-500" icon="info" />
                <div class=" flex-grow text-gray-700">{{ title }}</div>
                <div>
                    <font-awesome-icon class="w-4 h-2 m-1 p-1 text-base
                     hover:text-gray-800 cursor-pointer text-gray-500" icon="close" @click="displayDiglog = false" />
                </div>
            </div>

            <slot class="py-2">
                <div class="px-2 py-2 text-gray-700 text-sm">
                    {{ content }}
                </div>
            </slot>

            <div class="footer flex text-xs flex-row-reverse px-2 py-2 items-center">

                <div class="px-2  py-1 border mx-1 rounded  cursor-pointer" v-if="cancel == true"
                    @click="() => { emits('cancel') }">
                    {{ cancelTitle }}
                </div>
                <div class="px-2 py-1 border rounded text-white  cursor-pointer " :class="{
                    ' bg-green-500  text-white border-green-500': type == 'success',
                    ' bg-yellow-500 text-white border-yellow-500': type == 'warning',
                    ' bg-red-500 text-white border-red-500': type == 'error',
                    ' bg-blue-500 text-white border-blue-500': type == 'info'
                }" v-if="ok == true" @click="() => { emits('ok') }">
                    {{ okTitle }}
                </div>

                <!-- <div class=" flex-grow text-gray-400 flex items-center">
                    {{ info }}
                </div> -->

            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
const displayDiglog = ref(false);
const props = defineProps(
    {
        title: String,
        content: String,
        modelValue: Boolean,
        type: {
            type: String,
            default: "info"
        },
        // info: {
        //     type: String,
        //     default: ""
        // },
        ok: {
            type: Boolean,
            default: true,
        },
        okTitle: {
            type: String,
            default: "确认"
        },
        cancel: {
            type: Boolean,
            default: true,
        },
        cancelTitle: {
            type: String,
            default: "取消"
        }
    }
)
const emits = defineEmits(['update:modelValue', "ok", "cancel", "close"]);

watch(() => props.modelValue, (n: boolean) => {
    console.log(n);
    displayDiglog.value = n;
})

displayDiglog.value = props.modelValue;
// watch(displayDiglog, (n) => {
//     if (n) {
//         emits("ok")
//     } else {
//         emits("cancel")
//     }
//     emits("close")
// })
</script>