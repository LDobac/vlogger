import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "dayjs/locale/ko";
dayjs.locale("ko");

import PostLoader from "./post_loader/PostLoader";
import dayjs from "dayjs";

const app = createApp(App);
app.config.globalProperties.$postLoader = new PostLoader();

app.use(router).mount("#app");
