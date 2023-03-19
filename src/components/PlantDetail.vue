<template>
    <div class="plant-detail">
        <div class="fixed-content">
            <h1 :class="!plant ? 'h1-loading' : ''">
                <router-link to="/" class="dismiss">◀</router-link>
                <shimmer :type="'h1'" :loaded="plant"></shimmer>
                {{plant ? plant.name : ''}}
            </h1>
            <shimmer :type="'img'" :loaded="loaded"></shimmer>
            <img v-if="plant" v-bind:src="plant.image_url" v-bind:alt="plant.name" :class="loaded ? 'show' : ''" @load="onImgLoad()">
        </div>

        <div class="scrollable-content">
            <div class="plant-information">
                <h2 :class="!plant ? 'h2-loading' : ''">
                    <shimmer :type="'h2'" :loaded="plant"></shimmer>
                    <a v-if="plant" :href="'https://www.google.com/search?q=' + encodeURI(plant.common_name)" target="_blank">
                        {{plant.common_name}}
                    </a>
                </h2>
                <shimmer :type="'text'" :loaded="plant"></shimmer>
                <ul v-if="plant">
                    <li v-if="!plant.dead_since">Ours for: {{ calculateAge(plant.owned_since) }}</li>
                    <li v-if="plant.dead_since">Lived for: {{ calculateAge(plant.owned_since, plant.dead_since) }}</li>
                    <li v-if="plant.dead_since">Died on: {{ plant.dead_since }}</li>
                    <li>Easy to propagate: {{plant.easy_stekje === 'TRUE' ? '✅': '⛔'}}</li>

                    <li v-for="[key, value] in plantDetailFields" :key="key">
                        {{key}}: {{value}}
                    </li>
                </ul>
                <GetPlantButton :plant="plant"/>
            </div>
        </div>

    </div>

</template>

<script lang="js" setup>
    import GetPlantButton from './GetPlantButton.vue'
    import { usePlantsStore } from '../stores/plants'
    import {usePlantsHistoryStore} from "../stores/plantsHistory";
    import Shimmer from "./Shimmer";

    export default {
        name: 'PlantDetail',
        components: {
            GetPlantButton,
            Shimmer
        },
        data () {
            return {
                loaded: false
            }
        },
        computed: {
            plant() {
                return usePlantsStore().plant;
            },
            plantDetailFields() {
                return usePlantsStore().plantDetailFields;
            },
            history() {
                return usePlantsHistoryStore().history;
            },
        },
        created() {
            this.$watch(
                () => this.$route.params,
                () => {
                    this.loaded = false;
                    usePlantsStore().fetchPlantById(this.$route.params.id);
                    usePlantsHistoryStore().fetchPlantHistoryById(this.$route.params.id);
                },
                { immediate: true }
            )
        },
        methods: {
            onImgLoad() {
                this.loaded = true;
                // let scrollContainer = document.querySelector('.scrollable-content');
                // setTimeout(function () {
                //     scrollContainer.scrollIntoView({behavior: "smooth"});
                // } , 300);
            },
            calculateAge(birthday, deathday = null) {
                if(deathday === null) {
                    deathday = new Date();
                } else {
                    deathday = new Date(deathday);
                }
                let epoch = new Date('1970-01-01T00:00:00-0600');
                let plantDate = new Date(birthday);
                let difference = new Date(deathday - plantDate);
                let years = difference.getYear() - epoch.getYear();
                let months = difference.getMonth() - epoch.getMonth();
                if (years > 0) {
                    return years + " year" + (years > 1 ? 's' : '') + " and " + months + " month"  + (months > 1 ? 's' : '');
                } else {
                    return months + " month"  + (months > 1 ? 's' : '');
                }
            }
        }
    }
</script>

<style scoped>
    .plant-detail {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        color: white;
        background: #05201b;
        overflow: auto;
        overflow-y: overlay;
    }

    .fixed-content, .scrollable-content {
        width: 45rem;
        max-width: 90%;
    }

    .fixed-content {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
    }

    .scrollable-content {
        z-index: 1;
        position: relative;
        margin: 85vh auto 0;
        background-color: #122b27;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
    }

    .scrollable-content:after {
        content: '';
        position: absolute;
        top: 0.75rem;
        left: 50%;
        transform: translateX(-50%);
        display: block;
        background-color: rgba(255,255,255,0.8);
        border-radius: 2px;
        height: 4px;
        width: 3rem;
    }

    .plant-information {
        padding: 1rem 2rem;
    }

    img {
        display: block;
        width: 100%;
        max-height: 90%;
        border-radius: 1rem;
        opacity: 0;
        transition: opacity 0.25s ease-in-out;
    }

    .h1-loading {
        height: 3rem;
    }

    .h2-loading {
        height: 2.2rem;
    }

    .show {
        opacity: 1;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    li {
        padding-bottom: 0.5rem;
        list-style: none;
    }

    a {
        color: inherit;
    }

    .dismiss {
        font-size: 1.5rem;
        padding-right: 0.5rem;
        vertical-align: 9%;
        text-decoration: none;
    }

    .dismiss:hover, .dismiss:active {
        text-decoration: underline;
    }

    @media only screen and (min-width: 40rem) {
        .plant-detail {
            display: flex;
            justify-content: center;
            overflow: hidden;
        }
        .fixed-content {
            position: relative;
            width: auto;
            max-width: 40rem;
            padding-bottom: 7rem;
            padding-left: 1rem;
            left: 0;
            transform: translateX(0);
        }
        .scrollable-content {
            width: 20rem;
            position: relative;
            margin: 5.6rem 1rem;
            height: fit-content;
            border-radius: 1rem;
        }
        .scrollable-content:after {
            display: none;
        }
        img {
            width: auto;
            max-height: 100%;
            max-width: 100%;
        }
    }

    @media only screen and (min-width: 70rem) {
        .fixed-content {
            max-width: 50rem;
        }

    }
</style>
