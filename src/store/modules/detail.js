import * as types from '../../constants/constants'
import { getDetail, reply } from '../../apis/index'

const state = {
  detail: {}
}

const getters = {
  detail: state => state.detail
}

// 调用commit，提交一个 mutation
const actions = {
  [types.GET_DETAIL] ({ commit }, params) {
    commit(types.SHOW_LOADING, true)
    getDetail(params, function (res) {
      commit(types.GET_DETAIL, { detail: res.data.data })
      commit(types.SHOW_LOADING, false)
    }, function (err) {
      console.log(err)
    })
  },
  [types.REPLY] ({ commit, dispatch }, params) {
    const topicId = params.topicId
    delete params.topicId
    reply(params, topicId, function (res) {
      if (res.success) {
        dispatch(types.GET_DETAIL, {id: topicId})
      }
    }, function (err) {
      console.log(err)
    })
  }
}

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
const mutations = {
  [types.GET_DETAIL] (state, data) {
    state.detail = data.detail || {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
