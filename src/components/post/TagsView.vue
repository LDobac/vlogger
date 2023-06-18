<template>
    <div class="tags-wrap">
        <router-link 
            class="rounded-button tag"
            v-for="tag in tags"
            :key="tag.id"
            :to="{
                path : '/',
                query : {
                    tag : tag.id,
                },
            }"
        >
            {{tag.name}}
        </router-link>
    </div>
</template>

<script lang="ts">
import { Tag } from "@/post_loader/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
    name : "TagsView",
    props : {
        tags : {
            type : Object as PropType<Tag[]>
        }
    },
    setup() {
        //
    },
})
</script>

<style lang="scss" scoped>
button {
    cursor: pointer;
}

.tags-wrap {
    display: flex;
    flex-direction: row;

    .tag {
        margin-right: 10px;
        text-decoration: none;

        @include m-md {
            font-size: 0.9rem;
        }

        @include m-sm {
            font-size: 0.8rem;
        }
    }
}
</style>