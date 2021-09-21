<template>
    <aside class="side-menu">
        <div class="card">
            <p>아직 별 넣을 내용이 없읍니다.</p>
            <br>
            <p>귀여운 저희 집 고양이나 봐주세요</p>
            <img src="@/assets/images/귀여운_고양이_1.jpg">
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

    img {
        object-fit: cover;
        width: 100%;
    }

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