<template>
    <Header />
    <router-view/>
    <Footer />
</template>

<script lang="ts">
import { Header, Footer } from "@/components/";
import { defineComponent } from "vue";

export default defineComponent({
    components : {
        Header,
        Footer,
    },
});
</script>


<style lang="scss">
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/fonts.scss";

body {
    background-color: var(--primary-color);
    color: var(--text-color);
    font-size: 1rem;
}

#app {
    font-family: Roboto, "Noto Sans KR", Arial, Helvetica, sans-serif;

    width: 100%;

    display: grid;
    grid-template-areas: 
    "header header header"
    " . . . "
    "side-m main     .   "
    " . . . "
    "footer footer footer";
    grid-template-columns: 28fr minmax(0, 46fr) 26fr;
    grid-template-rows: auto minmax(60px, auto) auto 60px 64px;
    align-items: flex-start;
    justify-content: flex-start;

    @include m-xxl {
        grid-template-columns: 27fr minmax(0, 62fr) 9fr;
    }

    @include m-xl {
        grid-template-columns: 25fr minmax(0, 58fr) 9fr;
    }

    @include m-lg {
        grid-template-columns: 28fr minmax(0, 70fr) 6fr;
    }

    @include m-md {
        grid-template-columns: 5fr minmax(0, 90fr) 5fr;
    }

    @include m-sm {
        grid-template-columns: 10px minmax(0, 1fr) 10px;
        grid-template-rows: auto minmax(40px, auto) auto 40px 64px;
    }
}
</style>
