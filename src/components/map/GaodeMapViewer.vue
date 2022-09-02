
<template>
    <div class="w-full h-full" ref="map" v-bind="$attrs">
    </div>
</template>

<script lang="ts">
import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
    name: "GaodeMapViewer",
    props: {
        center: Object,
        zoom: Number
    },
    data() {
        return {
            map: null,
        }
    },
    setup() {
        const map = shallowRef(null);
        return {
            map,
        }
    },
    mounted() {
        console.log(this.$attrs);
        this.initMap();
    },
    methods: {
        initMap() {
            AMapLoader.load({
                key: import.meta.env.VITE_GAODEMAP_KEY,             // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",                         // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: []       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                var map = this.map = new AMap.Map(this.$refs.map, {  //设置地图容器id
                    resizeEnable: true,
                    viewMode: "3D",    //是否为3D地图模式
                    zoom: this.zoom,
                    center: this.center, //初始化地图中心点位置
                });

            }).catch(e => {
                console.log(e);
            })
        },
    }
}
</script>
