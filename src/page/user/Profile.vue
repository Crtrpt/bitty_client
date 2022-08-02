<template>

    <div class=" container mx-auto">
    <div class="  text-3xl mt-10 px-4 ">用户信息</div>
    <div class="  w-full  mx-auto flex      justify-center items-center ">
       
  
        <div class=" ml-20 flex  flex-col ">
                <div class="flex  items-center">
                    <div class=" shadow-xl  rounded-full">
                        <img class="  w-20" :src='data.avatar'   />
                    </div>
                    <div class="ml-10">
                        <div class=" text-xl">
                        {{data.name||''}}
                        </div>
                        <div class=" text-sm text-gray-500">
                             {{data.status||''}}
                        </div>
                    </div>
                </div>
                <div class="action mt-5 flex text-xs  text-white">
                    <div class="   rounded cursor-pointer  whitespace-nowrap   px-10 py-2 bg-blue-400 " @click="()=>{
                         $router.push({ path: '/chat/'+i.id+'/chat' });
                    }">
                        发起聊天
                    </div>
                    <div class="   rounded cursor-pointer  whitespace-nowrap  px-10 py-2 mx-2 bg-blue-400">
                        加为好友
                    </div> 
                     <div class="   rounded cursor-pointer  whitespace-nowrap  px-10 py-2 mx-2 bg-blue-400">
                        解除好友
                    </div> 
                </div>
        </div>
        
    </div>
</div>
</template>

<script lang="ts">
import { appStore } from '../../store/appStore';
export default {
    props:{
        data:Object,
    },
  name: "MyProfile",
    setup() {
    const store = appStore();
    return {
      store,
    };
    }
};
</script>