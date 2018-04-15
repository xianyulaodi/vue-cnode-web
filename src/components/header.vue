<template>
  <div class="header">
    <span class="page-cover" @click="toggleNavBar" v-if="show"></span>
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
import '../static/css/header.scss'
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