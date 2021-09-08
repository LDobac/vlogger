<template>
    <span 
        class="series-wrap"
        v-if="series"
    >
        <router-link class="series" to="/">{{series.name}}</router-link>
    </span>
</template>

<script lang="ts">
import { Series } from "@/post_loader/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props : {
        series : {
            type : Object as PropType<Series>
        }
    }
})
</script>


<style lang="scss" scoped>
.series-wrap {
    font-size: 1rem;
    
    .series {
        font-weight: bold;
        color: var(--primary-color);
        text-decoration: none;

        &:hover {
            color: black;
        }
    }
}
</style>