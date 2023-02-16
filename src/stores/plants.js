import { defineStore } from 'pinia'


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

                    await window.vm.$papa.parse(window.googleSheetURL, {
                        header: true,
                        download: true,
                        complete: (results) => {
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