import { defineStore } from "pinia";
import api from "../api/api";
import { mqttInit, mqttSubject } from "../api/mqtt";

export const mqttPublish = (session: string, payload: any) => {
  client.publish(session, JSON.stringify(payload));
};

export const appStore = defineStore("appStore", {
  state: () => {
    var userinfo = null;
    try {
      userinfo = JSON.parse(window.localStorage.getItem("auth")!);
    } catch (e) {}

    return {
      //用户信息
      userInfo: userinfo,
      sysInfo: {
        isConnect: false,
      },
      //系统配置
      config: {
        allSearch: true,
        allAnonChat: false,
        addFriendMode: 0,
        addFriendQuestion: "我的名字",
        addFriendAnswer: "苏轼",
        //允许多个账号同时登陆
        allMultipleAccountsLogin: true,
        language: "en",
      },
      //联系人列表
      contactList: [],
      curContact: null,
      //聊天列表
      sessionList: [],
      sessionMap: new Map(),
      userMap: {},
      curSession: null,
      menuPath: [],
      activeMenu: null,
      version: "xxx",
      theme: [{ name: "default" }],
      language: [
        {
          name: "中文",
          code: "zn",
        },
        {
          name: "English",
          code: "en",
        },
      ],
    };
  },
  getters: {
    // contactList(state){
    //   return state.contactList;
    // },
    // sessionList(state){
    //   return state.sessionList;
    // }
  },

  actions: {
    setSessionById(session_id: string) {
      this.sessionList.forEach((s) => {
        if (s.session_id == session_id) {
          console.log("更新");
          this.curSession = s;
        }
      });
    },
    connect(c) {
      this.sysInfo.isConnect = true;
    },
    message(msg, payload) {
      console.log("message================");
      var msgSegment = msg.split("/");
      var msgPayload = JSON.parse(payload.toString());
      console.log(msgSegment);
      switch (msgSegment[2]) {
        case "session":
          var session_id = msgSegment[3];

          var msgSession = this.sessionMap.get(session_id);
          msgSession.unread = msgSession.unread + 1 || 1;

          msgSession.lastmsg = msgPayload.content;
          switch (msgSegment[4]) {
            case "chat": {
            }
          }
          break;
      }
    },
    disconnect() {
      this.sysInfo.isConnect = false;
      console.log("disconnect================");
    },
    mqttInit() {
      mqttInit({
        connect: this.connect,
        message: this.message,
        disconnect: this.disconnect,
        topic: "/" + this.userInfo.user.user_id + "/#",
      });
    },
    setChat(payload: any) {
      console.log(payload);
      this.curSession = payload;
      this.curSession.chat = this.curSession.chat || {
        list: [],
      };
    },
    send(msg: any) {},
    setContact(payload: any) {
      this.curContact = payload;
    },
    fetchSessionList() {
      var _this = this;
      //获取session列表
      api
        .get("session/list", { user_id: this.userInfo.user.user_id })
        .then((res) => {
          if (res.code == 0) {
            _this.setSessionList(res.data);
          }
        });
    },
    fetchContactList() {
      var _this = this;
      //获取contact列表
      api
        .get("contact/list", { user_id: this.userInfo.user.user_id })
        .then((res) => {
          if (res.code == 0) {
            _this.setContactList(res.data);
          }
        });
    },
    setSessionList(payload: any) {
      this.sessionList = payload;
      this.sessionList.forEach((s) => {
        s.unread = 0;
        s.last_msg_at = Date.now();
        this.sessionMap.set(s.session_id, s);
      });
    },
    setContactList(payload: any) {
      this.contactList = payload;
    },
    clearLoginInfo() {
      this.contactList = [];
      this.curContact = null;
      this.sessionList = [];
      this.curSession = null;
    },
    setLogin(payload: any) {
      this.isLogin = true;
      this.userInfo = payload;
      this.clearLoginInfo();
      window.localStorage.setItem("auth", JSON.stringify(payload));
      this.fetchSessionList();
      this.fetchContactList();
    },
    syncUserInfo() {
      window.localStorage.setItem("auth", JSON.stringify(this.userInfo));
    },
    setLogout() {
      console.log("logout");
      window.localStorage.removeItem("auth");
      this.clearLoginInfo();
      window.location.reload();
    },
    //设置菜单
    setMenu(menu: any) {
      this.menu = menu == null ? this.menu : menu;
      initMenu(this.menu, null);
    },
    //开关菜单
    toggleMenu(menu: any) {
      menu._open = !menu._open;
      menu._active = true;
      if (menu._active) {
        this.setMenuInactivated(this.activeMenu);
        this.activeMenu = menu;
        this.setMenuActive(menu);
      }
    },
    setMenuInactivated(menu: any) {
      if (menu == null) {
        return;
      }
      menu._active = false;
      if (menu._parent != null) {
        this.setMenuInactivated(menu._parent);
      }
    },
    setMenuActive(menu: any) {
      if (menu == null) {
        return;
      }
      menu._active = true;
      if (menu._parent != null) {
        console.log(menu._parent);
        this.setMenuActive(menu._parent);
      }
    },
  },
});
