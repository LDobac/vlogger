<template>
    <div class="post-view">
        <div class="post-container" v-if="post">
            <div class="card content">
                <div class="title-wrap">
                    <h1 class="title">
                        {{post.title}}
                        <SeriesButton v-if="post.series" :series="post.series"/>
                    </h1>
                    <FormattedDate 
                        :date="post.date"
                    />
                    <TagsView 
                        class="tags"
                        :tags="post.tags" 
                    />
                </div>
                <article 
                    class="markdown-body" 
                    v-html="content"></article>
            </div>

            <div class="series-navigator-container">
                <SeriesNavigator 
                    v-if="post.series"
                    :siblingSeriesPost="siblingSeriesPost"
                />
            </div>
        </div>
        <div v-else>
            <div class="card content">
                <div class="title-wrap">
                    <h1 class="title">
                        <p>Error!</p>
                        <p>Content Not found!</p>
                    </h1>
                </div>
                <div>
                    <button @click="router.back()">Go Back</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import "highlight.js/styles/base16/google-light.css";
import hljs from "highlight.js/lib/common";

import "github-markdown-css";

import { FormattedDate } from "@/components";
import { TagsView, SeriesButton, SeriesNavigator } from "@/components/post";
import Post from "@/post_loader/Post";
import { usePostLoader } from "@/composable/PostLoader";

export interface ISiblingSeriesPost {
    next? : {
        id: number;
        title: string;
    };
    prev? : {
        id: number;
        title: string;
    };
}

// Set hightlight.js
onMounted(() => {
    hljs.highlightAll();
});

const router = useRouter();
const route = useRoute();

const postLoader = usePostLoader();

const post = ref<Post | null>(null);
const content = ref<string | undefined>("");
const siblingSeriesPost = reactive<ISiblingSeriesPost>({});

const LoadPost = async (postId : number) => {
    post.value = postLoader.GetPostById(postId);
    if (!post.value)
    {
        router.push({
            name: "NotFound",
        });

        return;
    }

    content.value = await post.value.GetContent();

    if (post.value.nextSeriesId)
    {
        const nextPost = postLoader.GetPostById(post.value.nextSeriesId);

        if (nextPost) {
            siblingSeriesPost.next = {
                id : nextPost.uid,
                title : nextPost.title
            };
        }
    }
    else 
    {
        siblingSeriesPost.next = undefined;
    }

    if (post.value.prevSeriesId)
    {
        const prevPost = postLoader.GetPostById(post.value.prevSeriesId);

        if (prevPost) {
            siblingSeriesPost.prev = {
                id : prevPost.uid,
                title : prevPost.title
            };
        }
    }
    else 
    {
        siblingSeriesPost.prev = undefined;
    }
};

watch(() => route.params.id, (value) => {
    if (value)
    {
        LoadPost(parseInt(route.params.id as string));
    }
});

LoadPost(parseInt(route.params.id as string));
</script>

<style lang="scss">
.post-view {
    grid-area: main;
    width: 100%;
    max-width: 1200px;

    .content {
        .title-wrap {
            border-bottom: 1px solid black;
            padding-bottom: 1rem;

            .title {
                font-size: 3rem;
                font-weight: bold;

                margin-bottom: 0.5rem;

                @include m-sm {
                    font-size: 2rem;
                }
            }

            .tags {
                padding-top: 1rem;
            }
        }

        @include m-sm {
            padding-left: 1rem;
            padding-right: 1rem;
        }
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

.series-navigator-container {
    margin-top: 2rem;

    @include m-sm {
        margin-top: 1.5rem;
    }
}

</style>
