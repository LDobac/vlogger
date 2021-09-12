<template>
    <aside class="side-menu">
        <div class="card">
            <p>Hello This is Side menu!</p>
        </div>
    </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name : "LeftSideMenu",
})
</script>


<style lang="scss" scoped>
@import "@/assets/scss/layout.scss";

.side-menu {
    grid-area: side-m;

    margin: 0 2rem 0 auto;

    max-width: 300px;
    width: 100%;

    @include m-xxl {
        max-width: 250px;
    }

    @include m-xl {
        max-width: 200px;
    }

    @include m-lg {
        max-width: 200px;
        margin-right: 1rem;
    }

    @include m-md {
        display: none;
    }
}
</style>