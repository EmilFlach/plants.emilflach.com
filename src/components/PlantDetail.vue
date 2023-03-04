<template>
    <div class="plant-detail">
        <div class="fixed-content">
            <h1 v-if="!plant">
                <router-link to="/" class="dismiss">◀</router-link>
                <div :class="!loaded ? 'show' : ''" class="shimmer shimmer-title"></div>
            </h1>
            <h1 v-if="plant">
                <router-link to="/" class="dismiss">◀</router-link>
                {{plant.name}}
            </h1>
            <div :class="!loaded ? 'show' : ''" class="shimmer shimmer-img"></div>
            <img v-if="plant" v-bind:src="plant.image_url" v-bind:alt="plant.name" :class="loaded ? 'show' : ''" @load="onImgLoad()">
        </div>

        <div class="scrollable-content">
            <div class="plant-information">
                <h2>
                    Plant information
                </h2>
                <ul v-if="!plant">
                    <li v-for="x in 10"  :key="x">
                        <div :class="!loaded ? 'show' : ''" class="shimmer shimmer-information"></div>
                    </li>
                </ul>
                <ul v-if="plant">
                    <li>
                        <a v-on:click.stop :href="'https://www.google.com/search?q=' + encodeURI(plant.common_name)" target="_blank">
                            {{plant.common_name}}
                        </a>
                    </li>
                    <li>Weekly watering: {{plant.water}}</li>
                    <li>Easy to propagate: {{plant.easy_stekje === 'TRUE' ? '✅': '⛔'}}</li>
                    <li>Ours for: {{ calculateAge(plant.owned_since) }}</li>
                    <li>Brought by: {{plant.brought_by}}</li>
                </ul>
                <GetPlantButton :plant="plant"/>
            </div>
        </div>

    </div>

</template>

<script lang="js" setup>
    import GetPlantButton from './GetPlantButton.vue'
    import { usePlantsStore } from '../stores/plants'

    export default {
        name: 'PlantDetail',
        components: {
          GetPlantButton
        },
        data () {
            return {
                loaded: false
            }
        },
        computed: {
            plant() {
                return usePlantsStore().plant;
            }
        },
        created() {
            this.$watch(
                () => this.$route.params,
                () => { usePlantsStore().fetchPlantById(this.$route.params.id) },
                { immediate: true }
            )
        },
        methods: {
            onImgLoad() {
                this.loaded = true;
            },
            calculateAge(date) {
                let now = new Date();
                let epoch = new Date('1970-01-01T00:00:00-0600');
                let plantDate = new Date(date);
                let difference = new Date(now - plantDate);
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
        bottom: -10rem;
        padding-bottom: 10rem;
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
        position: relative;
        margin: 85vh auto 0;
        background-color: #05322d;
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
        vertical-align: top;
        max-height: 90%;
        width: 100%;
        border-radius: 1rem;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }

    .shimmer {
        position: fixed;
        background: #05322d linear-gradient(to right, #05322d 0%, #053c37 25%, #053c37 60%, #05322d 100%) no-repeat;
        background-size: 40% 100%;
        border-radius: 1rem;
        opacity: 0;

        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: shimmer;
        animation-timing-function: ease-in-out;
    }

    .shimmer-information {
        display: inline-block;
        height: 1rem;
        width: 10rem;
    }

    .shimmer-img {
        height: 50vh;
        width: 100%;
    }

    .shimmer-title {
        display: inline-block;
        height: 2rem;
        width: 50%;
        margin-top: 0.6rem;
    }

    @keyframes shimmer {
        0% {
            background-position: -180% 0;
        }
        100% {
            background-position: 180% 0;
        }
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
        vertical-align: 10%;
        text-decoration: none;
    }

    .dismiss:hover, .dismiss:active {
        text-decoration: underline;
    }

    @media only screen and (min-width: 60rem) {
        .plant-detail {
            display: flex;
            justify-content: center;
        }
        .fixed-content {
            width: 40rem;
            position: relative;
            left: 0;
            transform: translateX(0);
        }
        .scrollable-content {
            width: 20rem;
            position: relative;
            margin: 5.5rem 1rem;
            height: fit-content;
            border-radius: 1rem;
        }
        .scrollable-content:after {
            display: none;
        }
    }

    @media only screen and (min-width: 70rem) {
        .fixed-content {
            width: 50rem;
        }

    }
</style>
