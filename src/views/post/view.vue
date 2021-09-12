<template>
    <ContentWithSideMenu>
        <div class="post-view">
            <div class="card content">
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
                <article 
                    class="markdown-body" 
                    v-html="post.postContent"></article>
            </div>

            <div class="extra-content">
                <SeriesNavigator 
                    class="series-navigator"
                    v-if="post.series"
                    :siblingSeriesPost="siblingSeriesPost"
                />
            </div>
        </div>
    </ContentWithSideMenu>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import "highlight.js/styles/base16/google-light.css";
import hljs from "highlight.js/lib/common";

import "github-markdown-css";

import PostLoader from "@/post_loader/PostLoader";
import { TagsView, SeriesButton, SeriesNavigator } from "@/components/post";
import { ContentWithSideMenu } from "@/components/layouts";
import Post from "@/post_loader/Post";

export default defineComponent({
    name: "PostView",
    components : {
        TagsView,
        ContentWithSideMenu,
        SeriesButton,
        SeriesNavigator
    },
    setup() {
        // Set hightlight.js
        onMounted(() => {
            hljs.highlightAll();
        });

        const router = useRouter();
        const route = useRoute();

        const app = getCurrentInstance();
        const postLoader = app?.appContext.config.globalProperties.$postLoader as PostLoader;

        const post = ref<Post | null>(null);
        const siblingSeriesPost = reactive({
            next : {},
            prev : {},
        });

        const LoadPost = (postId : number) => {
            post.value = postLoader.GetPostById(postId);
            if (!post.value)
            {
                router.push({
                    name: "NotFound",
                });
            }

            if (post.value?.nextSeriesId)
            {
                const nextPost = postLoader.GetPostById(post.value.nextSeriesId);

                siblingSeriesPost.next = {
                    id : nextPost?.uid,
                    title : nextPost?.title
                };
            }
            else
            {
                siblingSeriesPost.next = {};
            }

            if (post.value?.prevSeriesId)
            {
                const prevPost = postLoader.GetPostById(post.value.prevSeriesId);

                siblingSeriesPost.prev = {
                    id : prevPost?.uid,
                    title : prevPost?.title
                };
            }
            else
            {
                siblingSeriesPost.prev = {};
            }
        }

        watch(() => route.params.id, (value) => {
            if (value)
            {
                LoadPost(parseInt(route.params.id as string));
            }
        });

        LoadPost(parseInt(route.params.id as string));

        return {
            post,
            siblingSeriesPost
        };
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

article {
    font-family: inherit !important;
    padding-top: 2rem;

    img {
        max-width: 100%;
        max-height: 100%;
    }
}

.series-navigator {
    margin-top: 2rem;
}

</style>
