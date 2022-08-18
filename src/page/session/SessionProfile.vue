<template>
  <div class=" ">
    <div class="p-2 h-12 border-b border-gray-200 flex items-center">
      <router-link :to="{
        path: './chat',
      }">
        <font-awesome-icon class="w-5 px-2 cursor-pointer hover:text-gray-800" icon="arrow-left" />
        {{ store.curSession?.name }}
      </router-link>
    </div>
    <div class="flex flex-col justify-center items-center">
      <!-- 成员列表 -->
      <div class="p-2 flex flex-row justify-center items-center">
        <avatar class=" h-12 w-12" v-for="m in members || []" :key="m" :user_id="m.user_id">
        </avatar>
      </div>
      <div class="param  text-sm text-gray-500 mt-4">
        <div>创建于{{ prttyDate(session.session?.created_at ?? 0) }}</div>
      </div>
      <!-- 配置列表 -->
      <div class="action  mt-4 flex  flex-col" v-if="config">
        <!-- {{ session.user }} -->
        <a v-if="!config.suspend"
          class="border px-2  py-1 my-1  rounded text-red-500  hover:text-red-600 cursor-pointer"
          @click="toggleSuspendSession(true)">挂起会话</a>
        <a v-if="config.suspend"
          class="border px-2  py-1 my-1 rounded text-green-500  hover:text-green-600 cursor-pointer"
          @click="toggleSuspendSession(false)">恢复会话</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from "../../store/appStore";
import Avatar from "../../components/Avatar.vue";
export default {
  name: "SessionProfile",
  props: {
    "session": Object,
    "config": Object,
  },
  data() {
    return {
      members: []
    };
  },
  watch: {
    "session": {
      deep: true,
      handler(n, o) {
        if (n.session) {
          this.getSessionInfo();
        }
      }
    }
  },
  methods: {
    getSessionInfo() {
      api.get("session/profile", {
        session_id: this.$route.params.id,
        user_id: this.store.userInfo.user.user_id,
      }).then(res => {
        if (res.code == 0) {
          this.members = res.data.member;
        }
      });
    },
    toggleSuspendSession(value) {
      if (!value) {
        this.store.subscribe(this.$route.params.id);
      } else {
        this.store.unsubscribe(this.$route.params.id);
      }

      api.post("session/toggle_suspend", {
        session_id: this.$route.params.id,
        user_id: this.store.userInfo.user.user_id,
        value: value
      }).then(res => {
        if (res.code == 0) {
          this.store.setUserSessionMap(this.$route.params.id, "suspend", value)
        }
      });
    },
  },
  mounted() {
    this.getSessionInfo();
  },
  setup() {
    const store = appStore();
    return { store };
  },
  components: { Avatar }
};
</script>
