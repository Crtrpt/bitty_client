import { defineStore } from "pinia";
import api from "../api/api";
import localstorage from "../utils/localstorage";
import {
  mqttInit,
  mqttSubject,
  mqttPublish,
  mqttUnsubscribe,
} from "../api/mqtt";
import { msg_chat_type, msg_ctrl_type } from "../const";
import { auto } from "@popperjs/core";

export const appStore = defineStore("appStore", {
  state: () => {
    var userinfo = null;
    try {
      userinfo = localstorage.get("auth");
      api.headers["Token"] = userinfo.token;
    } catch (e) {}

    return {
      //用户信息
      userInfo: userinfo,
      sysInfo: {
        showMessageNotifucation: false,
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
    message(topic: string, payload: any) {
      console.log("topic================:" + topic);
      var msgSegment = topic.split("/");
      var msgPayload = JSON.parse(payload.toString());
      console.log(msgSegment);
      console.log(payload.toString());
      switch (msgSegment[1]) {
        case "session":
          var session_id = msgSegment[2];
          var msgSession = this.sessionMap.get(session_id);
          switch (msgSegment[3]) {
            case "chat": {
              var payload = JSON.parse(payload.toString());
              var chatList = msgSession.chat.list;
              switch (payload.msg_type) {
                case msg_chat_type: {
                  //如果不是本人发送的
                  //如果不是自己发的 那么 未读消息+1
                  if (this.curSession?.session_id != session_id) {
                    msgSession.unread = msgSession.unread + 1 || 1;
                  } else {
                    msgSession.unread = 0;
                  }
                  msgSession.lastmsg = msgPayload.content;
                  msgSession.lastmsg_at = msgPayload.created_at;

                  if (payload.sender_id != this.userInfo.user.user_id) {
                    chatList.push(payload);
                    console.log("发送消息回执");
                    //当前用户
                    this.send(
                      topic,
                      {
                        sender_id: this.userInfo.user.user_id,
                        sn: payload.sn,
                        payload: {
                          type: 0,
                        },
                      },
                      msg_ctrl_type
                    );
                  } else {
                    // console.log("修改消息状态为已发送");
                    for (var i = chatList.length; i > 0; i--) {
                      var msg = chatList[i - 1];
                      if (
                        msg.sender_id == this.userInfo.user.user_id &&
                        msg.sn == payload.sn
                      ) {
                        // console.log("修改状态");
                        msg.send_type = 40;
                        break;
                      }
                    }
                    // console.log(this.curSession.chat.list);
                  }
                  break;
                }
                case msg_ctrl_type: {
                  console.log("收到控制消息");
                  if (payload.sender_id == this.userInfo.user.user_id) {
                    break;
                  }
                  switch (payload.payload.type) {
                    case 0:
                      console.log("收到消息确认");
                      break;
                  }
                  break;
                }
              }
            }
          }
          break;
        case "user": {
          switch (msgSegment[3]) {
            case "message": {
              this.sysInfo.showMessageNotifucation = true;
              break;
            }
          }
          break;
        }
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
        clientId: this.userInfo.token,
        connect: this.connect,
        message: this.message,
        disconnect: this.disconnect,
        topic: "/user/" + this.userInfo.user.user_id + "/#",
      });
    },
    setChat(payload: any) {
      // console.log(payload);
      this.curSession = payload;
      this.curSession.chat = this.curSession.chat || {
        list: [],
      };
    },
    send(topic: any, payload: any, msg_type: any = 0) {
      payload.send_type = 0;
      payload.msg_type = msg_type;
      payload.cmd = 0;
      payload.pre_id =
        this.curSession.chat[this.curSession.chat.length]?.sn ?? "";
      console.log("publish:" + topic);
      console.log("payload:", payload);
      if (msg_type == msg_chat_type) {
        //加入本地发送列表
        this.curSession.chat.list.push(payload);
      }
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
      localstorage.save("auth", payload);
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
