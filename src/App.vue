<template>
  <h1>The plants of Emil & Lucia</h1>
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
</style>
