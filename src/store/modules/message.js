import * as types from "../../constants/constants";
import { messages } from "../../apis/index";

const state = {
  message: {}
};

const getters = {
  message: state => state.message
};

// 调用commit，提交一个 mutation
const actions = {
  [types.GET_MESSAGE]({ commit }, params) {
    commit(types.SHOW_LOADING, true);
    messages(params, function(res) {
        commit(types.GET_MESSAGE, { data: res.data.data });
        commit(types.SHOW_LOADING, false);
      }, function(err) {
        console.log(err);
      });
  }
};

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
const mutations = {
  [types.GET_MESSAGE](state, data) {
    state.message = data.data || {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
