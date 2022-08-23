<template>
    <div ref="map" class="w-full h-full">
    </div>
</template>

<script lang="ts">
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"
import { appStore } from "../store/appStore";
import { LanguageControl } from 'mapbox-gl-controls';


export default {
    name: "MapViewer",
    props: {
        center: Object,
        zoom: Number
    },
    data() {
        return {
            accessToken: import.meta.env.VITE_MAPBOX_TOKEN
        }
    },
    setup() {
        const store = appStore();
        return { store };
    },
    mounted() {
        mapboxgl.accessToken = this.accessToken;
        var map = new mapboxgl.Map({
            container: this.$refs.map,
            style: "mapbox://styles/mapbox/streets-v11",
            zoom: this.zoom || 12,
        });

        const languageControl = new LanguageControl({
            language: 'zh',
        });

        map.addControl(languageControl);
        map.setCenter(this.center)
        const marker1 = new mapboxgl.Marker()
            .setLngLat(this.center)
            .addTo(map);
    },
};
</script>


