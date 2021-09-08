import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import NotFound from "../views/errors/404.vue";
import Error from "../views/errors/500.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        component: About
    },
    {
        path: "/post/:id(\\d+)",
        name: "PostView",
        component: () => import(/* webpackChunkName: "about" */ "../views/post/view.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
    {
        path: "/error",
        name: "Error",
        component: Error,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
