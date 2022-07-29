

import AppLayout from "../layout/AppLayout.vue";
import login from "../page/auth/Login.vue";
import signup from "../page/auth/Signup.vue";
import Page404 from "../page/Page404.vue";




const route = [
  {
    path: "/",
    name:"home",
    component: AppLayout,
    children:[
      {
        path: "/chat",
        component: () => import(`../page/chat/Index.vue`),
        children: [
          {
            path: ":id",           
            component: () => import(`../page/chat/Session.vue`),
            children: [
                {
                  path: "chat",           
                  component: () => import(`../page/chat/Chat.vue`),
                },
                {
                  path: "profile",           
                  component: () => import(`../page/chat/Profile.vue`),
                }
            ]
          },
         
        ]
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
                }
            ]
          },
         
        ]
      },
    ]
  },
  {
    path: "/my",
    component: AppLayout,
    children: [
      {
        path: "profile",
        component: () => import(`../page/my/Profile.vue`),
      },
    ]
  },
  {
    path: "/search",
    component: AppLayout,
    children: [
      {
        path: "",
        component: () => import(`../page/system/Search.vue`),
      },
    ]
  },
  {
    path: "/setting",
    component: AppLayout,
    children: [
      {
        path: "",
        component: () => import(`../page/system/Setting.vue`),
      },
    ]
  },
  {
    path: "/message",
    component: AppLayout,
    children: [
      {
        path: "",
        component: () => import(`../page/system/Message.vue`),
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: login,
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


console.log(route);





export default route;
