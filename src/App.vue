<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import 'github-markdown-css'
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './static/css/normalize';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
