<template>

    <div class=" w-60  bg-gray-100 border-r  ">
        <ContactSearch :data="keywords" class=" h-12"></ContactSearch>
        <div v-for=" i in store.contactList" :key="i" class="flex  hover:bg-gray-200"  @click="()=>{
                store.setContact(i);
                $router.push({ path: '/contact/'+i.user.user_id+'/profile' });
            }">

       <div class="cell p-2  flex flex-grow  cursor-pointer justify-center items-center">
            <div class="rounded-full bg-blue-500   w-8 h-8   flex-grow-0 flex-shrink-0"  @click="() => {
                $router.push({ path: '/user/profile' });
            }">
                <img class="  w-full h-full" :src='i.user?.avatar||""'   />
            </div>
            <div class="mx-2 flex-grow overflow-hidden flex-shrink ">
                    <div class=" text-base">{{i.user?.nick_name}}</div>
                    <div class=" text-xs  text-gray-400  whitespace-nowrap    w-0  h-4 ">{{i.user?.status||''}}</div> 
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import ContactSearch from "./ContactSearch.vue"
import { appStore } from '../../store/appStore';
import api from "../../api/api";
export default {
    name: "ContactList",
    data() {
        return {
            keywords:"",
        };
    },
    setup() {
        const store = appStore()
        return { store }
    },
    mounted(){
        console.log("加载");
        var _this=this;
        api.get("contact/list",{user_id:this.store.userInfo.user.user_id}).then(res=>{
            if(res.code==0){
                _this.store.setContactList(res.data);
            }
        })
    },
    components: { ContactSearch },
    
}
</script>