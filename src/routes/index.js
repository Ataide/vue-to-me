import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../views/Home.vue';
import Room from '../views/Room.vue';

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/room/:id", name: "room", component: Room, props: true },
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});