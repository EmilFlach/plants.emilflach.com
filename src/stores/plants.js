import { defineStore } from 'pinia'
const Papa = require('papaparse');
const protectedFields = [
    'id',
    'name',
    'common_name',
    'image_id',
    'image_url',
    'thumb_url',
    'easy_stekje',
    'owned_since',
    'dead_since'
];

export const usePlantsStore = defineStore('plants', {
    state: () => ({
        plants: null,
        deadPlants: null,
        plant: null,
    }),

    actions: {
        async fetchPlantById(id) {
            await this.fetchPlants();
            this.plant = this.plants.find((plant) => plant.id === id);
            if (!this.plant) {
                this.plant = this.deadPlants.find((plant) => plant.id === id);
            }
        },
        async fetchPlants() {
            if(this.plants == null ) {
                const results = await this.parsePlants();
                this.plants = results.data.filter(plant => plant.dead_since === "");
                this.deadPlants = results.data.filter(plant => plant.dead_since !== "");
            }
        },
        async parsePlants() {
            return new Promise((resolve, reject) => {
                Papa.parse(window.googleSheetURL, {
                    header: true,
                    download: true,
                    complete: function(results) {
                        resolve(results);
                    },
                    error: function(error) {
                        reject(error);
                    }
                });
            });
        }
    },
    getters: {
        plantDetailFields: (state) => {
            if(state.plant) {
                let entries = Object.entries(state.plant);
                let filteredEntries = entries.filter(entry => {
                    return entry[1]!== "" && !protectedFields.includes(entry[0]);
                });
                filteredEntries.forEach(entry => {
                    entry[0] = entry[0].replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())
                        .replace (/[-_]+(.)/g, (_, c) => ' ' + c)
                });
                return filteredEntries
            }
        }
    }
});