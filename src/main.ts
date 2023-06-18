import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGtag from "vue-gtag";
import PostLoader from "./post_loader/PostLoader";
import "dayjs/locale/ko";
import dayjs from "dayjs";

dayjs.locale("ko");

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

    app.mount("#app");
});

