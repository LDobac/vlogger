<template>
    <footer class="footer">
        Copyright 2021 by Jaehee All rights reserved.
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Footer",
});
</script>

<style lang="scss" scoped>
.footer {
    grid-area: footer;
    width: 100%;
    box-sizing: border-box;

    background-color: var(--bg-color);
    color: var(--primary-color);
    
    padding: 1.5rem 1rem;
}
</style>
