<template>
    <div class="rounded-full  w-8 h-8 mx-2 cursor-pointer hover:shadow-md flex-grow-0 flex-shrink-0" :style="{
        backgroundImage: ' url(' + user?.avatar + ')', backgroundSize: 'cover',
    }" @click="
    () => {
        $router.push({ path: '/contact/' + user.user_id + '/profile' });
    }
">
    </div>
</template>


<script lang="ts">
import { appStore } from "../store/appStore";


export default {
    name: "Avatar",
    props: {
        user_id: String
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
