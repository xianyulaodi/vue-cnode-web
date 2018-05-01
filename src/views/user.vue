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
            <div class="active-content" v-for="(item,index) of currentData" :key="index">
              <router-link class="head" :to="{name:'user',params:{loginname:item.author.loginname}}">
                <img :src="item.author.avatar_url" alt="">
              </router-link>
              <router-link class="right" :to="{name:'detail',params:{id:item.id}}">
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
      <c-loading :show="showLoading" ></c-loading>
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

    created() {
      this.getUserInfo();
    },

    watch:{ 
      userCenter() { 
        this.currentData = this.userCenter.recent_replies;
        this.noData = this.currentData.length === 0;
      },
      '$route' (to) {
        this.getUserInfo();
      }
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
        this.currentData = index == 1 ? this.userCenter.recent_replies : this.userCenter.recent_topics;
        this.noData = this.currentData.length === 0;
      }
    },

    computed: {
      ...mapGetters(['userCenter','showLoading'])
    },

    components: {
      cHead,
      cLoading,
      cTop
    }
  }
</script>

<style lang="scss">
.user-page {
  text-align: left;
  padding-top: 40px;
  .info {
    background-color: #e7e7e7;
    padding: 15px 0;
    img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      display: block;
        margin: 0 auto;
    }
    span.name {
      text-align: center;
      margin-top: 5px;
      display: block;
    }
    .bottom {
      margin-top: 15px;
      display: -webkit-flex;
      display: flex;
      .time {
        text-align: center;
        flex: 1;
      }
      .score {
        text-align: center;
        color: #80bd01;
        flex: 1;
      }
    }
  }
  .user-active {
    .active-content {
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #f0f0f0;
      .head {
        img {
          width: 40px;
          height: 40px;
          margin-right: 15px;
          border-radius: 50%;
          border: 2px solid #fff6e6;
        }
      }
      .right {
        flex: 1;
        overflow: hidden;
        .tpoic-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          font-weight: 700;
          font-size: 1.8rem;
          color: #333;
        }
        .topic-bottom {
          display: flex;
          margin-top: 5px;
          .name {
            color: #626262;
            flex: 1;
          }
          .time {
            color: #80bd01;
            font-size: 1.2rem;
          }
        }
      }
    }
    .no-data {
      height: -webkit-calc('100vh - 270px');
      height: calc('100vh - 270px');
    }
  }
}
</style>
