<template>
    <div class="plants">
        <div class="plant" v-for="plant in plants" :key="plant.name">
            <img v-bind:src="plant.image_url" v-bind:alt="plant.name" onload="this.classList.add('show')">
            <div class="text">
                <b>{{plant.name}}</b> - {{plant.water_ml}}ml
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Plants',
        props: ['plants'],
    }
</script>

<style scoped>

    .plants {
        padding: 0 1rem;
        columns: 8 18rem;
        column-gap: 1rem;
    }

    .plant {
        position: relative;
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
        transition: opacity 0.5s;
        opacity: 0;
    }

    .show {
        opacity: 1;
    }
</style>
