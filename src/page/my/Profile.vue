<template>

    <div class=" container mx-auto">
    <div class="  text-3xl mt-10 px-4 ">我的信息</div>
    <div class="  w-full  mx-auto flex      justify-center items-center ">
       
  
        <div class=" ml-20 flex  flex-col ">
                <div class="flex   items-start">
                    <div class=" shadow-xl  rounded-full relative">
                        <img class="  w-20" :src='store.userInfo.user.avatar' />
                        <input type="file" class=" absolute w-full h-full top-0  opacity-0" />
                    </div>
                    <div class="ml-10 flex flex-col w-80">                        
                        <template v-if="editale">
                            <input class="text-xl py-1 text-gray-500 outline-none border rounded my-1 p-1 border-gray-700" v-model="store.userInfo.user.nick_name" />
                            <textarea class="text-sm text-gray-500 outline-none  rounded p-1 my-1 border-gray-700" v-model="store.userInfo.user.status" ></textarea>
                            <div class="flex">
                                <div class=" text-sm  border-blue-500 cursor-pointer border  bg-blue-500 text-white px-2 " @click="saveUserInfo">保存</div>
                                <div class=" text-sm text-blue-500 cursor-pointer border border-blue-500 px-2 mx-1" @click="()=>editale=false">取消</div>
                            </div>
                        </template>
                         <template v-if="!editale">
                            <div class="text-xl py-1 text-gray-500 outline-none"> {{store.userInfo.user.nick_name}}</div>
                            <div class="text-sm text-gray-400 outline-none  rounded  py-1" @click="()=>editale=true">
                                {{store.userInfo.user.status}}
                            </div>
                             <div class="flex">
                             <div class=" text-sm text-blue-500  cursor-pointer" @click="()=>editale=true" >编辑</div>
                             </div>
                        </template>
                       
                         
                    </div>
                </div>
        </div>
        
    </div>
</div>
</template>

<script lang="ts">
import api from '../../api/api';
import { appStore } from '../../store/appStore';

export default {
  name: "UserProfile",
    data(){
        return {
            editale:false,
        }
    },
    methods:{
        saveUserInfo(){
            var _store=this.store;
            var _this=this;
            api.post("user/save",this.store.userInfo.user).then((res)=>{
                this.editale=false
                 _store.syncUserInfo();
            })
           
        }
    },
    setup() {
            const store = appStore();
  
         return {
            store,
        };
    }
};
</script>