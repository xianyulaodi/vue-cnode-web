<template>
  <section class="reply">
    <textarea id="content" class="text" rows="8"
      v-model="content"
      placeholder="支持markdown语法"
      v-focus="focus"
    ></textarea>
    <button class="btn btn-reply btn-reply-confirm" @click="handleReply">确定</button>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import * as types from '../constants/constants'
export default {
  data () {
    return {
      content: ''
    }
  },

  props: ['replyId', 'replyTo', 'topicId', 'focus'],

  mounted () {
    if(this.replyTo) {
      this.content = `@${this.replyTo}`;
    }
  },

  methods: {
    handleReply () {
      const data = {
        accesstoken: this.userInfo.accesstoken,
        content: this.content,
        reply_id: this.replyId,
        topicId: this.topicId
      }
      this.$store.dispatch(types.REPLY, data).then(() => {
        this.content = '';
        this.$emit('onReply'); // 自定义函数
      });
    }
  },

  computed: {
    ...mapState(['userInfo'])
  }
  
}
</script>

