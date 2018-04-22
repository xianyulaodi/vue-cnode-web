<template>
  <div>
      <c-head title="用户中心"></c-head>
      <div v-if="userCenter.loginname">
        <section class="user-page">
          <div class="info">
            <img :src="userCenter.avatar_url" alt="头像">
            <span class="name">{{ userCenter.loginname }}</span>
            <div class="bottom">
              <span class="time">{{ userCenter.create_at | timeFormat }}</span>
              <span class="score">积分：{{ userCenter.score }}</span>
            </div>
          </div>
          <div class="user-active">
            <ul class="tab">
              <li class="tab-item" :class="{active: this.activeItem === 1}"
                @click="handleTab(1)">最近参与</li>
              <li class="tab-item" :class="{active: this.activeItem === 2}"
                @click="handleTab(2)">最新发布</li>
            </ul>
            <div class="active-content" v-for="item of currentData">
              <router-link class="head" :to="{name:'user',params:{loginname:item.author.loginname}}">
                <img :src="item.author.avatar_url" alt="">
              </router-link>
              <router-link class="right" :to="{name:'topic',params:{id:item.id}}">
                <span class="tpoic-title">{{item.title}}</span>
                <span class="topic-bottom">
                  <span class="name" v-text="item.author.loginname"></span>
                  <span class="time">{{item.last_reply_at | timeFormat}}</span>
                </span>
              </router-link>
            </div>
            <div class="no-data" v-show="noData">
              <i class="iconfont icon-empty"></i>
              暂无数据!
            </div>
          </div>
        </section>
      </div>
      <c-loading></c-loading>
      <c-top></c-top>
  </div>
</template>

<script>
  import { mapGetters,mapMutations } from 'vuex';
  import cHead from '../components/header.vue';
  import cLoading from '../components/loading.vue';
  import cTop from '../components/toTop.vue';
  import { timeFormat } from '../utils/utils';
  import * as types from '../constants/constants';
  export default {
    data() {
      return {
        user: {},
        currentData: [],
        activeItem: 1,
        noData: false
      }
    },

    filters: {
      timeFormat(str) {
        return timeFormat(str)
      }
    },

    mounted() {
      this.getUserInfo();
    },

    methods: {
      getUserInfo() {
        const name = this.$route.params.loginname;
        this.$store.dispatch(
          types.GET_USERCENTER,
          {name: name}
        )
      },
      handleTab(index) {
        this.activeItem = index;
      }
    },

    computed: {
      ...mapGetters(['userCenter'])
    },

    components: {
      cHead,
      cLoading,
      cTop
    }
  }
</script>