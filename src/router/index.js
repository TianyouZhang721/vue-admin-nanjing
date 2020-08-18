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
      ]
    }
  ]
})
