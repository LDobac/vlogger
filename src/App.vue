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
    height: 100%;

    display: grid;
    grid-template-areas: 
    "header header header"
    " . . . "
    "side-m main     .   "
    " . . . "
    "footer footer footer";
    grid-template-columns: 25fr minmax(300px, 60fr) 15fr;
    grid-template-rows: auto 60px auto 80px auto;
    align-items: flex-start;
    justify-content: flex-start;
}
</style>
