<template>
    <span 
        class="series-link-wrap"
        v-if="series"
    >
        <router-link 
            class="series-link" 
            :to="{
                path : '/',
                query : {
                    series : series.id,
                },
            }"
        >{{series.name}}</router-link>
    </span>
</template>

<script setup lang="ts">
import type { Series } from "@/post_loader/models";
import { toRef } from "vue";

const props = defineProps<{series: Series}>();
const series = toRef(props.series);
</script>


<style lang="scss" scoped>
.series-link-wrap {
    font-size: 1rem;
    
    .series-link {
        font-weight: bold;
        color: var(--primary-color);
        text-decoration: none;
        cursor: pointer;

        &:hover {
            color: var(--series-primary-color);
        }
    }
}
</style>