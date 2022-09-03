

import Page404 from "../page/Page404.vue";

const route = [
  {
    path: "/",
    name: "home",
    component: () => import(`../layout/AppLayout.vue`),

    children: [
      {
        path: "/session",
        component: () => import(`../page/session/Index.vue`),
        children: [
          {
            path: ":id",
            component: () => import(`../page/session/Session.vue`),
            children: [
              {
                path: "chat",
                component: () => import(`../page/chat/Chat.vue`),
              },
              {
                path: "profile",
                component: () => import(`../page/session/SessionProfile.vue`),
              },
            ],
          },
          {
            path: "",
            component: () => import(`../page/contact/Search.vue`),
          },
        ],
      },
      {
        path: "/contact",
        component: () => import(`../page/contact/Index.vue`),
        children: [
          {
            path: ":id",
            component: () => import(`../page/contact/Info.vue`),
            children: [
              {
                path: "profile",
                component: () => import(`../page/contact/Profile.vue`),
              },
              {
                path: "setting",
                component: () => import(`../page/contact/Setting.vue`),
                // redirect: "base",
              },
            ],
          },
          {
            path: "",
            component: () => import(`../page/contact/Search.vue`),
          }
        ],
      },
      {
        path: "/group",
        component: () => import(`../page/group/Index.vue`),
        children: [
          {
            path: "create",
            component: () => import(`../page/group/Create.vue`),
          },
          {
            path: ":id",
            component: () => import(`../page/group/Info.vue`),
            children: [
              {
                path: "profile",
                component: () => import(`../page/group/Profile.vue`),
              },
              {
                path: "setting",
                component: () => import(`../page/group/Setting.vue`),
                // redirect: "base",
                children: [
                  {
                    path: "base",
                    component: () => import(`../page/group/SettingBase.vue`),
                  },
                  {
                    path: "group_users",
                    component: () => import(`../page/group/GroupUser.vue`),
                  },
                  {
                    path: "",
                    component: () => import(`../page/group/SettingBase.vue`),
                  }
                ]
              },
            ],
          },
          {
            path: "search",
            component: () => import(`../page/group/GroupSearch.vue`),
          },
          {
            path: "",
            component: () => import(`../page/group/GroupSearch.vue`),
          },
        ],
      },
      {
        path: "/account",
        meta: {
          name: "account",
        },
        component: () => import(`../page/account/Index.vue`),
        children: [
          {
            path: "setting",
            component: () => import(`../page/account/Setting.vue`),
          },
          {
            path: "profile",
            component: () => import(`../page/account/Profile.vue`),
          },
          {
            path: "group",
            component: () => import(`../page/account/GroupSetting.vue`),
          },
          {
            path: "data",
            component: () => import(`../page/account/Data.vue`),
          },
          {
            path: "virtual_account",
            component: () => import(`../page/account/VirtualAccount.vue`),
          }
        ]
      },
      {
        path: "/message",
        meta: {
          name: "message",
        },
        component: () => import(`../page/message/Index.vue`),
        children: [
          {
            path: "all",
            component: () => import(`../page/message/AllMessage.vue`),
          },
          {
            path: "unread",
            component: () => import(`../page/message/UnreadMessage.vue`),
          },
          {
            path: "",
            component: () => import(`../page/message/UnreadMessage.vue`),
          },
        ]
      }
    ],
  },
  {
    path: "/login",
    name: "login",
    component: import(`../page/auth/Login.vue`),
  },
  {
    path: "/agreement",
    name: "agreement",
    component: () => import(`../page/auth/Agreement.vue`),
  },
  {
    path: "/reset_password",
    name: "reset_password",
    component: () => import(`../page/auth/ResetPassword.vue`),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import(`../page/auth/Signup.vue`),
  },
  {
    path: "/404",
    name: "Not Found",
    component: Page404,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Page404",
    redirect: "/404",
  },
];

export default route;
