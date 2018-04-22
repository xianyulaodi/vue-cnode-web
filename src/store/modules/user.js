import * as types from '../../constants/constants'
import { login, userInfo } from "../../apis/index";

const state = {
  userInfo: {},
  userCenter: {}
}

const getters = {
  userInfo: state => state.userInfo,
  userCenter: state => state.userCenter
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
  },
  [types.GET_USERCENTER]({ commit },params) {
    commit(types.SHOW_LOADING, true);
    userInfo(params, function(res) {
      const data = res.data;
      if(data.success) {
        commit(types.SHOW_LOADING, true);
        commit(types.GET_USERCENTER, data.data);
      }
    },function(err) {

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
  },
  [types.GET_USERCENTER](state,data) {
    console.log(data);
    state.userCenter = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
