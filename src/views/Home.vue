<template>
    <main class="home">
        <article class="card">
        </article>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Home",
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/layout.scss";

.home {
    grid-area: main;
    width: 100%;
    height: 100%;
}
</style>
