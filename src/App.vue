<template>
    <!--<h1>{{pageTitle}} {{store.plants != null ? store.plants.length : ''}} plants 🌱</h1>-->
    <!--<Loader v-if="!store.plantsFetched" />-->
    <router-view></router-view>
    <!--<Plants v-if="store.plantsFetched" :plants="store.plants" @showPlant="showPlant($event)"/>-->
    <!--<PlantDetail :plant="store.selectedPlant" @hidePlant="hidePlant()" @showPlantById="showPlantById($event)"/>-->

</template>

<script lang="js" setup>
    // import { usePlantsStore } from './stores/plants'
    import Plants from './components/Plants.vue'
    import Loader from './components/Loader.vue'
    import PlantDetail from './components/PlantDetail.vue'

    // const store = usePlantsStore();

    export default {
        name: 'App',
        components: {
            Plants,
            Loader,
            PlantDetail
        },
        data: function() {
        },
        created () {
            document.title = window.documentTitle;
        },
        mounted() {
            // store.fetchPlants();
            // window.bodyScrollLock = require('body-scroll-lock');
        },
        methods: {
            showPlantById(id) {
                if(this.plant == null) {
                    this.fetchPlants();
                } else {
                    let plant = this.plants.find(plant => plant.id === id);
                    this.showPlant(plant);
                }
            },
            showPlant(plant) {
                this.selectedPlant = plant;
            },
            hidePlant() {
                // if (window.bodyScrollLock != null) {
                //     const plantDetail = document.querySelector('#plant-detail');
                //     window.bodyScrollLock.enableBodyScroll(plantDetail);
                // }
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
