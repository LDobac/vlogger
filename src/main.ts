import { createApp as createVueApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGtag from "vue-gtag";
import PostLoader from "./post_loader/PostLoader";
import "dayjs/locale/ko";
import dayjs from "dayjs";

dayjs.locale("ko");

export async function createApp()
{
    const postLoader = new PostLoader();
    await postLoader.LoadMetadatas();

    const app = createVueApp(App);
    // TODO : Provide/Inject 방식으로 변경
    app.config.globalProperties.$postLoader = postLoader;
        
    // Enable Vue Router
    app.use(router);
    
    // Enable GA
    if (import.meta.env.NODE_ENV === "production")
    {
        app.use(VueGtag, {
            config : {
                id : "G-BLG37NTK4J",
            }
        }, router);
    }

    return { app, router };
}

