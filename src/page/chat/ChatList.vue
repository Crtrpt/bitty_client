<template>
    <div class=" w-60 py-5 bg-gray-100 ">
        <div v-for=" i in list" :key="i" class="flex  hover:bg-gray-200"  @click="()=>{
                $router.push({ path: '/chat/'+i.id+'/chat' });
            }">

        <div class="cell p-2  flex flex-grow  cursor-pointer">
            <div class="rounded-full bg-blue-500   w-8 h-8  "  @click="() => {
                $router.push({ path: '/user/profile' });
            }">
                <img class="  w-full h-full" src="https://api.multiavatar.com/Starcrasher.png"   />
            </div>


            <div class="mx-2 flex-grow">
                    <div>{{i.name}}</div>
            </div>
            
        </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: "ChatList",
    data(){
        return {
            list:[
                {
                    id:111,
                    name:"111"
                },
                {
                    id:222,
                    name:"111"
                },
                {
                    id:333,
                    name:"111"
                },
                {
                    id:444,
                    name:"111"
                }
            ]
        }
    }
}
</script>