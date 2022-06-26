import { getCurrentInstance } from "vue";
import PostLoader from "@/post_loader/PostLoader";

export function usePostLoader() : PostLoader {
    const app = getCurrentInstance();
    
    if (!app) {
        throw "App not found!";
    }

    const postLoader = app.appContext.config.globalProperties.$postLoader as PostLoader;

    return postLoader;
}