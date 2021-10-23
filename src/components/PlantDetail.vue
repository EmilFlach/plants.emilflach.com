<template>
    <div class="plant-detail" @click="hidePlantDetail()" v-bind:class="plant ? 'show' : ''">
        <div v-if="plant" class="container">
            <img v-bind:src="plant.image_url" v-bind:alt="plant.name">
            <div class="text">
                <b>{{plant.name}}</b>
            </div>
            <button class="stekje" v-on:click.stop="getStekje(plant)">Stekje please</button>
        </div>
        <button class="dismiss">
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'PlantDetail',
        props: ['plant'],
        methods: {
            hidePlantDetail() {
                this.$emit('hidePlantDetail');
            },
            getStekje(plant) {
                window.open(
                    'https://docs.google.com/forms/d/e/1FAIpQLSfu3pzmTAGjl5MV985jlmmReUKX84Xd_B8TYxd825GSAZDxXg/viewform?usp=pp_url&entry.2116840055=' + encodeURI(plant.name),
                    '_blank'
                ).focus()
            }
        }
    }
</script>

<style scoped>
    .plant-detail {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        background: rgba(0,0,0,0.9);
        color: white;
        transform: translateY(100%);
        transition: transform 0.3s ease-in-out;
        cursor: zoom-out;
    }

    .container {
        position: relative;
        height: 100%;
        max-width: 40rem;
        margin: 0 auto;
        text-align: center;
    }

    img {
        position: relative;
        display: inline-block;
        left: 0;
        max-height: 80%;
        max-width: calc(100% - 2rem);
        border-radius: 1rem;
        margin: 1rem;
    }

    .stekje {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 2rem);
        background-color: rgb(0,160,0);
        padding: 1rem;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
    }

    .stekje:hover {
        background-color: rgb(0,130,0);
    }

    .dismiss {
        width: 4rem;
        height: 4rem;
        position: absolute;
        top: 1rem;
        right: 2rem;
        border: none;
        border-radius: 50%;
        background-color: rgba(255,255,255,0);
        cursor: pointer;
    }

    .dismiss svg {
        fill: white;
    }

    .dismiss:hover svg {
        fill: rgba(255,255,255,0.5);
    }

    .show {
        transform: translateY(0);
    }

    @media only screen and (min-width: 40rem) {
        .stekje {
            max-width: 20rem;
        }
    }
</style>
