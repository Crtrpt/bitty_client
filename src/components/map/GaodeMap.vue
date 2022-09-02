
<template>
    <input ref="searchBox" class=" absolute  text-xs top-5  left-5   z-50 border shadow outline-none p-2 rounded" />
    <div class="w-full h-full" ref="map">
    </div>
</template>

<script lang="ts">
import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
    name: "GaodeMap",
    data() {
        return {
            keywords: "",
            map: null,
            searchCtr: null,
        }
    },
    setup() {
        const map = shallowRef(null);
        return {
            map,
        }
    },
    mounted() {
        this.initMap();
    },
    methods: {
        search() {
            console.log(this.searchCtr)
        },
        initMap() {
            window._AMapSecurityConfig = {
                securityJsCode: import.meta.env.VITE_GAODEMAP_securityJsCode,
            }
            AMapLoader.load({
                key: import.meta.env.VITE_GAODEMAP_KEY,             // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",                         // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.PlaceSearch', 'AMap.ToolBar', "AMap.AutoComplete"]       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                var map = this.map = new AMap.Map(this.$refs.map, {  //设置地图容器id
                    resizeEnable: true,
                    viewMode: "3D",    //是否为3D地图模式
                    zoom: 5,           //初始化地图级别
                    center: [105.602725, 37.076636], //初始化地图中心点位置
                });
                this.map.on("click", (e: any) => {
                    console.log(e);
                    this.$emit("clickMap", {
                        type: "gaode",
                        zoom: map.getZoom(),
                        lngLat: [
                            e.lnglat.lng,
                            e.lnglat.lat
                        ]
                    })
                })
                console.log(AMap);
                // var toolbar = new AMap.ToolBar();
                // map.addControl(toolbar);

                var autocomplete = new AMap.AutoComplete({
                    input: this.$refs.searchBox
                });


                var search = this.search = new AMap.PlaceSearch({
                    city: '北京',
                    map: map
                })

                autocomplete.on('select', function (e: any) {
                    //TODO 针对选中的poi实现自己的功能
                    search.search(e.poi.name)
                })


            }).catch(e => {
                console.log(e);
            })
        },
    }
}
</script>
