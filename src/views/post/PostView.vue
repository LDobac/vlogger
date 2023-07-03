<template>
    <div class="post-view">
        <div class="post-container" v-if="post">
            <div class="card content">
                <div class="title-wrap">
                    <TagsView 
                        class="tags"
                        :tags="post.tags" 
                    />
                    <h1 class="title">
                        {{post.title}}
                        <SeriesLink v-if="post.series" :series="post.series"/>
                    </h1>
                    <div class="dates">
                        <div class="write-date">
                            <span>처음 작성일&nbsp;:&nbsp;</span>
                            <FormattedDate 
                                :date="post.date"
                            />
                        </div>
                        <div class="last-edit-date" v-if="post.lastEditDate">
                            <span>최근 수정일&nbsp;:&nbsp;</span>
                            <FormattedDate 
                                :date="post.lastEditDate"
                            />
                        </div>
                    </div>
                </div>
                <article 
                    class="markdown-body" 
                    v-html="content"></article>
            </div>

            <div class="series-navigator-container">
                <SeriesNavigator
                    v-if="post.series"
                    :post="post as Post"
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
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import "highlight.js/styles/base16/google-light.css";
import hljs from "highlight.js/lib/common";

import "github-markdown-css";

import { FormattedDate } from "@/components";
import { TagsView, SeriesLink, SeriesNavigator } from "@/components/post";
import Post from "@/post_loader/Post";
import { usePostLoader } from "@/composable/PostLoader";
import { useMeta } from "vue-meta";

// Set hightlight.js
onMounted(() => {
    hljs.highlightAll();
});

const router = useRouter();
const route = useRoute();

const postLoader = usePostLoader();

const post = ref<Post | null>(null);
const content = ref<string | undefined>("");

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
};

watch(() => route.params.id, (value) => {
    if (value)
    {
        LoadPost(parseInt(route.params.id as string));
    }
});

LoadPost(parseInt(route.params.id as string));

const metaTags = computed(() => {
    const postTitle = post.value?.title ? post.value.title : "Jaehee.dev";
    const postDesc = post.value?.summary ? post.value.summary : "개발하면서 발생한 혹은 개발과 관련된 이야기를 나누고자 합니다.";
    const postThumbnail = post.value?.thumbnail ? post.value.thumbnail : require("@/assets/images/profile_image.webp");
    console.log(post.value);

    return {
        title: postTitle,
        description: postDesc,
        og: {
            title: postTitle,
            description: postDesc,
            url: router.currentRoute.value.fullPath,
            image: [
                postThumbnail
            ],
            type: "website"
        },
    }; 
});
useMeta(metaTags);
</script>

<style lang="scss">
.post-view {
    grid-area: main;
    width: 100%;
    max-width: 1200px;

    .content {
        .title-wrap {
            border-bottom: 1px solid black;
            padding-bottom: 1.5rem;

            .title {
                font-size: 3rem;
                font-weight: bold;

                margin-top: 0.5rem;
                margin-bottom: 1.5rem;

                @include m-sm {
                    font-size: 2rem;
                }
            }

            .tags {
                padding-bottom: 1rem;
            }

            .dates {
                color: #000000ab;

                .write-date {
                    margin-bottom: 0.5rem;
                }

                @include m-sm {
                    font-size: 0.9rem;
                }
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
