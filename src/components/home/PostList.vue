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
import { computed, defineComponent, getCurrentInstance, PropType } from "vue";
import PostLoader from "@/post_loader/PostLoader";
import PostItem from "./PostItem.vue";
import { PostFilter } from "@/post_loader/models";

export default defineComponent({
    name: "PostList",
    props : {
        filter : {
            type : Object as PropType<PostFilter>,
        }
    },
    components : { PostItem },
    setup(props) {
        const app = getCurrentInstance();
        const postLoader = app?.appContext.config.globalProperties.$postLoader as PostLoader;

        const posts = computed(() => {
            if (props.filter?.type)
            {
                return postLoader.GetRecentPosts(-1, 0, props.filter);
            }
            else
            {
                return postLoader.GetRecentPosts(-1);
            }
        });

        return {
            posts,
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