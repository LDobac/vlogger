import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import PostView from "../views/post/view.vue";
import NotFound from "../views/errors/404.vue";
import Error from "../views/errors/500.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/post/:id(\\d+)",
        name: "PostView",
        component: PostView,
    },
    {
        path: "/404",
        name: "NotFound",
        component: NotFound,
    },
    {
        path: "/error",
        name: "Error",
        component: Error,
    },
    // {
    //     path: "/about",
    //     name: "About",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
    // }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
