<template>
    <profile class=" h-full" :data="data"></profile>
</template>

<script lang="ts">
import Profile from "../user/Profile.vue";
import api from "../../api/api";
export default {
    data(){
        return  {
            data:{
                avatar:"",
                name:"",
                status:""
            }
        }
    },
    name: "ContactProfile",
    created(){
        console.log(this.$route.params.id)
        api.get("user/profile",{id:this.$route.params.id}).then((res)=>{
            this.data=res
        })
    },
    components: { Profile }
};
</script>