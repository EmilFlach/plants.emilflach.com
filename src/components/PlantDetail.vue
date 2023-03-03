<template>
    <div class="plant-detail">
        <div v-if="plant" class="content">
            <h1>{{plant.name}}</h1>
            <div :class="!imageLoaded ? 'show' : ''" class="shimmer"></div>
            <img v-bind:src="plant.image_url" v-bind:alt="plant.name" :class="imageLoaded ? 'show' : ''" @load="onImgLoad()">

            <ul>
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
        </div>

        <router-link to="/" class="dismiss">
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
        </router-link>
        <GetPlantButton :plant="plant"/>
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
                imageLoaded: false
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
                this.imageLoaded = true;
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
        background: #04120e;
    }

    .content {
        position: relative;
        max-width: 40rem;
        margin: 0 auto;
        padding: 1rem 1rem 6rem;
    }

    img {
        position: relative;
        display: inline-block;
        vertical-align: top;
        max-height: 90%;
        max-width: 100%;
        border-radius: 1rem;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }

    .shimmer {
        position: absolute;
        opacity: 0;
        background: #212121 linear-gradient(to right, #212121 0%, #292929 25%, #292929 60%, #212121 100%) no-repeat;
        background-size: 40% 100%;
        width: 100%;
        height: 50vh;
        border-radius: 1rem;

        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: shimmer;
        animation-timing-function: ease-in-out;
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

    b {
        display: inline-block;
        vertical-align: top;
        padding: 1.5rem 0 1rem;
        font-size: 1.75rem;
    }

    ul {
        margin: 0;
        padding-left: 1rem;
    }

    li {
        padding-bottom: 0.25rem;
    }

    a {
        color: inherit;
    }

    .dismiss {
        width: 4rem;
        height: 4rem;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        border: none;
        border-radius: 50%;
        background-color: rgba(255,255,255,0);
        cursor: pointer;
    }

    .dismiss svg {
        fill: white;
        filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .3));
    }

    .dismiss:hover svg {
        fill: rgba(255,255,255,0.5);
    }
</style>
