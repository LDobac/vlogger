<template>
    <header class="header">
        <div class="profile-image">
            <img src="@/assets/images/profile_image.webp" alt="My Profile Image">
        </div>
        <h1 class="title">
            <router-link to="/">
                Jaehee
            </router-link>
            <p class="description">
                HI!
            </p>
        </h1>
        <nav class="nav-menu">
            <router-link to="/" class="nav-item">Home</router-link>
            <router-link to="/about" class="nav-item">About</router-link>
            <a href="https://github.com/LDobac" target="_blank" class="nav-item">Github</a>
            <a href="https://www.instagram.com/jaehee24_/" target="_blank" class="nav-item">Instagram</a>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header {
    grid-area: header;

    width: 100%;
    text-align: center;
    padding-top: 1rem;
    
    background-color: var(--bg-color);

    a {
        color: var(--color-text);
        text-decoration: none;
    }

    a:hover {
        color: var(--primary-color);
    }
}

.profile-image {
    display: inline-block;
    max-width: 200px;
    max-height: 200px;
    overflow: hidden;

    width: 12vw;
    height: 12vw;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
    }

    @include m-sm {
        width: 24vw;
        height: 24vw;
    }
}

.title { 
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem 0;

    border-bottom: 1px solid var(--border-color);

    .description {
        font-size: 1rem;
        font-weight: normal;
        margin: 0.825rem 0;
    }
}

.nav-menu {
    display: flex;
    justify-content: space-between;

    padding: 1.5rem 20%;
    font-weight: bold;

    max-width: 1200px;
    margin: auto;

    .nav-item:hover {
        color: var(--primary-color);
    }

    @include m-md {
        padding: 1.5rem 0;
        justify-content: space-evenly;
    }
}
</style>
