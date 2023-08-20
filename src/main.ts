import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGtag from "vue-gtag";
import PostLoader from "./post_loader/PostLoader";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import { createMetaManager } from "vue-meta";

dayjs.locale("ko");

const postLoader = new PostLoader();
await postLoader.LoadMetadatas();

const app = createApp(App);
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

// Enable meta tag
const metaManager = createMetaManager();
app.use(metaManager);

app.mount("#app");

export { app, router };

