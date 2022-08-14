import AppLayout from "../layout/AppLayout.vue";
import login from "../page/auth/Login.vue";
import signup from "../page/auth/Signup.vue";
import Page404 from "../page/Page404.vue";

const route = [
  {
    path: "/",
    name: "home",
    component: AppLayout,

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
            component: () => import(`../page/system/Search.vue`),
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
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/my",
    meta: {
      name: "my",
    },
    component: AppLayout,
    children: [
      {
        path: "profile",
        component: () => import(`../page/my/Profile.vue`),
      },
    ],
  },
  {
    path: "/search",
    component: AppLayout,
    meta: {
      name: "home",
    },
    children: [
      {
        path: "",
        component: () => import(`../page/system/Search.vue`),
      },
    ],
  },
  {
    path: "/setting",
    component: AppLayout,
    children: [
      {
        path: "",
        component: () => import(`../page/system/Setting.vue`),
      },
    ],
  },
  {
    path: "/message",
    component: AppLayout,
    redirect: "/message/inbox/unreadMessage",
    children: [
      {
        path: "inbox",
        name: "inbox",
        component: () => import(`../page/message/Inbox.vue`),
        children: [
          {
            path: "allMessage",
            component: () => import(`../page/message/AllMessage.vue`),
          },
          {
            path: "unreadMessage",
            component: () => import(`../page/message/UnreadMessage.vue`),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/agreement",
    name: "agreement",
    component: () => import(`../page/auth/Agreement.vue`),
  },
  {
    path: "/reset_password",
    name: "reset_password",
    component: () => import(`../page/auth/resetPassword.vue`),
  },
  {
    path: "/signup",
    name: "signup",
    component: signup,
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
