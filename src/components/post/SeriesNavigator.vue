<template>
    <div 
        class="series-navigator"
        v-if="siblingSeriesPost"
    >
        <router-link 
            v-if="siblingSeriesPost.prev"
            class="prev-button series-button"
            :to="{
                name : 'PostView', 
                params : {
                    id : siblingSeriesPost.prev.id
                }
            }"
        >
            <p class="bold">이전</p>
            {{siblingSeriesPost.prev.title}}
        </router-link>
        <div v-else></div>

        <router-link 
            v-if="siblingSeriesPost.next"
            class="next-button series-button"
            :to="{
                name : 'PostView', 
                params : {
                    id : siblingSeriesPost.next.id
                }
            }"
        >
            <p class="bold">다음</p>
            {{siblingSeriesPost.next.title}}
        </router-link>
        <div v-else></div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { usePostLoader } from "@/composable/PostLoader";
import type Post from "@/post_loader/Post";

interface ISiblingSeriesPost {
    next? : {
        id: number;
        title: string;
    };
    prev? : {
        id: number;
        title: string;
    };
}

const props = defineProps<{post: Post}>();

const siblingSeriesPost = reactive<ISiblingSeriesPost>({});

const postLoader = usePostLoader();

const LoadSiblingPosts = () => {
    if (props.post.nextSeriesId)
    {
        const nextPost = postLoader.GetPostById(props.post.nextSeriesId);
    
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
    
    if (props.post.prevSeriesId)
    {
        const prevPost = postLoader.GetPostById(props.post.prevSeriesId);
    
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

LoadSiblingPosts();
watch(() => props.post, () => {
    LoadSiblingPosts();
});
</script>

<style lang="scss" scoped>
.series-navigator {
    display: flex;
    justify-content: space-between;
}

.series-button {
    width: 30%;
    min-width: 200px;
    max-width: 360px;
    padding: 16px 0;
    background: white;
    font-size: 1rem;
    border-radius: 12px;
    border: 1px solid var(--primary-color);
    text-decoration: none;
    color: black;

    .bold {
        font-weight: bold;
        font-size: 0.8rem;
        margin-bottom: 0.25rem;
    }

    &:hover {
        color: white;
        background-color: var(--series-primary-color);
    }

    &.prev-button {
        text-align: left;
        padding-left: 40px;

        @include m-sm {
            padding-left: 16px;
        }
    }

    &.next-button {
        text-align: right;
        padding-right: 40px;

        @include m-sm {
            padding-right: 16px;
        }
    }

    @include m-sm {
        min-width: unset;
        max-width: unset;

        width: 40%;
        font-size: 1.1rem;

        padding: 8px 0;
    }
}


</style>