<template>
    <div class="about">
        <div class="card content">
            <p>곧 주인장에 대한 설명과 이력 등등이 추가될 예정입니다.</p>
            <br>
            <p>추가될 때 까지 귀여운 고양이를 드립니다.</p>
            <img src="@/assets/images/귀여운_고양이.webp">
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMeta } from "vue-meta";
import { useRouter } from "vue-router";

import profileImageUrl from "@/assets/images/profile_image.webp";

const router = useRouter();

const metaTags = computed(() => {
    // TODO: Write about page
    return {
        title: "Jaehee.dev",
        description: "개발하면서 발생한 혹은 개발과 관련된 이야기를 나누고자 합니다.",
        og: {
            title: "About Page",
            description: "Who am I?",
            url: router.currentRoute.value.fullPath,
            image: [profileImageUrl]
        },
    }; 
});
useMeta(metaTags);
</script>

<style lang="scss" scoped>
.about {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4;
}

.content {
    width: 70%;
    margin: 3rem auto;

    img {
        object-fit: cover;
        width: 100%;
    }
}
</style>
