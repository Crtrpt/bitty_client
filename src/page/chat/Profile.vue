<template>

  
    <div class=" ">
        <div class=" p-2 h-12 border-b  border-gray-200  flex  items-center">
            
             <router-link :to='{
                path:"./chat"
            }'>
            <font-awesome-icon class="w-5 cursor-pointer hover:text-gray-800" icon="arrow-left" />
            </router-link>
            {{store.curChat?.name}} 
        </div>
        <div class="flex flex-row">
            <div class="p-2 flex  flex-col justify-center items-center" v-for="m in store.curChat?.member||[]" :key="m"
            
            
            @click="() => {
                $router.push({ path: '/contact/'+m.id+'/profile' });
            }"
            >

             <div class="rounded-full bg-blue-500   w-8 h-8    flex-grow-0 flex-shrink-0"  >
                <img class="  w-full h-full" :src='m.user?.avatar||""'   />
                
            </div>
            <div class=" text-xs  text-gray-400">{{m.user.name}} </div>
          </div>
        </div>
    </div>

</template>

<script lang="ts">
import { appStore } from '../../store/appStore';
import ChatCard from "./ChatCard.vue";
export default {
    name: "ChatProfile",
    components: { ChatCard },
     setup() {
        const store = appStore()
        return { store }
    },
};
</script>