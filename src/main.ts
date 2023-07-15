import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGtag from "vue-gtag";
import PostLoader from "./post_loader/PostLoader";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import { createMetaManager } from "vue-meta";
import eruda from "eruda";

dayjs.locale("ko");

if (process.env.NODE_ENV !== "production")
{
    const el = document.createElement("div");
    document.body.appendChild(el);
    
    eruda.init({
        container: el,
        tool: ["console", "elements"]
    });
}

const postLoader = new PostLoader();
postLoader.LoadMetadatas().then(() => {
    const app = createApp(App);
    // TODO : Provide/Inject 방식으로 변경
    app.config.globalProperties.$postLoader = postLoader;
    
    app.use(router);

    app.use(VueGtag, {
        config : {
            id : "G-BLG37NTK4J",
        }
    }, router);

    const metaManager = createMetaManager();
    app.use(metaManager);

    app.mount("#app");
});

