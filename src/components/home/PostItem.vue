<template>
    <router-link 
        :to="{
            name : 'PostView', 
            params : {
                id : post.uid
            }
        }"
    >
        <div class="post-item card">
            <div 
                v-if="post.thumbnail"
                class="thumbnail"
            >
                <img :src="post.thumbnail">
            </div>
            <div class="content">
                <div class="info">
                    <h1 class="post-title">
                        {{post.title}}

                        <span 
                            class="series"
                            v-if="post.series" 
                        >
                            {{post.series.name}}
                        </span>
                    </h1>
                    <p class="post-date">&#x1F4C5; {{localeDate}}</p>
                    <TagsView 
                        v-if="post.tags.length > 0"
                        class="tags"
                        :tags="post.tags"
                    />
                </div>
                <p class="post-summery" v-if="post.summery">{{post.summery}}</p>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { TagsView } from "@/components/post";
import Post from "@/post_loader/Post";
import dayjs from "dayjs";

export default defineComponent({
    name: "PostItem",
    components : {
        TagsView,
    },
    props : {
        post : {
            type : Object as PropType<Post>,
            required : true,
        }
    },
    setup(props) {
        const localeDate = computed(() => {
            return dayjs(props.post.date).format("YYYY년 MM월 DD일");
        });

        return {
            localeDate
        }
    },
});
</script>

<style lang="scss" scoped>
a {
    color: black;
    text-decoration: none;
}

.post-item {
    padding: 0;

    .content {
        padding: 2rem;
    }

    .thumbnail {
        img {
            width: 100%;
            height: 100%;
            max-height: 300px;
            object-fit: cover;
            border-radius: 12px 12px 0 0;
        }
    }

    .post-title {
        font-size: 2rem;
        margin-bottom: 1rem;

        .series {
            font-size: 1rem;

            color: var(--primary-color);

            &:hover {
                color: black;
            }
        }
    }
}

.tags {
    padding-top: 1rem;
}

.post-summery {
    margin-top: 1.5rem;
}
</style>