<template>
    <div class="tags-wrap">
        <button
            type="button"
            class="rounded-button tag"
            @click="onButtonClick(tag.id)"
            v-for="tag in tags"
            :key="tag.id"
        >
            {{tag.name}}
        </button>
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
        const onButtonClick = (/* index : number */) => {
            // 
        };

        return {
            onButtonClick,
        }
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
    }
}
</style>