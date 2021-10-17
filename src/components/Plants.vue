<template>
    <div class="plants" v-masonry="plants" transition-duration="0.3s" item-selector=".item" fit-width="true" gutter="16">
        <div v-masonry-tile class="item" v-for="plant in plants" :key="plant.name">
            <div class="container">
                <img v-bind:src="plant.image_url" v-bind:alt="plant.name">
                <div class="text">
                    <b>{{plant.name}}</b> - {{plant.water_ml}}ml
                </div>
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
        margin: 0 auto;
    }

    .item {
        width: 20rem;
        background: white;
        margin-bottom: 1rem;
        border-radius: 1rem;
        overflow: hidden;
    }

    .container {
        position: relative;
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
        max-width: 100%;
    }
</style>
