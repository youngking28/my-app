
import Vue from "vue";
import Router from "vue-router";

//组件
import manageIndex from "@/components/manageIndex";
import Login from "@/components/Login";
Vue.use(Router);

export default new Router({
  routes: [
        {
            name: "Login",
            path: "/",
            component: Login
          },
          {
        name: "manageIndex",
        path: "/manageIndex",
        component: manageIndex
    }]
  });