<template>
    <header class="nav">
        <div class="profile-image">
            <img src="@/assets/profile_image.png" alt="My Profile Image">
        </div>
        <h1 class="title">
            <router-link to="/">
                HUNGER
            </router-link>
            <p class="description">
                HI! I'am description!
            </p>
        </h1>
        <ul class="nav-menu">
            <li>Menu 1</li>
            <li>Menu 2</li>
            <li>Menu 3</li>
            <li>Menu 4</li>
            <li>Menu 5</li>
        </ul>
    </header>
</template>

<style lang="scss" scoped>
.nav {
    width: 100%;
    text-align: center;
    padding-top: 1rem;
    
    background-color: white;
}

.profile-image {
    display: inline-block;
    max-width: 200px;
    max-height: 200px;
    overflow: hidden;

    width: 14vw;
    height: 14vw;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
    }
}

.title { 
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem 0;

    border-bottom: 1px solid var(--border-color);

    a {
        color: black;
        text-decoration: none;
    }

    a:hover {
        color: var(--primary-color);
    }

    .description {
        font-size: 1rem;
        font-weight: normal;
        margin: 0.825rem 0;
    }
}

.nav-menu {
    display: flex;
    justify-content: space-evenly;

    padding: 2rem 20%;
    font-weight: bold;

    li:hover {
        color: var(--primary-color);
    }
}
</style>