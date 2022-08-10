import { defineStore } from "pinia";
import api from "../api/api";

const initMenu = (menu: any, parent: any) => {
  // console.log(menu);
  menu?.forEach((m: any) => {
    m._parent = parent;
    m._active = false;
    m._open = false;
    if (m.children.length > 0) {
      initMenu(m.children, m);
    }
  });
};
export const appStore = defineStore("appStore", {
  state: () => {
    var userinfo = null;
    try {
      userinfo = JSON.parse(window.localStorage.getItem("auth")!);
    } catch (e) {}

    return {
      menu: [
        {
          name: "仪表盘",
          route: "/home/dashboard",
          icon: "chart-line",
          _open: false,
          children: [],
        },
        {
          name: "用户管理",
          _open: false,
          icon: "user",
          children: [
            {
              name: "用户列表",
              route: "/user/list",
              _open: false,
              children: [],
            },
          ],
        },
        {
          name: "群组管理",
          _open: false,
          icon: "user",
          children: [
            {
              name: "群组列表",
              route: "/group/list",
              _open: false,
              children: [],
            },
          ],
        },
      ],
      //用户信息
      userInfo: userinfo,
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
      contactList: [
        {
          id: 1,
          name: "苏轼",
          lastmsg: "十年生死两茫茫，不思量，自难忘。",
        },
        {
          id: 2,
          name: "杜甫",
          lastmsg: "国破山河在，城春草木深。",
        },
        {
          id: 3,
          name: "李白",
          lastmsg: "君不见黄河之水天上来，奔流到海不复回。",
        },
        {
          id: 4,
          name: "白居易",
          lastmsg: "汉皇重色思倾国，御宇多年求不得。",
        },
        {
          id: 5,
          name: "王维",
          lastmsg: "空山新雨后，天气晚来秋。",
        },
      ],
      curContact: null,
      //聊天列表
      sessionList: [],
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
    setSessionList(payload: any) {
      this.sessionList = payload;
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
