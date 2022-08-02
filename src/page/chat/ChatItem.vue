<template>
     <div class="cell p-2  flex flex-grow  cursor-pointer items-center justify-center">
            <div class="rounded-full bg-blue-500   w-8 h-8   flex-grow-0 flex-shrink-0"  @click="() => {
                $router.push({ path: '/user/profile' });
            }">
                <img class="  w-full h-full" :src='"https://api.multiavatar.com/"+data.name+".png"'   />
            </div>


            <div class="mx-2 flex-grow overflow-hidden flex-shrink ">
                    <div class=" text-base">{{data.name}}</div>
                    <div class=" text-xs  text-gray-400  whitespace-nowrap    w-0 ">{{data.lastmsg}}</div>
            </div>
            
        </div>
</template>

<script lang="ts">
export default {
  name: "ChatItem",
  props:{
    data:Object,
  }
};
</script>