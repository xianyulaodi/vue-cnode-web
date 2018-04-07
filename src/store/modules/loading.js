import * as types from '../../constants/constants'

const state = {
  showLoading: false
}

const getters = {
  showLoading: state => state.showLoading
}

const mutations = {
  [types.SHOW_LOADING](state, data) {
    if (data) {
      state.showLoading = data
    } else {
      state.showLoading = !state.showLoading
    }
  }
}

export default {
  state,
  getters,
  mutations
}