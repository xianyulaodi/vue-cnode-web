<template>
  <div class="header">
    <span class="mask" @click="toggleNavBar" v-if="show"></span>
    <header class="header-bar">
      <span class="menu-btn" @click="toggleNavBar"></span>
      <span class="info">
        <span class="vue-logo"></span>
        <span>{{ title }}</span>
      </span>
      <router-link :to="{name: 'create'}" class="publish-btn">
        <i class="iconfont icon-publish"></i>
      </router-link>
    </header>
    <nav-bar :show="show"></nav-bar>
  </div>
</template>

<script>
import navBar from './navBar'
export default {
  data () {
    return {
      show: false
    }
  },

  props: {
    title: {
      type: String,
      default: ''
    }
  },

  methods: {
    toggleNavBar () {
      this.show = !this.show
    }
  },

  components: {
    navBar
  }
}
</script>

<style lang="scss">
  .header {
    .mask {
      position: fixed;
      left: 0;
      right: 0;
      top: 30px;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    .header-bar {
      overflow: hidden;
      height: 30px;
      border-bottom: 1px solid #ccc;
    }
    .menu-btn {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: red;
    }
  }
</style>