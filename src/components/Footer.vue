<template>
    <footer class="footer">
        Hello, This is footer!
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
}
</style>
