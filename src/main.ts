import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGtag from "vue-gtag-next";
import PostLoader from "./post_loader/PostLoader";
import "dayjs/locale/ko";
import dayjs from "dayjs";

dayjs.locale("ko");

const app = createApp(App);
app.config.globalProperties.$postLoader = new PostLoader();

app
    .use(router)
    .use(VueGtag, {
        property : {
            id : "G-BLG37NTK4J",
        }
    })
    .mount("#app");
