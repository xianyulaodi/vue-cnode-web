import Vue from 'vue'
import Vuex from 'vuex'
import topics from './modules/topics'
import loading from './modules/loading'
import detail from './modules/detail'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    topics,
    loading,
    detail
  }
})

export default store
