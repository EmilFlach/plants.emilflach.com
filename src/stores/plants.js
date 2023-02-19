import { defineStore } from 'pinia'
const papa = require('papaparse');

export const usePlantsStore = defineStore('plants', {
    state: () => ({
        plants: null
    }),
    actions: {
        async fetchPlants() {
            try {
                if(!this.plantsFetched) {
                    await papa.parse('debug-plants.csv', {
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
                //TODO Handle plants could not be fetched
                alert("Plants could not be fetched");
                window.console.log(e);
            }
        }
    },
    getters: {
        getPlantById: (state) => {
            return (plantId) => state.plants.find((plant) => plant.id === plantId)
        }
    }
});