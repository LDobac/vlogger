<template>
    <LeftSideMenu />
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
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, watch } from "vue";
import { LeftSideMenu } from "@/components/";
import PostList from "@/components/home/PostList.vue";
import { LocationQuery, useRoute } from "vue-router";
import PostLoader from "@/post_loader/PostLoader";

export default defineComponent({
    name: "Home",
    components : {
        PostList,
        LeftSideMenu,
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
}

.post-filter {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 2;

    text-align: center;

    padding: 6rem;
    margin-bottom: 6rem;

    font-size: 3rem;

    &.series {
        background: #FECD71;
        color: white;
    }

    &.tag {
        background: #7D97A5;
        color: white;
    }
}
</style>
