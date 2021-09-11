<template>
    <div 
        class="series-navigator"
    >
        <router-link 
            v-if="siblingSeriesPost.prev.id"
            class="prev-button rounded-button"
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
            class="next-button rounded-button"
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
    margin-top: 3rem;

    display: flex;
    justify-content: space-between;
}

.prev-button {
    text-align: left;
    padding: 20px 0px 20px 40px;
}

.next-button {
    text-align: right;
    padding: 20px 40px 20px 0px;
}

.rounded-button {
    min-width: 200px;
    max-width: 360px;
    width: 30%;

    .bold {
        font-weight: bold;
        font-size: 0.8rem;
        margin-bottom: 0.25rem;
    }

    background: white;

    font-size: 1.5rem;
    border-radius: 12px;
    border: 1px solid var(--primary-color);

    color: black;

    &:hover {
        color: white;
        background-color: var(--series-primary-color);
    }

    text-decoration: none;
}
</style>