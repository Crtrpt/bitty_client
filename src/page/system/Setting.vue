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
                      <input v-model="store.config.allSearch" type="checkbox" />
                </div>
              </div>

              <div class=" border p-4 my-4 flex flex-col  w-1/2 rounded">
                <div>
                  是否允许匿名聊天
                </div>
                <div class="action mt-5 flex    ">
                      <input v-model="store.config.allAnonChat" type="checkbox" />
                </div>
              </div>

               <div class=" border p-4 my-4 flex flex-col  w-1/2 rounded">
                <div>
                  添加好友验证信息
                </div>
                 <div class="action mt-5 flex    ">
                     <select  v-model="store.config.addFriendMode">
                        <option value="-1">不允许添加好友</option>
                        <option value="0">直接通过</option>
                        <option value="1">经过我的同意</option>
                        <option value="2">答对问题通过</option>
                        <option value="3">答对问题并且经过我的同意</option>
                     </select>
                </div>
                <div class="action mt-5 flex " v-if="store.config.addFriendMode>1">
                      <input v-model="store.config.addFriendQuestion" class="p-1 m-1 border" placeholder="问题" />
                      <input v-model="store.config.addFriendAnswer"  class="p-1 m-1 border" placeholder="答案"/>
                </div>
              </div>

              <div class=" border p-4 my-4 flex flex-col  w-1/2 rounded">
                <div>
                  允许多个账号同时登陆
                </div>
                <div class="action mt-5 flex    ">
                      <input v-model="store.config.allMultipleAccountsLogin" type="checkbox" />
                </div>
              </div>
            
        </div>
    </div>

</template>

<script lang="ts">
import { appStore } from '../../store/appStore';
export default {
  name: "Setting",
    setup() {
        const store = appStore()
        return { store }
    },
  data(){
    return {
       
    }
  }
};
</script>