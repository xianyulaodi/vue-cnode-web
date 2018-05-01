<template>
  <div>
    <c-head title="消息"></c-head>

    <div v-if="message && message.hasnot_read_messages">
      <section class="message">
        <ul class="tab">
          <li class="tab-item" :class="{active: this.activeItem == 1 }" @click="handleTab(1);">已读消息</li>
          <li class="tab-item" :class="{active: this.activeItem == 2 }" @click="handleTab(2);">未读消息</li>
        </ul>
        <div v-if="(activeItem == 1 && message.has_read_messages.length == 0) || (activeItem == 2 && message.hasnot_read_messages.length == 0)" >
          <div class="no-data">
            <i class="iconfont icon-empty"></i>
            暂无数据!
          </div>
        </div>

        <div v-else>
          <div class="message-content" v-for="(item,index) in (activeItem == 1 ? message.has_read_messages : message.hasnot_read_messages)" :key="index" >
            <section class="author-info">
              <router-link :to="{name: 'user', params: {loginname: item.author.loginname} }">
                <img class="head" :src="item.author.avatar_url" />
              </router-link>
              <div class="info">
                <span class="left">
                  <span class="name">{{ item.author.loginname }}</span>
                  <span class="name" v-if="item.type==='at'">在回复中@了您</span>
                  <span class="name" v-if="item.type==='reply'">回复了您的话题</span>
                </span>
                <span class="right">
                  <span class="name">{{item.reply.create_at | timeFormat}}</span>
                </span>
              </div>
            </section>
            <div class="reply-content markdown-body" v-html="item.reply.content"></div>
            <router-link :to="{name: 'detail', params: {id:item.topic.id}}">
              <div class="topic-title">
                话题：{{item.topic.title}}
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </div>
    <c-loading :show="showLoading"></c-loading>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import cHead from '../components/header';
  import cLoading from '../components/loading';
  import { message } from '../apis/index';
  import { timeFormat } from '../utils/utils';
  import * as types from '../constants/constants';
  export default {
    data() {
      return {
        activeItem: 1,
        noData: false
      }
    },
    
    mounted() {
      if(this.userInfo.loginname) {
        this.getMessages();
      }
    },

    methods: {
      getMessages() {
        this.$store.dispatch(
          types.GET_MESSAGE,
          { accesstoken: this.userInfo.accesstoken }
        )
      },
      handleTab(index) {
        this.activeItem = index;
      }
    },

    filters: {
      timeFormat (str) {
        return timeFormat(str);
      }
    },

    computed: {
      ...mapGetters(['showLoading', 'userInfo','message'])
    },
    components: {
      cHead,
      cLoading
    }
  }

</script>

<style lang="scss">
.message {
  padding-top: 40px;
  text-align: left;
  .message-content {
    padding: 10px 0;
    border-bottom: 1px solid #d4d4d4;
    .author-info {
      display: flex;
      padding: 0 10px;
      margin: 10px 0;
      .head {
        width: 40px;
        height: 40px;
        margin-right: 15px;
      }
      .info {
        flex: 1;
        display: flex;
        .left {
          flex: 1;
          color: #626262;
          font-size: 1.6rem;
        }
        .right {
          color: #80bd01;
          font-size: 1.2rem;
        }
      }
    }
    .reply-content {
      padding: 15px;
    }
    a {
      display: block;
      margin: 0 15px;
      .topic-title {
        padding: 5px;
        font-size: 1.8rem;
        color: #2c3e50;
        background-color: #f0f0f0;
        border-radius: 5px;
      }
    }
  }
  .no-data {
    height: calc('100vh - 90px');
  }

}
</style>

