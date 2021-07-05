<template>
    <Nav />
    <router-view/>
</template>

<script lang="ts">
import Nav from "@/components/Nav.vue";
import { defineComponent } from "vue";

export default defineComponent({
    components : {
        Nav,
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
}
</style>
