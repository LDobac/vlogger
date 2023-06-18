<template>
    <div class="post-list">
        <post-item 
            class="post-item"
            v-for="post in posts"
            :key="post.uid"
            :post="post"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PostItem from "./PostItem.vue";
import { IPostFilter } from "@/post_loader/models";
import { usePostLoader } from "@/composable/PostLoader";

const props = defineProps<{filter: IPostFilter | null}>();

const postLoader = usePostLoader();

const posts = computed(() => {
    if (props.filter)
    {
        return postLoader.GetRecentPosts(-1, 0, props.filter);
    }
    else
    {
        return postLoader.GetRecentPosts(-1);
    }
});
</script>

<style lang="scss" scoped>
.post-list {
    display: flex;
    flex-direction: column;

    .post-item {
        margin-bottom: 1rem;
    }
}
</style>