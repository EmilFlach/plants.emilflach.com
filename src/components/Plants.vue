<template>
    <div>
        <li v-for="plant in plants" :key="plant.name">
            <b>{{plant.name}}</b> -
            {{plant.water_ml}}ml
        </li>
    </div>
</template>

<script>
    export default {
        name: 'Plants',
        data: function() {
            return {
                plants: null
            }
        },
        mounted() {
            let papaParse = document.createElement('script');
            papaParse.src = 'https://unpkg.com/papaparse@latest/papaparse.min.js';
            papaParse.async = true;
            papaParse.onload = () => {
                this.fetchPlants();
            };
            document.head.appendChild(papaParse);
        },
        methods: {
            fetchPlants() {
                window.Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vQe6xtyzDqTqHQW3Zflfa5i0XmQbMv_jWjeKIe5vA-5VPY5wLjFIvVukCdIXjyxwhHXb5Jul8pmTA3B/pub?gid=0&single=true&output=csv', {
                    header: true,
                    download: true,
                    complete: (results) => {
                        this.plants = results.data;
                    }
                });
            }
        }
    }
</script>

<style scoped>
</style>
