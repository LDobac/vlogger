<template>
    <div
        class="series-navigator"
        v-if="nextPost || prevPost"
    >
        <div class="link">
            <SeriesNavigatorButton
                v-if="prevPost"
                class="navigator-button"
                :post="prevPost as Post"
            >
                <i>&#10140;</i>
                <span>{{prevPost.title}}</span>
            </SeriesNavigatorButton>
            <div v-else></div>

            <SeriesNavigatorButton
                v-if="nextPost"
                class="navigator-button"
                :post="nextPost as Post"
            >
                <span>{{nextPost.title}}</span>
                <i>&#10140;</i>
            </SeriesNavigatorButton>
            <div v-else></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { usePostLoader } from "@/composable/PostLoader";
import { SeriesNavigatorButton } from ".";
import type Post from "@/post_loader/Post";

const props = defineProps<{post: Post}>();

const nextPost = ref<Post | null>(null);
const prevPost = ref<Post | null>(null);

const postLoader = usePostLoader();

const LoadSiblingPosts = () => {
    if (props.post.nextSeriesId)
    {
        nextPost.value = postLoader.GetPostById(props.post.nextSeriesId);
    }
    else
    {
        nextPost.value = null;
    }

    if (props.post.prevSeriesId)
    {
        prevPost.value = postLoader.GetPostById(props.post.prevSeriesId);
    }
    else
    {
        prevPost.value = null;
    }
};

LoadSiblingPosts();
watch(() => props.post, () => {
    LoadSiblingPosts();
});
</script>

<style lang="scss" scoped>
.link {
    display: flex;
    justify-content: space-between;
}

.navigator-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    i {
        font-size: 32px;
    }

    span {
        text-wrap: balance;
        word-wrap: break-word;
    }

    &:first-of-type {
        i {
            transform: rotate(180deg);
        }

        span {
            text-align: right;
        }
    }

    &:last-of-type {
        span {
            text-align: left;
        }
    }
}
</style>