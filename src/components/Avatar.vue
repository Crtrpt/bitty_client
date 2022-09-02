<template>
    <div :class="{
    
        ...className,
        'flex  flex-col ': true,
    }">


        <div class="rounded-full  w-8 h-8 mx-2 cursor-pointer hover:shadow-md flex-grow-0 flex-shrink-0" :style="{
            backgroundImage: ' url(' + user?.avatar + ')', backgroundSize: 'cover',
        }" @click="
    () => {
        $router.push({ path: '/contact/' + user.user_id + '/profile' });
    }
">
        </div>
        <div v-if="displayName" class=" w-12 overflow-hidden h-5 text-gray-400 text-xs mt-2 text-center">
            {{ user?.nick_name }}
        </div>
    </div>
</template>


<script lang="ts">
import { appStore } from "../store/appStore";


export default {
    name: "Avatar",
    props: {
        className: Object,
        user_id: String,
        displayName: Boolean
    },
    setup() {
        const store = appStore();

        return {
            store,
        };
    },
    data() {
        return {
            user: {}
        }
    },
    mounted() {
        var _this = this;
        this.store.getUserProfile(this.user_id).then((res) => {
            _this.user = res;
        })
    }
};
</script>
