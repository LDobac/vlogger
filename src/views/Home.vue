<template>
    <ContentWithSideMenu>
        <div 
            :class="postFilter.type"
            class="post-filter"
            v-if="postFilter.type"
        >
            <p>{{selectedFilterName}}</p>
        </div>
        <main class="home">
            <post-list 
                :filter="postFilter"
            />
        </main>
    </ContentWithSideMenu>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, watch } from "vue";
import { LocationQuery, useRoute } from "vue-router";

import PostLoader from "@/post_loader/PostLoader";
import { ContentWithSideMenu } from "@/components/layouts";
import { PostList } from "@/components/home";

export default defineComponent({
    name: "Home",
    components : {
        PostList,
        ContentWithSideMenu,
    },
    setup() {
        const route = useRoute();

        const postFilter = reactive({
            type : "",
            id : -1,
        });

        const SetFilter = (query : LocationQuery) => {
            if (query)
            {
                const { series, tag } = query;

                const type = series ? "series" : (tag ? "tag" : "");
                const id = series ? parseInt(series as string) : (tag ? parseInt(tag as string) : -1);

                postFilter.type = type;
                postFilter.id = id;
            }
        };
        SetFilter(route.query);

        watch(()=> route.query, SetFilter);

        const app = getCurrentInstance();
        const postLoader = app?.appContext.config.globalProperties.$postLoader as PostLoader;

        const selectedFilterName = computed(() => {
            if (postFilter.type === "series")
            {
                return postLoader.seriesMetadata[postFilter.id].name;
            }
            else if (postFilter.type === "tag")
            {
                return postLoader.tagsMetadata[postFilter.id].name;
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
