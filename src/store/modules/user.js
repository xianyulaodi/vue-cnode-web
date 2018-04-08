import * as types from '../../constants/constants'
import { login } from '../../apis/index'

const state = {
  userInfo: {}
}

const getters = {
  userInfo: state => state.userInfo
}

const actions = {
  [types.LOGIN] ({ commit }, params) {
    login(params, function (res) {
      if (res.params) {
        const user = {
          loginname: res.loginname,
          id: res.id,
          params: res.params,
          accesstoken: params.accesstoken
        }
        localStorage.setItem('userInfo', JSON.stringify(user))
        commit(types.LOGIN, user)
      }
    }, function (err) {
      console.log(err)
    })
  }
}

const mutations = {
  [types.LOGIN] (state, user) {
    state.userInfo = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
