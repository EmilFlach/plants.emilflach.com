<template>
    <div class="home">
        <h1>{{pageTitle}} {{plants ? plants.length : ''}} plants 🌱</h1>

        <div v-if="!loaded" class="plants show">
            <div v-for="plant in 20" class="plant" :key="plant">
                <div class="plant-container">
                    <shimmer :type="'list-img'" :loaded="loaded"></shimmer>
                </div>
            </div>
        </div>

        <div class="plants" v-bind:class="loaded ? 'show' : ''">
            <router-link v-for="plant in plants" v-bind:to="'/plants/' + plant.id" class="plant" :key="plant.name">
                <div class="plant-container">
                    <img
                        v-bind:src="plant.thumb_url"
                        v-bind:alt="plant.name"
                        @load="this.imageLoaded(plant)"
                    >
                    <div class="text">
                        <b>{{plant.name}}</b>
                    </div>
                </div>
            </router-link>
        </div>

        <h2>Graveyard of {{deadPlants ? deadPlants.length : ''}} plants 💀</h2>
        <div class="plants" v-bind:class="loaded ? 'show' : ''">
            <router-link v-for="plant in deadPlants" v-bind:to="'/plants/' + plant.id" class="plant" :key="plant.name">
                <div class="plant-container">
                    <img
                            v-bind:src="plant.thumb_url"
                            v-bind:alt="plant.name"
                            @load="this.imageLoaded(plant)"
                    >
                    <div class="text">
                        <b>{{plant.name}}</b>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script lang="js" setup>
    import { usePlantsStore } from '../stores/plants'
    import Loader from "./Loader";
    import Shimmer from "./Shimmer";

    export default {
        name: 'Plants',
        components: {
            Loader,
            Shimmer
        },
        data () {
            return {
                imagesLoaded: 0,
                loaded: false
            }
        },
        computed: {
            pageTitle() {
                return window.pageTitle;
            },
            plants() {
                return usePlantsStore().plants;
            },
            deadPlants() {
                return usePlantsStore().deadPlants;
            }
        },
        created() {
            this.$watch(
                () => this.$route.params,
                () => { usePlantsStore().fetchPlants() },
                { immediate: true }
            )
        },
        methods: {
            imageLoaded() {
                this.imagesLoaded++;
                if (this.imagesLoaded === this.plants.length) {
                    this.loaded = true;
                }
            }
        }
    }
</script>

<style scoped>

    h1, h2 {
        text-align: center;
        Font-Family: 'Merriweather', sans-serif;
        Font-Size: 48px;
        color: white;
        margin: 0;
        padding: 3rem 1rem 2rem;
    }

    h2 {
        Font-Size: 38px;
    }

    .plants {
        opacity: 0;
        padding: 0.5rem;
        columns: 2 9rem;
        column-gap: 0.5rem;
        transition: opacity 0.25s ease-in-out;
    }

    .plant {
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin-top: 0.5rem;
        width: 100%;
    }

    .plant-container {
        width: 100%;
        transition: transform 0.25s ease-in-out;
    }

    .plant:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: -1;
        border-radius: 1rem;
        opacity: 0;
        box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.5);
        transition: opacity 0.25s ease-in-out;
    }

    .plant:hover {
        cursor: pointer;
    }

    .plant:active .plant-container, .plant:active:after {
        transition: 0s;
    }

    .plant:active .plant-container, .plant:hover .plant-container {
        transform: scale(1.02);
    }

    .plant:hover:after, .plant:active:after {
        opacity: 1;
    }

    @media only screen and (min-width: 40rem) {
        h1 {
            padding: 3rem 1rem 1rem;
        }
        .plants {
            padding: 1rem;
            columns: 8 18rem;
            column-gap: 1rem;
            max-width: 80rem;
            margin: 0 auto;
        }

        .plant {
            margin-top: 1rem;
        }
    }

    .text {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: white;
        padding: 1rem 0.5rem 0.5rem;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
    }

    img {
        position: relative;
        display: block;
        width: 100%;
        border-radius: 1rem;
    }

    .show {
        opacity: 1;
    }
</style>
