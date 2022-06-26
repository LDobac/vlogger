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
import { computed, defineComponent, PropType } from "vue";
import PostItem from "./PostItem.vue";
import { IPostFilter } from "@/post_loader/models";
import { usePostLoader } from "@/composable/PostLoader";

export default defineComponent({
    name: "PostList",
    props : {
        filter : {
            type : Object as PropType<IPostFilter | null>,
        }
    },
    components : { PostItem },
    setup(props) {
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