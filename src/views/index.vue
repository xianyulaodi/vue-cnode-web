<template>
  <div>
    <c-header ref="head" :title="headTitle"></c-header>
    <section class="topic">
      <ul class="topic-list">
        <li v-for="(item,index) in topics" :key="index">
          <router-link key="item.id" :to="{ name: 'detail',params:{id: item.id} }">
            <div class="top">
              <span class="normal" :class="{color: item.good || item.top}" v-text="getTabName(item)"></span>
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
    <div v-show="showListLoading">
      <div class="loading">
        <i class="iconfont icon-loading"></i>
      </div>
    </div>
    <c-loading :show="showLoading"></c-loading>
    <c-totop></c-totop>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import * as types from '../constants/constants'
import cHeader from '../components/header'
import cLoading from '../components/loading'
import cTotop  from '../components/toTop'
import { timeFormat } from '../utils/utils'
import { topicTab } from '../constants/topicTab'
import { UPDATE_TOPIC_LIST } from '../../../vue-cnode-mobile/src/constants/mutationTypes';

export default {
  data () {
    return {
      searchConfig: {
        page: 1,
        limit: 10,
        tab: 'all'
      },
      scrollDelay: false
    }
  },

  mounted () {
    if (this.$route.query && this.$route.query.tab) {
      this.searchConfig.tab = this.$route.query.tab;
    }
    var lastRequestTab = sessionStorage.getItem('tab');
    if (lastRequestTab && lastRequestTab === (this.$route.query.tab || 'all')) {
      this.searchConfig = JSON.parse(sessionStorage.getItem(searchConfig));
    } else {
      this.getTopics();
    }
    document.addEventListener('scroll', this.getScrollData, false);
  },

  beforeDestroy () {
    document.removeEventListener('scroll', this.getScrollData);
  },

  beforeRouteEnter (to, from, next) {
    if (from.name != 'detail' || (to.query.tab || 'all') !== sessionStorage.getItem('tab')) {
      sessionStorage.removeItem('scrollTop');
      sessionStorage.removeItem('searchConfig');
      sessionStorage.removeItem('tab');
    }
    next();
  },

  // 为了从详情页回来的时候，页面还保留在原来位置
  beforeRouteLeave (to, from, next) {
    if(to.name == 'detail') {
      sessionStorage.setItem('scrollTop', document.body.scrollTop || document.documentElement.scrollTop);
      sessionStorage.setItem('searchConfig', JSON.stringify(this.searchConfig));
      sessionStorage.setItem('tab',this.searchConfig.tab);
    }
    next();
  },

  // 将 store 中的 getter 映射到局部计算属性：
  computed: {
    ...mapGetters([
      'topics','showLoading','showListLoading'
    ]),
    headTitle () {
      const tab = (this.$route.query && this.$route.query.tab) || 'all';
      return topicTab[tab];
    }
  },

  methods: {
    
    getTopics () {
      this.$store.dispatch(
        types.GET_TOPICS,
        this.searchConfig
      )
    },

    getTabName (item) {
      let tab = item.tab;
      if (item.good) {
        tab = 'good';
      } 
      if (item.top) {
        tab = 'top';
      }
      return topicTab[tab];
    },

    getScrollData () {
      const y = document.body.scrollTop || document.documentElement.scrollTop;
      const documentH = document.documentElement.clientHeight;
      const dom = document.querySelectorAll('.topic-list li');
      if (dom.length && (dom[dom.length - 1].offsetTop + dom[dom.length - 1].offsetHeight <= y + documentH) && !this.scrollDelay) {
        this.searchConfig.page = this.searchConfig.page + 1;
        this.scrollDelay = true;
        this.$store.dispatch(types.UPDATE_TOPICS, this.searchConfig).then(() => {
          this.scrollDelay = false;
        })
      }
    }
  },

  filters: {
    timeFormat (str) {
      return timeFormat(str);
    }
  },

  watch: {
    '$route' (to) {
      if (to.query && to.query.tab) {
        this.searchConfig.tab = to.query.tab;
      }
      this.searchConfig.page = 1;
      this.getTopics();
      this.$refs.head.show = false;
    }
  },

  components: { cHeader, cLoading, cTotop }
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
.loading {
  width: 120px;
  /*height: 120px;*/
  margin: 5px auto;
  text-align: center;
  background: blue;
  .icon-loading {
    color: #ccc;
    display: inline-block;
    font-size: 5rem;
    animation: gif 1s infinite linear;
  }

  @keyframes gif {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
    
}

</style>
