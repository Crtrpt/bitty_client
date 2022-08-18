<template>
    <div>
        <Switch v-model="enabled" :class="enabled ? 'bg-green-500' : 'bg-gray-700'"
            class="relative inline-flex  h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <span class="sr-only">Use setting</span>
            <span aria-hidden="true" :class="enabled ? 'translate-x-4' : 'translate-x-0'"
                class="pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
        </Switch>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { Switch } from '@headlessui/vue'

const enabled = ref(false)

var props = defineProps({
    modelValue: Boolean
})
enabled.value = props.modelValue;

var emits = defineEmits(['update:modelValue']);

watch(enabled, () => {
    console.log("update================")
    emits("update:modelValue", enabled)
})

</script>