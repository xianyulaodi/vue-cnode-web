<template>
  <div id="app">
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
  overflow-x: hidden;
}
.tab {
  display: flex;
  border-bottom: 1px solid #d4d4d4;
  height: 42px;
  .tab-item {
    flex: 1;
    border-right: 1px solid #d4d4d4;
    text-align: center;
    font-weight: 700;
    font-size: 1.6rem;
    padding: 10px 0;
    height: 42px;
    &.active {
      color: #ff5a5f;
      border-bottom: 2px solid #ff5a5f;
    }
    &:last-child {
      border-right: none;
    }
  }
}

.no-data {
  text-align: center;
  color: #d4d4d4;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .iconfont.icon-empty {
    display: block;
    font-size: 12.5rem;
    color: #d4d4d4;
  }
}
</style>
