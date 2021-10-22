<template>
    <h1>Emil & Lucia's {{plants != null ? plants.length : ''}} plants</h1>
    <div v-if="plants == null" class="loader">Loading!</div>
    <div v-if="plants != null" class="plants">
        <div class="plant" v-for="plant in plants" :key="plant.name">
            <img v-bind:src="plant.image_url" v-bind:alt="plant.name">
            <div class="text">
                <b>{{plant.name}}</b> - {{plant.water_ml}}ml
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Plants',
        data: function() {
            return {
                plants: null
            }
        },
        mounted() {
            let papaParse = document.createElement('script');
            papaParse.src = 'https://unpkg.com/papaparse@latest/papaparse.min.js';
            papaParse.async = true;
            papaParse.onload = () => {
                this.fetchPlants();
            };
            document.head.appendChild(papaParse);
        },
        methods: {
            fetchPlants() {
                window.Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vQe6xtyzDqTqHQW3Zflfa5i0XmQbMv_jWjeKIe5vA-5VPY5wLjFIvVukCdIXjyxwhHXb5Jul8pmTA3B/pub?gid=0&single=true&output=csv', {
                    header: true,
                    download: true,
                    complete: (results) => {
                        this.plants = results.data;
                    }
                });
            }
        }
    }
</script>g

<style scoped>

    .plants {
        padding: 0 1rem;
        columns: 8 18rem;
        column-gap: 1rem;
    }

    .plant {
        position: relative;
        background: white;
        border-radius: 1rem;
        margin-bottom: 1rem;
        overflow: hidden;
    }

    .text {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: white;
        padding: 1rem 0.5rem 0.5rem;
        background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
    }

    img {
        position: relative;
        display: block;
        width: 100%;
    }
</style>
