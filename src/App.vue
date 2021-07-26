<template>
    <Header />
    <LeftSideMenu />
    <router-view/>
    <Footer />
</template>

<script lang="ts">
import { Header, Footer, LeftSideMenu } from "@/components/";
import { defineComponent } from "vue";

export default defineComponent({
    components : {
        Header,
        Footer,
        LeftSideMenu,
    },
});
</script>


<style lang="scss">
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/fonts.scss";

body {
    background-color: #D1DFE8;
}

#app {
    font-family: "NanumBarunGothic";

    width: 100%;
    height: 100%;

    display: grid;
    grid-template-areas: 
    "header header header"
    "side-m main     .   "
    " . . . "
    "footer footer footer";
    grid-template-columns: 25fr minmax(0, 50fr) 25fr;
    grid-template-rows: auto auto 40px auto;
}
</style>
