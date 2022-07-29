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
