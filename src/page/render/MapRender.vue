<template>
    <div class=" block  bg-white shadow rounded text-base text-gray-800 h-48 w-96">
        <MapViewer :center="data.payload.lngLat" :zoom="data.payload.zoom">
        </MapViewer>
    </div>
</template>

<script lang="ts">
import MapViewer from '../../components/MapViewer.vue';
export default {
    props: {
        data: Object
    },
    name: "MapRender",
    components: { MapViewer }
};
</script>