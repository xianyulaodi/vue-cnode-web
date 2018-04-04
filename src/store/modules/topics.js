import * as types from '../../constants/constants'
import { getTopics } from '../../apis/index'

const state = {
  topics: []
}

const getters = {
  topics: state => state.topics
}

// 调用commit，提交一个 mutation
const actions = {
  [types.GET_TOPICS] ({ commit }, params) {
    console.log(123,params);
    getTopics(params, function (res) {
      commit(types.GET_TOPICS, { topics: res.data.data })
    }, function (err) {
      console.log(err)
    })
  }
}

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
const mutations = {
  [types.GET_TOPICS] (state, data) {
    state.topics = data.topics || []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
