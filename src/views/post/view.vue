<template>
    <LeftSideMenu />
    <article class="card post-view">
        <div class="content" v-html="post.postContent"></div>
    </article>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LeftSideMenu } from "@/components/";
import PostLoader from "@/post_loader/PostLoader";

export default defineComponent({
    name: "PostView",
    components : {
        LeftSideMenu,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        const app = getCurrentInstance();
        const postLoader = app?.appContext.config.globalProperties.$postLoader as PostLoader;

        try 
        {
            const postId = parseInt(route.params.id as string);

            const post = postLoader.GetPostById(postId);

            if (!post)
            {
                router.push({
                    name: "NotFound",
                });
            }

            return {
                post,
            };
        } 
        catch (error) 
        {
            console.log(error);

            router.push({
                name: "Error",
                params : {
                    reason : "",
                },
            });
        }
    },
})
</script>

<style lang="scss">
.post-view {
    grid-area: main;
    width: 100%;
    height: 100%;
}

.content {
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
