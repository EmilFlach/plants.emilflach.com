<template>
    <div v-if="plant">
        <button class="stekje" v-if="plant.easy_stekje === 'TRUE'" v-on:click.stop="getStekje(plant)">Stekje please 🌱</button>
        <button class="stekje" v-if="plant.easy_stekje === 'FALSE'" v-on:click.stop="getPlant(plant)">Get this plant 🌿</button>
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
    .stekje {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 2rem);
        max-width: 20rem;

        background-color: rgb(0,160,200);
        padding: 1rem;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .stekje:hover {
        background-color: rgb(0,120,160);
    }
</style>
