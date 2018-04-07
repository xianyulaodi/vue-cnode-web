import * as types from '../../constants/constants'
import { getDetail } from '../../apis/index'

const state = {
  detail: {}
}

const getters = {
  detail: state => state.detail
}

// 调用commit，提交一个 mutation
const actions = {
  [types.GET_DETAIL] ({ commit }, params) {
    getDetail(params, function (res) {
      commit(types.GET_DETAIL, { detail: res.data.data })
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
