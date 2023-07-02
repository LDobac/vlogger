<template>
    <DefaultHeader />
    <router-view/>
    <DefaultFooter />
</template>

<script setup lang="ts">
import { DefaultHeader, DefaultFooter } from "@/components/";
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
    "   .     main   .   "
    " . . . "
    "footer footer footer";
    grid-template-columns: 20fr minmax(0, 60fr) 20fr;
    grid-template-rows: auto minmax(40px, auto) auto 60px 64px;
    align-items: flex-start;
    justify-items: center;

    @include m-xxl {
        grid-template-columns: 15fr minmax(0, 70fr) 15fr;
    }

    @include m-xl {
        grid-template-columns: 15fr minmax(0, 70fr) 15fr;
    }

    @include m-lg {
        grid-template-columns: 15fr minmax(0, 70fr) 15fr;
    }

    @include m-md {
        grid-template-columns: 5fr minmax(0, 90fr) 5fr;
    }

    @include m-sm {
        grid-template-columns: 5px minmax(0, 1fr) 5px;
        grid-template-rows: auto minmax(24px, auto) auto 40px 64px;
    }
}
</style>
