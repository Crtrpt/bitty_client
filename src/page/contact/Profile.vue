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
    watch:{
        "$router":{
            deep:true,
            handler(n,o){
                this.fetchUserInfo()
            }
        }
    },
    methods:{
        fetchUserInfo(){
            api.get("user/profile",{user_id:this.$route.params.id}).then((res)=>{
            this.data=res.data
        })
        }
    },
    created(){
       this.fetchUserInfo()
        
    },
    components: { Profile }
};
</script>