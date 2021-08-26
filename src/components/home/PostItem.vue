<template>
    <router-link 
        to="#"
    >
        <div class="post-item card">
            <div 
                v-if="post.thumbnail"
                class="thumbnail"
            >
                <img src="{{post.thumbnail}}">
            </div>
            <div class="info">
                <h1 class="post-title">{{post.title}}</h1>
                <p class="post-date">{{localeDate}}</p>
                <p class="post-summery" v-if="post.summery">{{post.summery}}</p>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { PostMetadata } from "@/post_loader/models";
import dayjs from "dayjs";

export default defineComponent({
    name: "PostItem",
    props : {
        post : {
            type : Object as PropType<PostMetadata>,
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
    .thumbnail {
        max-height: 300px;
        margin-bottom: 10px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .post-title {
        font-size: 2rem;
        margin-bottom: 10px;
    }
}

</style>