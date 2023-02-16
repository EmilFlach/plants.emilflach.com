<template>
    <div class="plants">
        <router-link v-for="plant in plants" v-bind:to="'/plants/' + plant.id" class="plant" :key="plant.name">
            <div class="plant-container">
                <img v-bind:src="plant.thumb_url" v-bind:alt="plant.name" onload="this.classList.add('show')">
                <div class="text">
                    <b>{{plant.name}}</b>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    // import { usePlantsStore } from '../stores/plants'
    // const store = usePlantsStore();
    export default {
        name: 'Plants',
        plants: []
    }
</script>

<style scoped>

    .plants {
        padding: 0.5rem;
        columns: 2 9rem;
        column-gap: 0.5rem;
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

    .plant:hover .plant-container {
        transform: scale(1.02);
    }

    .plant:hover:after {
        opacity: 1;
    }

    @media only screen and (min-width: 40rem) {
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
        opacity: 0;
        transition: opacity 0.25s ease-in-out;
    }

    .show {
        opacity: 1;
    }
</style>
