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
      const data = res.data
      if (data.success) {
        const user = {
          loginname: data.loginname,
          id: data.id,
          avatar_url: data.avatar_url,
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
  },
  [types.LOGIN_OUT] (state) {
    state.userInfo = {}
    localStorage.removeItem('userInfo')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
