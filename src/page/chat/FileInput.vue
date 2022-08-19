<template>
  <font-awesome-icon class="w-5 pr-2 cursor-pointer  hover:text-gray-900" icon="file" @click="sendFile" />
</template>

<script lang="ts">
import api from "../../api/api";
import { appStore } from '../../store/appStore';

export default {
  name: "FileInput",
  setup() {
    const store = appStore();
    return { store };
  },
  props: {
    sn: Number
  },
  methods: {
    async sendFile() {
      var reader = new FileReader();
      const pickerOpts = {
        mode: 'read',
        excludeAcceptAllOption: true,
        multiple: false,
        types: [
          {
            description: 'Images',
            accept: {

            }
          },
        ],
      };
      var res = await window.showOpenFilePicker(pickerOpts);
      res.forEach(async (f: any) => {
        if (f.kind == "file") {
          const file = await f.getFile();
          console.log(file);

          const res = await api.upload("asset/uploadFile", {
            file: file
          }).then((res) => {
            if (res.code != 0) {
              this.error("文件上传出错" + res.msg)
            }
          })
          if (res.code == 0) {
            console.log(f.size);
            var payload = {
              sender_id: this.store.userInfo.user.user_id,
              session_id: this.store.curSession.session_id,
              content: "[文件] " + "[" + this.prttySize(file.size) + "]" + f.name,
              payload: {
                size: file.size,
                name: f.name,
                url: res.data
              },
              type: 2,
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