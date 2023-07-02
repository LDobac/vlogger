<template>
    <div
        class="series-navigator"
        v-if="nextPost || prevPost"
    >
        <div class="info">
            <SeriesLink class="series-link" :series="((prevPost ?? nextPost) as Post).series as Series"/>
            <span>&nbsp;시리즈의 다른 게시물도 확인해보세요!</span>
        </div>
    
        <div class="link">
            <SeriesNavigatorButton
                v-if="prevPost"
                class="navigator-button"
                :post="prevPost as Post"
            >
                <i>&#10140;</i>
                <span>{{prevPost.title}}</span>
            </SeriesNavigatorButton>
            <a class="dummy navigator-button" v-else></a>

            <SeriesNavigatorButton
                v-if="nextPost"
                class="navigator-button"
                :post="nextPost as Post"
            >
                <span>{{nextPost.title}}</span>
                <i>&#10140;</i>
            </SeriesNavigatorButton>
            <a class="dummy navigator-button" v-else></a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { usePostLoader } from "@/composable/PostLoader";
import { SeriesLink, SeriesNavigatorButton } from ".";
import type Post from "@/post_loader/Post";
import type { Series } from "@/post_loader/models";

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
.info {
    background: white;
    border-radius: 12px;
    padding: 16px;
    font-size: 1rem;
    margin-bottom: 1rem;
    text-align: center;

    .series-link {
        font-size: 1.3rem;
    }
}

.link {
    display: flex;
    justify-content: space-between;

    @include m-sm {
        flex-direction: column;
    }
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

    &:nth-of-type(1) {
        i {
            transform: rotate(180deg);
        }

        span {
            text-align: right;
        }

        @include m-sm {
            margin-bottom: 1rem;
        }
    }

    &:nth-of-type(2) {
        span {
            text-align: left;
        }
    }
}
</style>