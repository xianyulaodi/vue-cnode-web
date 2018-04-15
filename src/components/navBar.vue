<template>
  <nav class="menu-bar" :class="{'show': show}">
    <user-info></user-info>
    <div class="menu-list">
      <router-link :to="{name: 'list', query: {tab: 'all'}}">
        <i class="iconfont icon-quanbu"></i>全部
      </router-link>
      <router-link :to="{name: 'list', query: {tab: 'good'}}">
        <i class="iconfont icon-jinghua"></i>精华
      </router-link>
      <router-link :to="{name: 'list', query: {tab: 'share'}}">
        <i class="iconfont icon-share"></i>分享
      </router-link>
      <router-link :to="{name: 'list', query: {tab: 'ask'}}">
        <i class="iconfont icon-share"></i>问答
      </router-link>
      <router-link :to="{name: 'list', query: {tab: 'job'}}">
        <i class="iconfont icon-wenda"></i>招聘
      </router-link>
      <router-link :to="{name: 'message'}" style="position: relative">
        <i class="iconfont icon-xiaoxi"></i>消息
        <span class="message-count" v-text="`+${messageCount}`" v-if="messageCount"></span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import userInfo from './userInfo'
import { messageCount } from '../apis/index'
export default {
  data () {
    return {
      messageCount: 0
    }
  },

  props: {
    show: Boolean
  },

  mounted () {
   this.getMessageCount();
  },
  
  methods:{
    getMessageCount () {
      if(this.userInfo.loginname) {
        messageCount({accesstoken: this.userInfo.accesstoken}, function(res) {
          this.messageCount = res.data;
        },function(err) {

        })
      }
    }
  },
  
  computed: {
    ...mapGetters(['userInfo'])
  },
  
  components: {
    userInfo
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
    background: #fff;
    z-index: 8;
    &.show {
      display: block;
    }
    .menu-list {
      height: 100%;
      padding-top: 20px;
      box-sizing: border-box;
      list-style: none;
      a {
        display: block;
        color: #333;
        padding: 20px 20px;
        text-decoration: none;
      }
    }
    .message-count {
      position: absolute;
      color: red;
      left: 40px;
      top: 15px;
    }
  }
</style>