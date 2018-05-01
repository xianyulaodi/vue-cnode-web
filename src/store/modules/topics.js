import * as types from '../../constants/constants'
import { getTopics } from '../../apis/index'

const state = {
  topics: [],
  showListLoading: false
}

const getters = {
  topics: state => state.topics,
  showListLoading: state => state.showListLoading
}

// 调用commit，提交一个 mutation
const actions = {
  [types.GET_TOPICS] ({ commit }, params) {
    commit(types.SHOW_LOADING, true)
    getTopics(params, function (res) {
      commit(types.GET_TOPICS, { topics: res.data.data })
      commit(types.SHOW_LOADING, false)
    }, function (err) {
      console.log(err)
    })
  },
  [types.UPDATE_TOPICS] ({ commit }, params) {
    commit(types.SHOW_LIST_LOADING, true);
    getTopics(params, function (res) {
      commit(types.UPDATE_TOPICS, { topics: res.data.data })
      commit(types.SHOW_LIST_LOADING, false);
    }, function (err) {
      console.log(err)
    })
  }
}

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
const mutations = {
  [types.GET_TOPICS] (state, data) {
    state.topics = data.topics || []
  },
  [types.UPDATE_TOPICS] (state, data) {
    state.topics = [...state.topics, ...data.topics]
  },
  [types.SHOW_LIST_LOADING] (state, data) {
    if (data) {
      state.showListLoading = true
    } else {
      state.showListLoading = !state.showListLoading
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
