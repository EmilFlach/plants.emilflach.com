<template>
  <h1>Emil & Lucia's {{plants != null ? plants.length : ''}} plants</h1>
  <Loader v-if="!loaded" />
  <Plants v-if="loaded" :plants="plants"/>
</template>

<script>
import Plants from './components/Plants.vue'
import Loader from './components/Loader.vue'

export default {
  name: 'App',
  components: {
    Plants,
    Loader
  },
  data: function() {
    return {
      plants: null,
      loaded: false
    }
  },
  created () {
    document.title = "Emil & Lucia's plants";
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
          this.loaded = true
        }
      });
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Merriweather|Poppins:300');

  body {
    background: rgba(47,110,0,0.13);
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }

  h1 {
    text-align: center;
    Font-Family: 'Merriweather', sans-serif;
    Font-Size: 48px;
  }
</style>
