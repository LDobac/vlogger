<template>
    <div class="error">
        <p>Error!</p>
    </div>
</template>

<style lang="scss" scoped>
.error {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4;

    display: flex;
    background: white;
    width: 100%;
    height: 600px;
    margin-top: 100px;
    text-align: center;

    flex-direction: column;
    justify-content: center;

    font-size: 2.5rem;
    font-weight: bold;
}
</style>
