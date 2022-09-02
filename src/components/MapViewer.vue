<template>
    <component :is="curMap" :center="center" :zoom="zoom"></component>
</template>

<script lang="ts">
import { appStore } from '../store/appStore';
import MapboxMapViewer from './map/MapboxMapViewer.vue';
import GaodeMapViewer from './map/GaodeMapViewer.vue';

export default {
    name: "MapViewer",
    components: { MapboxMapViewer, GaodeMapViewer },
    props: {
        center: Object,
        zoom: Number,
        type: String,
    },
    computed: {
        curMap() {
            return this.type + 'MapViewer';
        }
    },
    setup() {
        const store = appStore();
        return { store };
    },
    mounted() {
        console.log(this.$attrs);
    },
};
</script>


