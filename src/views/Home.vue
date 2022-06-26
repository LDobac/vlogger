<template>
    <div class="home">
        <div 
            v-if="postFilter"
            :class="postFilter.type"
            class="post-filter"
        >
            <p>{{selectedFilterName}}</p>
        </div>
        <main class="home">
            <post-list 
                :filter="postFilter"
            />
        </main>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { LocationQuery, useRoute } from "vue-router";

import { PostList } from "@/components/home";
import { usePostLoader } from "@/composable/PostLoader";
import { IPostFilter } from "@/post_loader/models";

export default defineComponent({
    name: "Home",
    components : {
        PostList,
    },
    setup() {
        const route = useRoute();

        const postFilter = ref<IPostFilter | null>(null);

        const SetFilter = (query : LocationQuery) => {
            if ("series" in query || "tag" in query)
            {
                const { series, tag } = query;

                const type = series ? "series" : (tag ? "tag" : "");
                const id = series ? parseInt(series as string) : (tag ? parseInt(tag as string) : -1);

                postFilter.value = {
                    type, id
                };
            }
            else 
            {
                postFilter.value = null;
            }
        };
        SetFilter(route.query);

        watch(()=> route.query, SetFilter);

        const postLoader = usePostLoader();

        const selectedFilterName = computed(() => {
            if (postFilter.value) 
            {
                const type = postFilter.value.type
                const id = postFilter.value.id;
                
                if (type === "series")
                {
                    return postLoader.seriesMetadata[id].name;
                }
                else if (type === "tag")
                {
                    return postLoader.tagsMetadata[id].name;
                }
            }

            return "";
        });

        return {
            postFilter,
            selectedFilterName
        }
    },
});
</script>

<style lang="scss" scoped>
.home {
    grid-area: main;
    width: 100%;
    height: 100%;
    max-width: 1200px;
}

.post-filter {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 2;

    text-align: center;

    padding: 4rem;
    margin-bottom: 6rem;

    font-size: 3rem;

    &.series {
        background: var(--series-primary-color);
        color: white;
    }

    &.tag {
        background: var(--tag-primary-color);
        color: white;
    }

    @include m-lg {
        padding: 2rem;
        margin-bottom: 4rem;
    }

    @include m-sm {
        margin-bottom: 3rem;
        padding: 2rem;
        font-size: 2rem;
    }
}
</style>
