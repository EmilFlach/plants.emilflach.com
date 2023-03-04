<template>
    <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition">
                <keep-alive>
                    <component :is="Component"/>
                </keep-alive>
        </transition>
    </router-view>
</template>

<script>
    export default {
        name: 'App',
        created () {
            document.title = window.documentTitle;
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Merriweather|Poppins:300');

    html {
        height: 100vh;
    }

    body {
        /*background: rgba(47,110,0,0.13);*/
        background: #05201b;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        margin: 0;
    }

    a {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-leave-active,
    .slide-left-enter-active {
        transition: all 0.35s ease;
    }

    .slide-left-enter-from, .slide-right-leave-to {
        transform: translateX(-100%);
    }

    .slide-right-enter-from, .slide-left-leave-to {
        transform: translateX(100%);
    }

    @media only screen and (min-width: 40rem) {
        .slide-right-enter-active,
        .slide-right-leave-active,
        .slide-left-leave-active,
        .slide-left-enter-active {
            transition: all 0s ease;
        }
    }

</style>
