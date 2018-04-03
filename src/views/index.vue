<template>
  <div>
    <ul class="head-tab">
      <li v-for="(item,index) in tabs" :key="index" @click="getTopics(item.tab,index)" >
          <h3 v-if="index == tabId" class="active"> {{ item.name }}</h3>
          <h3 v-else>{{ item.name }}</h3>
      </li>
    </ul>
    <div>
      {{ topics }}
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
// import ListItem from '@components/list-item'
import * as types from '../constants/constants'

export default {
  data () {
    return {
      title: 'node中文网',
      tabs: [
        {name: '全部', tab: 'all'},
        {name: '精华', tab: 'good'},
        {name: '分享', tab: 'share'},
        {name: '问答', tab: 'ask'},
        {name: '招聘', tab: 'job'}
      ],
      tabId: 0,
      page: 1
    }
  },

  // 将 store 中的 getter 映射到局部计算属性：
  computed: {
    ...mapGetters([
      'topics'
    ])
  },

  methods: {
    getTopics (tab, index) {
      let page = this.page
      this.$store.dispatch({
        type: types.GET_TOPICS,
        page: page,
        tab: tab
      })
      this.tabId = index
    }
  },

  mounted () {
    this.getTopics('all', 0)
  },

  components: { }
}

</script>

<style lang="scss" rel="stylesheet/scss">
body{
  background: #f8f8f8;
  width: 100%;
  overflow: hidden;
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
