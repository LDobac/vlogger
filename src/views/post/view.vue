<template>
    <LeftSideMenu />
    <article class="card post-view">
        <div class="title-wrap">
            <h1 class="title">
                {{post.title}}
                <SeriesButton v-if="post.series" :series="post.series"/>
            </h1>
            <p class="date">&#x1F4C5; {{post.date.format("YYYY년 MM월 DD일")}}</p>
            <TagsView 
                class="tags"
                :tags="post.tags" 
            />
        </div>
        <div 
            class="content markdown-body" 
            v-html="post.postContent"></div>
    </article>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import "highlight.js/styles/base16/google-light.css";
import hljs from "highlight.js/lib/common";

import "github-markdown-css";

import PostLoader from "@/post_loader/PostLoader";
import { LeftSideMenu } from "@/components/";
import { TagsView, SeriesButton } from "@/components/post";

export default defineComponent({
    name: "PostView",
    components : {
        LeftSideMenu,
        TagsView,
        SeriesButton,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        const app = getCurrentInstance();
        const postLoader = app?.appContext.config.globalProperties.$postLoader as PostLoader;

        try 
        {
            // Load post data
            const postId = parseInt(route.params.id as string);

            const post = postLoader.GetPostById(postId);

            if (!post)
            {
                router.push({
                    name: "NotFound",
                });
            }

            // Set hightlight.js
            onMounted(() => {
                hljs.highlightAll();
            });

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
    padding-bottom: 1rem;

    .title {
        font-size: 3rem;
        font-weight: bold;

        margin-bottom: 0.5rem;
    }

    .tags {
        padding-top: 1rem;
    }
}

.content {
    font-family: inherit;
    padding-top: 2rem;

    img {
        max-width: 100%;
        max-height: 100%;
    }
}


</style>
