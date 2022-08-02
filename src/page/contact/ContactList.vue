<template>

    <div class=" w-60  bg-gray-100 border-r  ">
        <ContactSearch :data="keywords" class=" h-12"></ContactSearch>
        <div v-for=" i in store.contactList" :key="i" class="flex  hover:bg-gray-200"  @click="()=>{
                $router.push({ path: '/contact/'+i.id+'/profile' });
            }">

       <div class="cell p-2  flex flex-grow  cursor-pointer justify-center items-center">
            <div class="rounded-full bg-blue-500   w-8 h-8   flex-grow-0 flex-shrink-0"  @click="() => {
                $router.push({ path: '/user/profile' });
            }">
                <img class="  w-full h-full" :src='"https://api.multiavatar.com/"+i.name+".png"'   />
            </div>


            <div class="mx-2 flex-grow overflow-hidden flex-shrink ">
                    <div class=" text-base">{{i.name}}</div>
                    <div class=" text-xs  text-gray-400  whitespace-nowrap    w-0 ">{{i.lastmsg}}</div>
            </div>
            
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import ContactSearch from "./ContactSearch.vue"
import { appStore } from '../../store/appStore';
export default {
    name: "ContactList",
    data() {
        return {
            keywords:"",
        };
    },
    components: { ContactSearch },
    setup() {
        const store = appStore()
        return { store }
    },
}
</script>