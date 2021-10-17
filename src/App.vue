<template>
  <h1>Emil & Lucia's plants</h1>
  <Plants/>
</template>

<script>
import Plants from './components/Plants.vue'

export default {
  name: 'App',
  components: {
    Plants
  },
  created () {
    document.title = "Emil & Lucia's plants";
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
