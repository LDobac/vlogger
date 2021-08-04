import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PostLoader from "./post_loader/PostLoader";

const app = createApp(App);
app.config.globalProperties.$postLoader = new PostLoader();

app.use(router).mount("#app");
