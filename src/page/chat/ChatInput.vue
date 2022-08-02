<template>

    <div class="  h-full flex flex-col">
          <div  class=" h-10">

          </div>
          <textarea class=" w-full h-full border-white" v-model="data.draft" @keyup.enter="store.send()"></textarea>
          
    </div>
</template>

<script lang="ts">
import { appStore } from '../../store/appStore';
export default {
  name: "ChatInput",
  props:{
    data:Object,
  },
  data(){
    console.log(this);
    return {
        draft:''
    }
  },
   setup() {
        const store = appStore()
        return { store }
    },
};
</script>