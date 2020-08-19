import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import("@/pages/Container/Container"),
      children: [
        {
          path: "menu",
          component: () => import("@/pages/Menu/Menu")
        },
        {
          path: "menu/add",
          component: () => import("@/pages/Menu/Edit")
        },
        {
          path: "/menu/:id",
          component: () => import("@/pages/Menu/Edit")
        },
        {
          path: "role",
          component: () => import("@/pages/Role/Role")
        },
        {
          path: "role/add",
          component: () => import("@/pages/Role/Edit")
        },
        {
          path: "/role/:id",
          component: () => import("@/pages/Role/Edit")
        },
        {
          path: "user",
          component: () => import("@/pages/User/User")
        },
        {
          path: "user/add",
          component: () => import("@/pages/User/Edit")
        },
        {
          path: "/user/:id",
          component: () => import("@/pages/User/Edit")
        },
        {
          path: "category",
          component: () => import("@/pages/Category/Category")
        },
        {
          path: "category/add",
          component: () => import("@/pages/Category/Edit")
        },
        {
          path: "/category/:id",
          component: () => import("@/pages/Category/Edit")
        },
        {
          path: "goods",
          component: () => import("@/pages/Goods/Goods")
        },
        {
          path: "goods/add",
          component: () => import("@/pages/Goods/Edit")
        },
      ]
    },
    {
      path: "/login",
      component:() => import("@/pages/Login/Login")
    }
  ]
})
