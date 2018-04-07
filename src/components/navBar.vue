<template>
  <nav class="menu-bar" :class="{'show': show}">
    <!-- <user-info></user-info> -->
    <div class="menu-list">
      <router-link :to="{name: 'list', query: {tab: 'all'}}">
        <i class="iconfont icon-quanbu"></i>全部
      </router-link>
      <router-link :to="{name: 'list', query: {tab: 'good'}}">
        精华
      </router-link>
      <router-link :to="{name: 'list', query: {tab: 'share'}}">
        分享
      </router-link>
      <router-link :to="{name: 'list', query: {tab: 'ask'}}">
        问答
      </router-link>
      <router-link :to="{name: 'list', query: {tab: 'job'}}">
        招聘
      </router-link>
      <router-link :to="{name: 'message'}" style="position: relative">
        消息
        <span class="message-count" v-text="`+${messageCount}`" v-if="messageCount"></span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      messageCount: 0
    }
  },
  props: {
    show: Boolean
  }
}
</script>

<style lang="scss">
  .menu-bar {
    position: fixed;
    left: 0;
    top: 30px;
    bottom: 0;
    display: none;
    &.show {
      display: block;
    }
    .menu-list {
      height: 100%;
      padding-top: 90px;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      background: #ccc;
      list-style: none;
      a {
        display: block;
        color: #333;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
        text-decoration: none;
      }
    }
  }
</style>