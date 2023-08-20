import { createRouter, createMemoryHistory, createWebHistory, RouteRecordRaw } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import { ErrorPage404, ErrorPage500 } from "../views/errors";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: HomeView
    },
    {
        path: "/about",
        name: "About",
        component: AboutView
    },
    {
        path: "/post/:id",
        name: "PostView",
        component: () => import("../views/post/PostView.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: ErrorPage404,
    },
    {
        path: "/error",
        name: "Error",
        component: ErrorPage500,
    },
];

const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, _, savedPosition) {
        if (savedPosition) 
        {
            return savedPosition;
        }
        else if (to.hash)
        {
            return {
                el: to.hash,
                behavior: "smooth",
            };
        }
        else 
        {
            return { 
                top: 0,
            };
        }
    },
});

export default router;
