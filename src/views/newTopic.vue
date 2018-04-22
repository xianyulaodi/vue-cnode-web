<template>
  <div>
    <c-head title="主题"></c-head>
    <div class="topic-create">
      <div class="category">
        <span>选择模块：</span>
        <select name="" id="" v-model="topic.tab">
          <option value="share">分享</option>
          <option value="ask">问答</option>
          <option value="job">招聘</option>
          <option value="dev">测试</option>
        </select>
      </div>
      <div class="title">
        <input type="text" v-model.trim="topic.title" placeholder="标题字数至少10个字" maxlength="100" />
      </div>
      <div class="content">
        <textarea v-model.trim="topic.content" rows="15" placeholder="支持markdown语法"></textarea>
      </div>
      <button @click="handleSubmit">发布</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cHead from '../components/header'
import { addTopic } from '../apis/index'
export default {
  data () {
    return {
      topic: {
        tab: 'share',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      const ctx = this;
      const { title, content } = ctx.topic;
      if (!title || title.length < 10) {
        alert('标题至少10个字');
        return;
      }
      if (!content) {
        alert('内容不能为空');
        return;
      }
      const params = {
        ...ctx.topic,
        accesstoken: this.userInfo.accesstoken
      }
      addTopic(params, function(res) {
        if (res.success) {
          sessionStorage.removeItem('scrollTop');
          sessionStorage.removeItem('searchConfig');
          sessionStorage.removeItem('tab');
          ctx.$router.push({
            name: 'list'
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    cHead
  }
}
</script>

<style lang="scss">
.topic-create {
  padding-top: 40px;
  .category {
    border-bottom: 1px solid #d4d4d4;
    padding: 15px 20px;
    span {
      display: inline-block;
    }
    select {
      width: 100px;
      border: 1px solid rgb(169, 169, 169);
      height: 30px;
      border-radius: 3px;
      font-size: 1.6rem;
      padding: 3px;
    }
  }
  .title {
    padding: 15px 20px;
    border-bottom: 1px solid #d4d4d4;
    input {
      width: 100%;
      height: 30px;
      border-radius: 5px;
      box-shadow: 0 0 2px rgba(60,60,60,.5);
      font-size: 1.4rem;
      padding: 5px;
    }
  }
  .content {
    padding: 15px 20px;
    textarea {
      width: 100%;
      border: 1px solid rgb(169, 169, 169);
      border-radius: 3px;
      padding: 5px;
      font-size: 16px;
    }
  }
  button {
    display: block;
    margin: 0 20px;
    background-color: #80bd01;
    padding: 8px 15px;
    border-radius: 5px;
    color: #fff;
  }
}
</style>


