<template>
  <font-awesome-icon class="w-5 pr-2 cursor-pointer  hover:text-gray-900" icon="image" @click="sendImage" />
</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from '../../store/appStore';

export default {
  name: "ImageInput",
  setup() {
    const store = appStore();
    return { store };
  },
  props: {
    sn: Number
  },
  methods: {
    async sendImage() {
      var reader = new FileReader();
      const pickerOpts = {
        mode: 'read',
        types: [
          {
            description: 'Images',
            accept: {
              'image/*': ['.png', '.gif', '.jpeg', '.jpg']
            }
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false
      };
      var res = await window.showOpenFilePicker(pickerOpts);
      res.forEach(async (f: any) => {
        if (f.kind == "file") {
          const file = await f.getFile();
          console.log(f);
          const res = await api.upload("asset/uploadImage", {
            file: file
          })
          if (res.code == 0) {
            var payload = {
              sender_id: this.store.userInfo.user.user_id,
              session_id: this.store.curSession.session_id,
              content: "[图片] " + f.name,
              payload: {
                size: f.size,
                name: f.name,
                url: res.data
              },
              type: 1,
              sn: this.sn + 1,
              created_at: Date.now()
            };
            this.store.send("/session/" + this.store.curSession.session_id + "/chat", payload);
          }
        }
      })
    }
  }
};
</script>