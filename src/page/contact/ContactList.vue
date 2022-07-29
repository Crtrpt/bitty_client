<template>
    <div class=" w-60 py-5 bg-gray-100 ">
        <div v-for=" i in list" :key="i" class="flex  hover:bg-gray-200"  @click="()=>{
                $router.push({ path: '/contact/'+i.id+'/profile' });
            }">

       <div class="cell p-2  flex flex-grow  cursor-pointer">
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

export default {
    name: "ContactList",
    data(){
        return {
            list:[
                {
                    id:1,
                    name:"苏轼",
                    lastmsg:"十年生死两茫茫，不思量，自难忘。"
                },
                {
                    id:2,
                    name:"杜甫",
                     lastmsg:"国破山河在，城春草木深。"
                },
                {
                    id:3,
                    name:"李白",
                     lastmsg:"君不见黄河之水天上来，奔流到海不复回。"
                },
                {
                    id:4,
                    name:"白居易",
                    lastmsg:"汉皇重色思倾国，御宇多年求不得。"
                },
                {
                    id:5,
                    name:"王维",
                    lastmsg:"空山新雨后，天气晚来秋。"
                }
            ]
        }
    }
}
</script>