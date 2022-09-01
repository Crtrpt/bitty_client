<template>
    <component :is="curMap"></component>
</template>

<script lang="ts">
import { appStore } from '../store/appStore';
import MapboxMap from './map/MapboxMap.vue';
import GaodeMap from './map/GaodeMap.vue';
import BaiduMap from './map/BaiduMap.vue';
import GoogleMap from './map/GoogleMap.vue';

export default {
    name: "Map",
    components: { MapboxMap, GaodeMap, BaiduMap, GoogleMap },
    computed: {
        curMap() {
            return this.store?.sysInfo?.curMap ?? 'MapboxMap';
        }
    },
    setup() {
        const store = appStore();
        return { store };
    },
    mounted() {
    },
};
</script>


