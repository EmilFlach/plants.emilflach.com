import {defineStore} from 'pinia'
const Papa = require('papaparse');

export const usePlantsHistoryStore = defineStore('plants_history', {
    state: () => ({
        plantsHistory: null,
        history: null
    }),
    actions: {
        async fetchPlantHistoryById(id) {
            await this.fetchPlantsHistory();
            this.history = this.plantsHistory.filter((entry) => entry.plant_id === id);
        },
        async fetchPlantsHistory() {
            if(this.plantsHistory == null ) {
                const results = await this.parsePlantsHistory();
                this.plantsHistory = results.data;
            }
        },
        async parsePlantsHistory() {
            return new Promise((resolve, reject) => {
                Papa.parse(window.plantHistorySheet, {
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
    }
});