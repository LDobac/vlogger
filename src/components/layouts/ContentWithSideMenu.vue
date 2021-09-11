<template>
    <LeftSideMenu />
    <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LeftSideMenu } from "..";

export default defineComponent({
    name : "ContentWithSideMenuLayout",
    components : {
        LeftSideMenu
    },
})
</script>
