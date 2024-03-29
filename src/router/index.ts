import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

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
        path: "/post/:id(\\d+)",
        name: "PostView",
        component: () => import(/* webpackChunkName: "post_view" */ "../views/post/PostView.vue"),
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
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
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
