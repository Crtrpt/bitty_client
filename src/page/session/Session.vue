<template>
  <RouterView class="flex-grow" :session="session" :config="config"></RouterView>
</template >

<script lang=" ts">
import api from '../../api/api';
import { appStore } from '../../store/appStore';
export default {
  name: "Session",
  computed: {
    "config"() {
      return this.store.userSessionMap.get(this.$route.params.id)
    }
  },
  data() {
    return {
      session: {}
    }
  },
  setup() {
    const store = appStore();
    return { store };
  },
  methods: {
    getSessionInfo() {
      var _this = this;
      this.store.setSessionById(this.$route.params.id);
      api
        .get("session/info", {
          session_id: this.$route.params.id,
          user_id: this.store.userInfo.user.user_id,
        })
        .then((res) => {
          _this.session = res.data;
        });
    },
  },
  mounted() {
    this.getSessionInfo();
  },

};
</script>
