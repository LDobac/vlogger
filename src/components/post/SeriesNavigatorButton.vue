<template>
    <router-link 
        class="series-button"
        :to="{
            name : 'PostView', 
            params : {
                id : props.post.uid
            }
        }"
    >
        <slot>
            {{props.post.title}}
        </slot>
    </router-link>
</template>

<script setup lang="ts">
import type Post from "@/post_loader/Post";

const props = defineProps<{post: Post}>();
</script>

<style lang="scss" scoped>
.series-button {
    width: 40%;
    min-width: 200px;
    max-width: 400px;
    padding: 16px;
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

    @include m-sm {
        min-width: unset;
        max-width: unset;

        width: 40%;
        font-size: 1.1rem;

        padding: 8px 0;
    }
}
</style>