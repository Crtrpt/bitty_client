import { defineStore } from "pinia";
import api from "../api/api";
import {
  mqttInit,
  mqttSubject,
  mqttPublish,
  mqttUnsubscribe,
} from "../api/mqtt";

export const appStore = defineStore("appStore", {
  state: () => {
    var userinfo = null;
    try {
      userinfo = JSON.parse(window.localStorage.getItem("auth")!);
      api.headers["Token"] = userinfo.token;
    } catch (e) {}

    return {
      //用户信息
      userInfo: userinfo,
      sysInfo: {
        isConnect: false,
        alert: [],
        languageList: [
          {
            code: "en",
            name: "English",
          },
          {
            code: "zh",
            name: "中文",
          },
        ],
        curLang: "",
        mapList: [
          {
            name: "mapbox",
            component: "MapboxMap",
          },
          {
            name: "google",
            component: "GoogleMap",
          },
          {
            name: "高德",
            component: "GaodeMap",
          },
          {
            name: "百度",
            component: "BaiduMap",
          },
        ],
        curMap: "",
        translateList: [
          {
            name: "google",
          },
          {
            name: "百度",
          },
        ],
        curTranslate: "",
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
      //群组列表
      groupList: [],
      //联系人列表
      contactList: [],
      curContact: null,
      //聊天列表
      sessionList: [],
      sessionMap: new Map(),
      userSessionMap: new Map(),
      userMap: new Map(),
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
      console.log("set seesion_id", session_id);
      console.log(this.sessionList);

      for (const idx in this.sessionList) {
        console.log(this.sessionList[idx].session_id == session_id);
        if (this.sessionList[idx].session_id == session_id) {
          this.curSession = this.sessionList[idx];
          break;
        }
      }
    },
    getUserProfile(user_id: string): Promise<any> {
      return new Promise((resolve, reject) => {
        var userinfo = this.userMap.get(user_id);
        if (userinfo) {
          resolve(userinfo);
        } else {
          api.get("user/profile", { user_id: user_id }).then((res) => {
            if (res.code == 0) {
              this.userMap.set(res.data.user_id, res.data);
              resolve(res.data);
            } else {
              reject();
            }
          });
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
      console.log(payload.toString());
      switch (msgSegment[1]) {
        case "session":
          var session_id = msgSegment[2];

          var msgSession = this.sessionMap.get(session_id);

          console.log(this.curSession);
          //如果不是自己发的 那么 未读消息+1
          if (this.curSession?.session_id != session_id) {
            msgSession.unread = msgSession.unread + 1 || 1;
          } else {
            msgSession.unread = 0;
          }
          msgSession.lastmsg = msgPayload.content;
          msgSession.lastmsg_at = msgPayload.created_at;
          switch (msgSegment[3]) {
            case "chat": {
              console.log(msgSession);
              msgSession.chat.list.push(JSON.parse(payload.toString()));
            }
          }
          break;
      }
    },
    subscribe(topic: string) {
      mqttSubject("/session/" + topic + "/#");
    },
    unsubscribe(topic: string) {
      mqttUnsubscribe("/session/" + topic + "/#");
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
      // console.log(payload);
      this.curSession = payload;
      this.curSession.chat = this.curSession.chat || {
        list: [],
      };
    },
    send(topic: any, payload: any) {
      console.log("publish:" + topic);
      console.log("payload:", payload);
      mqttPublish(topic, JSON.stringify(payload));
    },
    setContact(payload: any) {
      this.curContact = payload;
    },
    setUserSessionMap(session_id: string, key: any, value: any) {
      var userConfig = this.userSessionMap.get(session_id);
      userConfig[key] = value;
    },
    fetchSysInfo() {
      api.get("system/info", {}).then((res) => {
        if (res.code == 0) {
          this.sysInfo.conf = res.data || {};
        }
      });
    },
    fetchSessionList() {
      var _this = this;
      //获取session列表
      api
        .get("session/list", { user_id: this.userInfo.user.user_id })
        .then((res) => {
          if (res.code == 0) {
            _this.setSessionList(res.data || []);
          }
        });
    },
    fetchUserSessionList() {
      console.log("获取用户session");
      var _this = this;
      api
        .get("user/session", { user_id: this.userInfo.user.user_id })
        .then((res) => {
          if (res.code == 0) {
            _this.setUserSessionList(res.data || []);
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
    fetchGroupList() {
      var _this = this;
      //获取群组列表
      api
        .get("group/list", { user_id: this.userInfo.user.user_id })
        .then((res) => {
          if (res.code == 0) {
            _this.groupList = res.data;
          }
        });
    },
    //获取用户对session列表的配置信息
    setUserSessionList(payload: any) {
      payload.forEach((s: any) => {
        this.userSessionMap.set(s.session_id, s);
        //如果没有退出会话 那么 就订阅

        if (!s.suspend) {
          var topic = "/session/" + s.session_id + "/#";
          console.log("suject: " + topic);
          mqttSubject(topic);
        }
      });
    },
    //获取用户的session列表
    setSessionList(payload: any) {
      this.sessionList = payload;
      this.sessionList.forEach((s) => {
        console.log("初始化session");
        if (!s.chat) {
          s.chat = {
            list: [],
          };
        }
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
      this.groupList = [];
      this.curContact = null;
      this.sessionList = [];
      this.curSession = null;
    },
    sysInit() {
      console.log("语言初始化");
      console.log(this.userInfo.config.map);
      this.sysInfo.curMap =
        this.sysInfo.mapList[this.userInfo.config.map]?.component ||
        "MapboxMap";
    },
    wakeup() {
      this.fetchSessionList();
      this.fetchContactList();
      this.fetchUserSessionList();
      this.fetchGroupList();
      this.mqttInit();
      this.sysInit();
    },
    setLogin(payload: any) {
      this.isLogin = true;
      this.userInfo = payload;
      this.clearLoginInfo();
      window.localStorage.setItem("auth", JSON.stringify(payload));
      this.fetchSessionList();
      this.fetchContactList();
      this.fetchGroupList();
      //初始化私人配置
      this.sysInit();
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
