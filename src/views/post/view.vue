<template>
    <LeftSideMenu />
    <article class="card post-view">
        <div class="title-wrap">
            <h1 class="title">{{post.title}}</h1>
            <p class="date">{{post.date.format("YYYY년 MM월 DD일")}}</p>
        </div>
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
}

.title-wrap {
    border-bottom: 1px solid black;
    padding-bottom: 2rem;

    .title {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .date {

    }
}

.content {
    padding-top: 2rem;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>
