<template>
    <router-link 
        :to="{
            name : 'PostView', 
            params : {
                id : post.slug
            }
        }"
    >
        <div class="post-item card">
            <div 
                v-if="post.thumbnail"
                class="thumbnail"
            >
                <img :src="post.thumbnail">
            </div>
            <div class="content">
                <div class="info">
                    <h1 class="post-title">
                        {{post.title}}
                        <SeriesLink v-if="post.series" :series="post.series"/>
                    </h1>
                    <FormattedDate 
                        :date="post.date"
                    />
                    <TagsView 
                        v-if="post.tags.length > 0"
                        class="tags"
                        :tags="post.tags"
                    />
                </div>
                <p class="post-summary" v-if="post.summary">{{post.summary}}</p>
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import type Post from "@/post_loader/Post";

import { FormattedDate } from "@/components";
import { TagsView, SeriesLink } from "@/components/post";
import { toRef } from "vue";

const props = defineProps<{post: Post}>();
const post = toRef(props.post);
</script>

<style lang="scss" scoped>
a {
    color: black;
    text-decoration: none;
}

.post-item {
    padding: 0;

    .content {
        padding: 2rem;

        @include m-sm {
            padding: 1.15rem;
        }

        .info {
            .post-title {
                font-size: 2rem;
                margin-bottom: 1rem;

                @include m-md {
                    font-size: 1.5rem;
                }

                @include m-sm {
                    font-size: 1.25rem;
                    margin-bottom: 0.5rem;
                }
            }

            .post-date {
                @include m-sm {
                    font-size: 0.9rem;
                }
            }
        }

        .post-summary {
            margin-top: 1.5rem;

            @include m-sm {
                margin-top: 1rem;
                font-size: 0.9rem;
            }
        }
    }

    .thumbnail {
        img {
            width: 100%;
            height: 100%;
            max-height: 300px;
            object-fit: cover;
            border-radius: 12px 12px 0 0;
        }
    }
}

.tags {
    padding-top: 1rem;
}
</style>