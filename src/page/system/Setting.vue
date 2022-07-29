<template>
    <div class="container mx-auto">
        <div class="flex items-baseline">
            <div class="  text-3xl my-10 ">系统设置</div>
            <!-- <div class="  text-xl my-10 mx-1 ">消息</div>
            <div class="  text-xl my-10 mx-1">隐私</div>
            <div class="  text-xl my-10 mx-1">账号</div> -->
        </div>
        <div>
         
              <div class=" border p-4 my-4 flex flex-col  w-1/2 rounded">
                <div>
                  是否可以被搜索
                </div>
                <div class="action mt-5 flex    ">
                      <input v-model="allSearch" type="checkbox" />
                </div>
              </div>

              <div class=" border p-4 my-4 flex flex-col  w-1/2 rounded">
                <div>
                  是否允许匿名聊天
                </div>
                <div class="action mt-5 flex    ">
                      <input v-model="allAnonChat" type="checkbox" />
                </div>
              </div>

               <div class=" border p-4 my-4 flex flex-col  w-1/2 rounded">
                <div>
                  添加好友验证信息
                </div>
                 <div class="action mt-5 flex    ">
                     <select  v-model="addFriendMode">
                        <option value="0">直接通过</option>
                        <option value="1">经过我的同意</option>
                        <option value="2">答对问题通过</option>
                        <option value="3">答对问题并且经过我的同意</option>
                     </select>
                </div>
                <div class="action mt-5 flex " v-if="addFriendMode>1">
                      <input v-model="addFriendQuestion" class="p-1 m-1 border" placeholder="问题" />
                      <input v-model="addFriendAnswer"  class="p-1 m-1 border" placeholder="答案"/>
                </div>
              </div>
            
        </div>
    </div>

</template>

<script lang="ts">
export default {
  name: "Setting",
  data(){
    return {
        allSearch:true,
        allAnonChat:false,
        addFriendMode:0,
        addFriendQuestion:"我的名字",
        addFriendAnswer:"苏轼"
    }
  }
};
</script>