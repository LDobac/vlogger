<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
    <router-view/>
</template>

<style lang="scss">
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/fonts.scss";

#app {
    font-family: "NanumBarunGothic";
    width: 100vh;
    height: 100vh;
}
</style>
