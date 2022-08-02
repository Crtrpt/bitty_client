<template>
    <div class=" container mx-auto">
        <div class="  text-3xl mt-10 px-4 ">搜索</div>
        <div class="w-full flex items-center justify-center  py-4">
            <div class="border  rounded-full hover:shadow-inner">
                <input   placeholder="输入你要搜索的内容"  class=" outline-none px-2 m-2  w-80"/>
            </div>
            <div class=" border  rounded-full px-4 py-2 mx-4 bg-blue-500  text-white cursor-pointer hover:shadow">
                搜索
                <font-awesome-icon class="w-5 cursor-pointer" icon="search" />
            </div>
        </div>
        <div class=" grid grid-cols-4   gap-4 p-4">
            <div v-for="i in list" :key="i">
                <div class="border p-4 rounded hover:shadow">
                           <div class=" flex  flex-col ">
                            <div class="flex  items-center">
                                <div class=" shadow-xl  rounded-full  flex-shrink-0">
                                   <img class="  w-10" :src='"https://api.multiavatar.com/"+i.name+".png"'   />
                                </div>
                                <div class="ml-2">
                                    <div class=" text-xl">
                                     {{i.name}}
                                    </div>
                                    <div class=" text-sm text-gray-500 whitespace-nowrap">
                                         {{i.statu}}
                                    </div>
                                </div>
                            </div>
                            <div class="action mt-5 flex text-xs  text-white">
                                <div class="   rounded cursor-pointer    whitespace-nowrap  px-2 py-1  mr-2 bg-blue-400 ">
                                    发起聊天
                                </div>
                                <div class="   rounded cursor-pointer    whitespace-nowrap px-2 py-1 mx-2 bg-blue-400">
                                    加为好友
                                </div> 
                              
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Index from '../chat/Index.vue';
export default {
  components: { Index },
  name: "Search",
  data(){
    return {
        list:[
                {
                    id:1,
                    name:"苏轼",
                    lastmsg:"十年生死两茫茫，不思量，自难忘。",
                    statu:"十年生死两茫茫，不思量，自难忘。",
                },
                {
                    id:2,
                    name:"杜甫",
                     lastmsg:"国破山河在，城春草木深。",
                     statu:"国破山河在，城春草木深。",
                },
                {
                    id:3,
                    name:"李白",
                     lastmsg:"君不见黄河之水天上来，奔流到海不复回。",
                     statu:"君不见黄河之水天上来，奔流到海不复回。",
                },
                {
                    id:4,
                    name:"白居易",
                    lastmsg:"汉皇重色思倾国，御宇多年求不得。",
                    statu:"汉皇重色思倾国，御宇多年求不得。"
                },
                {
                    id:5,
                    name:"王维",
                    lastmsg:"空山新雨后，天气晚来秋。",
                    statu:"空山新雨后，天气晚来秋。"
                },
                {
                    id:6,
                    name:"杜牧",
                    lastmsg:"清明时节雨纷纷，路上行人欲断魂。",
                    statu:"借问酒家何处有？牧童遥指杏花村。"

                }
            ]
    }
  }
};
</script>