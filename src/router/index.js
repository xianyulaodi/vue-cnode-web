import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/index";
import Detail from "@/views/detail";
import NewTopic from "@/views/newTopic";
import Login from "@/views/Login";
import Message from "@/views/message";
import User from "@/views/user";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: { name: "list" }
    },
    {
      path: "/list",
      name: "list",
      component: Index
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: Detail
    },
    {
      path: "/create",
      name: "create",
      component: NewTopic,
      meta: { requiresAuth: true } // 路由元信息，用于登录验证
    },
    {
      path: "/update/:topic_id",
      name: "update",
      component: NewTopic,
      meta: { requiresAuth: true } // 路由元信息，用于登录验证
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/message",
      name: "message",
      component: Message,
      meta: { requiresAuth: true }
    },
    {
      path: "/user/:loginname",
      name: "user",
      component: User
    }
  ]
});
