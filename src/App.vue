<template>
    <h1>{{pageTitle}} {{plants != null ? plants.length : ''}} plants 🌱</h1>
    <Loader v-if="!plantsFetched" />
    <Plants v-if="plantsFetched" :plants="plants" @showPlantDetail="showPlantDetail($event)"/>
    <PlantDetail :plant="selectedPlant" @hidePlantDetail="hidePlantDetail()"/>
</template>

<script>
    import Plants from './components/Plants.vue'
    import Loader from './components/Loader.vue'
    import PlantDetail from './components/PlantDetail.vue'

    export default {
        name: 'App',
        components: {
            Plants,
            Loader,
            PlantDetail
        },
        data: function() {
            return {
                plants: null,
                selectedPlant: null,
                plantsFetched: false
            }
        },
        created () {
            document.title = window.documentTitle;
        },
        mounted() {
            let papaParse = document.createElement('script');
            papaParse.src = 'https://unpkg.com/papaparse@latest/papaparse.min.js';
            papaParse.async = true;
            papaParse.onload = () => {
                this.fetchPlants();

            };
            document.head.appendChild(papaParse);
            window.bodyScrollLock = require('body-scroll-lock');

        },
        methods: {
            fetchPlants() {
                window.Papa.parse(window.googleSheetURL, {
                    header: true,
                    download: true,
                    complete: (results) => {
                        this.plants = results.data;
                        this.plantsFetched = true
                    }
                });
            },
            showPlantDetail(plant) {
                this.selectedPlant = plant;
            },
            hidePlantDetail() {
                const plantDetail = document.querySelector('#plant-detail');
                window.bodyScrollLock.enableBodyScroll(plantDetail);
                this.selectedPlant = null;
            }
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
