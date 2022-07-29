<template>
    <div>
            <div v-for="m in list" :key="m">
              <div class=" border p-4 my-4 flex flex-col  w-1/2">
                <div>
                  {{m.content}}
                </div>
                <div class="action mt-5 flex text-xs flex-row-reverse   text-white">
                      <div class="   rounded cursor-pointer    whitespace-nowrap px-2 py-1 mx-2 bg-blue-400">
                            同意
                      </div> 
                       <div class="   rounded cursor-pointer    whitespace-nowrap px-2 py-1 mx-2 bg-blue-400">
                            拒绝
                      </div> 
                       <div class="   rounded cursor-pointer    whitespace-nowrap px-2 py-1 mx-2 bg-blue-400">
                            撤回
                      </div> 
                </div>
              </div>
            </div>
        </div>
</template>

<script lang="ts">
export default {
  name: "UnreadMessage",
  data(){
    return {
      list:[
        {
          content:"苏轼添加你为好友",
        },
        {
          content:"李白添加你为好友",
        }
      ]
    }
  }
};
</script>