<template>
    <div class="about">
        <div class="card content">
            <p>곧 주인장에 대한 설명과 이력 등등이 추가될 예정입니다.</p>
            <br>
            <p>추가될 때 까지 귀여운 고양이를 드립니다.</p>
            <img src="@/assets/images/귀여운_고양이.webp">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.about {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4;
}

.content {
    width: 70%;
    margin: 3rem auto;

    img {
        object-fit: cover;
        width: 100%;
    }
}
</style>