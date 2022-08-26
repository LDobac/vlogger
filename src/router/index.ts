import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

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
        component: () => import(/* webpackChunkName: "post_view" */ "../views/post/view.vue"),
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
            }
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
