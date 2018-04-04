<template>
  <div>
    <v-header ref="head"></v-header>
    <section class="topic">
      <ul class="topic-list">
        <li v-for="item in topics" :key="item.id">
          <router-link key="item.id" :to="{ name: 'detail',params:{id: item.id} }">
            <div class="top">
              <span class="normal" :class="{color : item.good || item.top}" v-text="getTabName(item)"></span>
              <h3 :title="item.title">{{ item.title }}</h3>
            </div>
            <div class="bottom">
              <span class="author" :style="{ backgroundImage: `url(${ item.author.avatar_url })`}"></span>
              <div class="info">
                <p>
                  <span>{{ item.author.loginname }}</span>
                  <span>{{ item.reply_count }}/{{ item.visit_count }}</span>
                </p>
                <p>
                  <span>{{ item.create_at | timeFormat }}</span>
                  <span>{{ item.last_reply_at | timeFormat }}</span>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
    <div>
      <div class="loading">
        <i class="iconfont icon-loading"></i>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import * as types from '../constants/constants'
import vHeader from '../components/header'
import { timeFormat } from '../utils/utils'
import { topicTab } from '../constants/topicTab'

export default {
  data () {
    return {
      title: 'node中文网',
      searchConfig: {
        page: 1,
        limit: 10,
        tab: 'all'
      }
    }
  },

  mounted () {
    if (this.$route.query && this.$route.query.tab) {
      this.searchConfig.tab = this.$route.query.tab
    }
    this.getTopics()
  },

  // 将 store 中的 getter 映射到局部计算属性：
  computed: {
    ...mapGetters([
      'topics'
    ])
  },

  methods: {
    getTopics () {
      this.$store.dispatch(
        types.GET_TOPICS,
        this.searchConfig
      )
    },
    getTabName (item) {
      let tab = item.tab
      if (item.good) {
        tab = 'good'
      } 
      if (tab.top) {
        tab = 'top'
      }
      return topicTab[tab]
    }
  },

  filters: {
    timeFormat (str) {
      return timeFormat(str)
    }
    
  },

  watch: {
    '$route' (to) {
      if (to.query && to.query.tab) {
        this.searchConfig.tab = to.query.tab
      }
      this.searchConfig.page = 1
      this.getTopics()
      this.$refs.head.show = false
    }
  },

  components: { vHeader }
}

</script>

<style lang="scss" rel="stylesheet/scss">
@import '../static/css/topic';
body{
  background: #f8f8f8;
  width: 100%;
  overflow-x: hidden;
}
.head-tab{
  height: 40px;
  display: flex;
  max-width: 375px;
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  li{
    flex:1;
  }
  .active{
    color: red;
  }
}

</style>
