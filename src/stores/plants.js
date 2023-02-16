import { defineStore } from 'pinia'
const papa = require('papaparse');

export const usePlantsStore = defineStore('plants', {
    state: () => ({
        plants: null,
        selectedPlant: null,
        plantsFetched: false
    }),
    actions: {
        async fetchPlants() {
            try {
                if(!this.plantsFetched) {
                    await papa.parse(window.googleSheetURL, {
                        header: true,
                        download: true,
                        complete: (results) => {
                            window.console.log(results.data);
                            this.plants = results.data;
                            this.plantsFetched = true;
                        }
                    });
                }
            } catch (e) {
                window.console.log(e);
            }
        }
    },
});