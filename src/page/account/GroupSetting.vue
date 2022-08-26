<template>

  <div class="container mx-auto flex flex-col">
    <div class="flex items-baseline sticky">
      <div class="text-3xl mt-10 px-4 pb-5 w-full">
        群组设置
      </div>
    </div>
    <div class="px-2 flex-grow overflow-auto md:w-1/2 text-sm">
      <div class="border p-2 mt-2 flex flex-col  rounded">
        <div>添加验证信息</div>
        <div class="action mt-2 flex">
          <select v-model="store.userInfo.config.add_group_type" class=" input rounded">
            <option value=-1>不允许邀请我加入群组</option>
            <option value=0>直接通过</option>
            <option value=1>经过我的同意</option>
            <option value=2>答对问题通过</option>
            <option value=3>答对问题并且经过我的同意</option>
          </select>
        </div>
        <div class="action mt-2 flex" v-if="store.userInfo.config.add_group_type > 1">
          <input v-model="store.userInfo.config.add_group_question" class="p-1 m-1 border  input rounded"
            placeholder="问题" />
          <input v-model="store.userInfo.config.add_group_answer" class="p-1 m-1 border  input rounded"
            placeholder="答案" />
        </div>
      </div>
      <div class=" p-2 mt-2 flex">
        <div @click="saveGroupInfo"
          class="border bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded py-1 px-4">保存
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from '../../api/api';
import { appStore } from "../../store/appStore";
export default {
  name: "GroupSetting",
  setup() {
    const store = appStore();
    return { store };
  },
  methods: {
    saveGroupInfo() {
      var _store = this.store;
      var _this = this;
      api.post("user/saveGroupConfig", {
        add_group_type: +this.store.userInfo.config.add_group_type || 0,
        add_group_question: this.store.userInfo.config.add_group_question,
        add_group_answer: this.store.userInfo.config.add_group_answer
      }).then((res) => {
        if (res.code == 0) {
          this.success("保存群组信息成功")
          _store.syncUserInfo();
        } else {
          this.error("保存群组信息出错")
        }

      });
    },
  },
  data() {
    return {

    };
  },
};
</script>
