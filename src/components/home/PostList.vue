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

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import PostLoader from "@/post_loader/PostLoader";
import PostItem from "./PostItem.vue";

export default defineComponent({
    name: "PostList",
    components : { PostItem },
    setup() {
        const app = getCurrentInstance();
        const postLoader = app?.appContext.config.globalProperties.$postLoader as PostLoader;

        const posts = postLoader.GetRecentPosts(10, 0);

        return {
            posts
        }
    },
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