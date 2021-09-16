<template>
    <div 
        class="series-navigator"
    >
        <router-link 
            v-if="siblingSeriesPost.prev.id"
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
            v-if="siblingSeriesPost.next.id"
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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props : {
        siblingSeriesPost : Object,
    }
})
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
    font-size: 1.5rem;
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