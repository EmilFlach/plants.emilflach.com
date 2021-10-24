<template>
    <div class="stekje-container" v-bind:class="plant ? 'show' : ''">
        <button class="stekje" v-if="plant && plant.easy_stekje === 'TRUE'" v-on:click.stop="getStekje(plant)">Stekje please 🌱</button>
        <button class="stekje" v-if="plant && plant.easy_stekje === 'FALSE'" v-on:click.stop="getPlant(plant)">Get this plant 🌿</button>
    </div>
</template>

<script>
    export default {
        name: 'GetPlantButton',
        props: ['plant'],
        methods: {
            getStekje(plant) {
                window.open(
                    'https://docs.google.com/forms/d/e/1FAIpQLSfu3pzmTAGjl5MV985jlmmReUKX84Xd_B8TYxd825GSAZDxXg/viewform?usp=pp_url&entry.2116840055=' + encodeURI(plant.name),
                    '_blank'
                ).focus();
            },
            getPlant(plant) {
                window.open(
                    'https://www.intratuin.nl/catalogsearch/result/?q=' + encodeURI(plant.common_name),
                    '_blank'
                ).focus();
            }
        }
    }
</script>

<style scoped>
    .stekje-container {
        position: fixed;
        width: 100%;
        bottom: 1rem;
        opacity: 0;
        transform: scale(0.3);
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    .show {
        opacity: 1;
        transform: scale(1);
    }

    .stekje {
        display: block;
        width: calc(100% - 2rem);
        max-width: 30rem;
        margin: 0 auto;
        padding: 1rem;

        color: white;
        background-color: rgb(0,160,200);

        font-weight: bold;
        font-size: 1rem;

        border-top: none;
        border-bottom: 2px solid rgb(0,80,120);
        border-right:  1px solid rgb(0,80,120);
        border-left:   1px solid rgb(0,80,120);
        border-radius: 0.5rem;

        cursor: pointer;
    }

    .stekje:hover {
        background-color: rgb(0,120,160);
    }

    .stekje:active {
        border: none;
    }
</style>
