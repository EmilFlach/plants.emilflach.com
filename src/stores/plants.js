import { defineStore } from 'pinia'
const Papa = require('papaparse');

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
    }
});