<template>
    <LeftSideMenu />
    <main class="home">
        <post-list />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LeftSideMenu } from "@/components/";
import PostList from "@/components/home/PostList.vue";

export default defineComponent({
    name: "Home",
    components : {
        PostList,
        LeftSideMenu,
    },
});
</script>

<style lang="scss" scoped>
.home {
    grid-area: main;
    width: 100%;
    height: 100%;
}
</style>
