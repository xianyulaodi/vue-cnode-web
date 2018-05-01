<template>  
  <div>
    <c-head></c-head>
    <div class="topic" v-if="detail.title">
      <h2 class="topic-title">{{ detail.title }}</h2>
      <section class="author-info">
        <router-link :to="{name: 'user', params: {loginname: detail.author.loginname}}">
          <img :src="detail.author.avatar_url" alt="" class="avatar" />
        </router-link>

        <div class="center">
          <span class="author">{{ detail.author.loginname }}</span>
          <time class="info">发布于： {{ detail.create_at | timeFormat }}</time>
          <router-link 
              v-if="userInfo.loginname && detail.author.loginname == userInfo.loginname"
              :to="{name: 'update', params: {topic_id: detail.id}}">
              编辑
          </router-link>
        </div>

        <div class="right">
          <span class="tag" v-text="getTabInfo(detail)" :class="{color: detail.good || detail.top}"></span>
          <span class="visit-count">{{ detail.visit_count }}次浏览</span>
        </div>
      </section>

      <section class="topic-content markdown-body" v-html="detail.content"></section>

      <div class="topic-reply">
        <h3 class="reply-total">{{ detail.reply_count }}回复</h3>
        <ul class="reply-list">
          <li v-for="(item,index) in detail.replies" :key="index">
            <section class="user">
              <router-link :to="{name: 'user', params: {loginname: item.author.loginname} }">
                <img :src="item.author.avatar_url" alt="" class="head" />
              </router-link>
              <div class="info">
                <span class="left">
                  <span class="name">{{ item.author.loginname }}</span>
                  <span class="time">发布于：{{ item.create_at | timeFormat }}</span>
                </span>
                <span class="right">
                  <span class="iconfont icon-dianzan" 
                    :class="{'uped': isUps(item.ups)}"
                    @click="handleUpReply(item)" >
                  </span>
                  <span>{{ item.ups.length }}</span>
                  <span class="iconfont icon-hf" @click="addReply(item.id)"></span>
                </span>
              </div>
            </section>
            <div class="reply-content markdown-body" v-html="item.content"></div>
            <c-reply v-if="userInfo.loginname && replyId == item.id"
              :reply-to="item.author.loginname"
              :reply-id="item.id"
              :topic-id="topicId"
              :focus="true"
              @onReply="handleReply"></c-reply>
          </li>
        </ul>
      </div>
      <c-reply v-if="userInfo.loginname" :topic-id="topicId"></c-reply>
    </div>
    <c-totop></c-totop>
    <c-loading :show="showLoading"></c-loading>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import cHead from '../components/header'
  import cTotop  from '../components/toTop'
  import cLoading from '../components/loading'
  import cReply from '../components/reply'
  import store from '../store/index'
  import { timeFormat, toast } from "../utils/utils"
  import { upReply } from '../apis/index'
  import * as types from '../constants/constants'
  import { topicTab } from '../constants/topicTab'
  import '../static/css/topic.scss'

  export default {
    data () {
      return {
        topicId: '',
        replyId: ''
      }
    },
    created () {
      this.topicId = this.$route.params.id;
      this.getDetail();
    },

    computed: {
      ...mapGetters(['detail', 'userInfo', 'showLoading']) // mapState 和 mapGetters 返回值是不一样的
    },

    beforeRouteEnter (to, from, next) {
      // store.state.detail = {};
      next()
    },

    filters: {
      timeFormat (str) {
        return timeFormat(str);
      }
    },

    methods: {
      getDetail () {
        this.$store.dispatch(types.GET_DETAIL,{ id: this.topicId });
      },

      getTabInfo (item) {
        let tab = item.tab;
        if(item.good) {
          tab = 'good';
        }
        if(item.top) {
          tab = 'top';
        }
        return topicTab[tab];
      },

      addReply (id) {
        if (!this.userInfo.loginname) {
          this.$router.push({
            name: 'login',
            query: { redirect: encodeURIComponent(this.$route.name ) }
          })
        }
        this.replyId = id;
      },

      handleReply() {
        this.replyId = '';
      },

      //点赞评论
      handleUpReply (item) {
        const userInfo = this.userInfo;
        if (!userInfo || !userInfo.loginname) {
          this.$router.push({
            name: 'login',
            query: { redirect: encodeURIComponent(this.$route.name) }
          })
          return;
        }
        if(item.author.loginname == userInfo.loginname) {
           toast('不能帮自己点赞');
           return;
        }
        upReply({accesstoken: userInfo.accesstoken, replyId: item.id }, function (res) {
          const data = res.data;
          if (data.success) {
            if (data.action == 'down') {
              const index = item.ups.indexOf(userInfo.id);
              if(index > -1) {
                item.ups.splice(index, 1);
              } 
            } else {
              item.ups.push(userInfo.id);
            }
          } 
        }, function(err) {
          console.log(err);
        })
      },
      
      // 是否已点赞
      isUps (ups) {
        return ups.indexOf(this.userInfo.id) > -1;
      }
    },

    components: {
      cHead,
      cTotop,
      cLoading,
      cReply
    }
  }
</script>