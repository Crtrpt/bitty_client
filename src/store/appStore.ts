import { defineStore } from "pinia";

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
    return {
      isLogin: JSON.parse(window.localStorage.getItem("auth")!),
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
      userInfo:{

      },
      //系统配置
      config:{
        allSearch:true,
        allAnonChat:false,
        addFriendMode:0,
        addFriendQuestion:"我的名字",
        addFriendAnswer:"苏轼"
      },
      //联系人列表
      contactList:[
          {
              id: 1,
              name: "苏轼",
              lastmsg: "十年生死两茫茫，不思量，自难忘。"
          },
          {
              id: 2,
              name: "杜甫",
              lastmsg: "国破山河在，城春草木深。"
          },
          {
              id: 3,
              name: "李白",
              lastmsg: "君不见黄河之水天上来，奔流到海不复回。"
          },
          {
              id: 4,
              name: "白居易",
              lastmsg: "汉皇重色思倾国，御宇多年求不得。"
          },
          {
              id: 5,
              name: "王维",
              lastmsg: "空山新雨后，天气晚来秋。"
          }
      ],
      curContact:null,
      //聊天列表
      chatList:[
        {
          id: 1,
          name: "苏轼",
          lastmsg: "十年生死两茫茫，不思量，自难忘。",
          time:"刚刚"
      },
      {
          id: 2,
          name: "杜甫",
          lastmsg: "国破山河在，城春草木深。",
          time:"刚刚"
      },
      {
          id: 3,
          name: "李白",
          lastmsg: "君不见黄河之水天上来，奔流到海不复回。",
          time:"刚刚"
      },
      {
          id: 4,
          name: "白居易",
          lastmsg: "汉皇重色思倾国，御宇多年求不得。",
          time:"刚刚"
      },
      {
          id: 5,
          name: "王维",
          lastmsg: "空山新雨后，天气晚来秋。",
          time:"刚刚",
      },
       {
          id: 6,
          name: "王维",
          lastmsg: "空山新雨后，天气晚来秋。",
          time:"刚刚",
      },
       {
          id: 7,
          name: "王维",
          lastmsg: "空山新雨后，天气晚来秋。",
          time:"刚刚",
      },
       {
          id: 8,
          name: "王维",
          lastmsg: "空山新雨后，天气晚来秋。",
          time:"刚刚",
      }
      ],
      curChat:null,
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
  getters:{
    // contactList(state){
    //   return state.contactList;
    // },
    // chatList(state){
    //   return state.chatList;
    // }
  },

  actions: {
    setLogin(payload: any) {
      this.isLogin = payload;
      window.localStorage.setItem("auth", JSON.stringify(payload));
    },
    setLogout() {
      console.log("logout");
      window.localStorage.removeItem("auth");
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
