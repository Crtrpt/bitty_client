<template>

    <div class="   ">
        <div v-for="d in data" :key="d">
            <div class=" flex ">
                   <div class="rounded-full bg-blue-500   w-8 h-8  mx-2  flex-grow-0 flex-shrink-0"  @click="() => {
                $router.push({ path: '/contact/'+d.id+'/profile' });
            }">
                      <img class="  w-full h-full" :src='d.sender?.avatar||""'   />
                  </div>
              <div class=" mb-4">
                
                  <div class=" text-gray-400 text-xs pb-1">{{d.sender?.name||""}} </div>
                  
                  <div class="py-1 bg-white p-2  hover:shadow rounded">{{d.msg}}</div>
                   <div class=" text-xs text-gray-300 py-0.5">
                      {{d.sendTime}}
                  </div>
              </div>
             
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { appStore } from '../../store/appStore';
export default {
  name: "ChatView",
  props:{
    data:Object,
  },
  setup() {
        const store = appStore()
        return { store }
  },
};
</script>