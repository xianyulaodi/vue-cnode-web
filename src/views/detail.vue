<template>
  <div class="detail">
    <div class="text">这里是详情页</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import cHead from '../components/header'
  import * as types from '../constants/constants'
  export default {
    data () {
      return {
        topicId: '',
        replyId: ''
      }
    },
    mounted () {
      this.topicId = this.$route.params.id;
      this.getDetail();
    },
    methods: {
      getDetail () {
        this.$store.dispatch(types.GET_DETAIL,{id: this.topicId})
      }
    },
    components: {
      cHead
    }
  }
</script>