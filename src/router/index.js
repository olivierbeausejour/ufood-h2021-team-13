import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Restaurant from "@/pages/Restaurant";
import User from "@/pages/User";
import Login from "@/pages/Login";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.use(Router);
Vue.use(Buefy);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: true
    },
    {
      path: "/restaurant/:id",
      name: "restaurant",
      component: Restaurant,
      props: true
    },
    {
      path: "/user/:id",
      name: "user",
      component: User,
      props: true
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      props: true
    }
  ]
});
