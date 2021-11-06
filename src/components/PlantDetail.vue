<template>
    <div class="plant-detail" @click="hidePlantDetail()" v-bind:class="plant ? 'show' : ''">
        <div v-if="plant" id="plant-detail" class="scroll-container">
            <div class="content">
                <img v-bind:src="plant.image_url" v-bind:alt="plant.name">
                <b>{{plant.name}}</b>
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
        </div>

        <button class="dismiss">
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
        </button>
    </div>
    <GetPlantButton :plant="plant"/>
</template>

<script>
    import GetPlantButton from './GetPlantButton.vue'

    export default {
        name: 'PlantDetail',
        components: {
          GetPlantButton
        },
        props: ['plant'],
        emits: ["hidePlantDetail"],
        methods: {
            hidePlantDetail() {
                this.$emit('hidePlantDetail');
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
            },
        }
    }
</script>

<style scoped>
    .plant-detail {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 130%;
        color: white;
        background: rgba(0,0,0,0.9);
        transform: translateY(130%);
        transition: transform 0.3s ease-in-out;
        cursor: zoom-out;
    }

    .scroll-container {
        position: relative;
        overflow: auto;
        height: 100%;
    }

    .content {
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

    .show {
        transform: translateY(0);
    }
</style>
