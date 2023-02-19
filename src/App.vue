<template>
    <h1>{{pageTitle}} {{store.plants != null ? store.plants.length : ''}} plants 🌱</h1>
    <Loader v-if="store.plants == null" />
    <router-view></router-view>

</template>

<script>
    import { usePlantsStore } from './stores/plants'
    import Loader from './components/Loader.vue'

    export default {
        name: 'App',
        components: {
            Loader
        },
        data: () => {
            return {
                store: usePlantsStore()
            }
        },
        created () {
            document.title = window.documentTitle;
        },
        computed: {
            pageTitle() {
                return window.pageTitle;
            }
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Merriweather|Poppins:300');

    html {
        height: 100vh;
    }

    body {
        background: rgba(47,110,0,0.13);
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        margin: 0;
    }
    
    .no-scroll {
        overflow: hidden;
    }

    h1 {
        text-align: center;
        Font-Family: 'Merriweather', sans-serif;
        Font-Size: 48px;
        margin: 0;
        padding: 3rem 1rem 2rem;
    }

    @media only screen and (min-width: 40rem) {
        h1 {
            padding: 3rem 1rem 1rem;
        }
    }
</style>
