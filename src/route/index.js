

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
    path: "/contact",
    component: AppLayout,
    children: [
      {
        path: "index",
        component: () => import(`../page/contact/Index.vue`),
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