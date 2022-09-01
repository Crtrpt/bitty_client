<template>
    <div ref="map" class="w-full h-full">
    </div>
</template>

<script lang="ts">
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { appStore } from "../../store/appStore";
import { LanguageControl } from 'mapbox-gl-controls';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export default {
    name: "MapboxMap",
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
            center: [113.65911754946592, 34.743515242721344],
            zoom: 12,
        });
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav);

        const languageControl = new LanguageControl({
            language: 'zh',
        });

        map.addControl(languageControl);

        map.addControl(new MapboxGeocoder({
            accessToken: this.accessToken,
            mapboxgl: mapboxgl,
        }), 'top-left');

        map.on("click", (e: any) => {
            this.$emit("clickMap", {
                type: "mapbox",
                zoom: map.getZoom(),
                lngLat: e.lngLat
            })
        })

    },
};
</script>


