import * as types from '../../constants/constants'
import { getTopics } from '../../apis/index'

const state = {
  topics: []
}

const getters = {
  topics: state => state.topics
}

const actions = {
  [types.GET_TOPICS] ({ commit }, params) {
    getTopics(params, function (res) {
      commit(types.GET_TOPICS, { topics: res.data.data })
    }, function (err) {
      console.log(err)
    })
  }
}

const mutations = {
  [types.GET_TOPICS] (state, data) {
    state.topics = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
