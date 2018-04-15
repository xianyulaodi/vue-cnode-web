// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './static/css/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: function (el, binding) {
    if(binding.value) {
      el.focus();
    }
  }
})

if (localStorage.getItem('userInfo')) {
  store.commit('LOGIN', JSON.parse(localStorage.getItem('userInfo')))
}

// 登录验证
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 已登录
    if (store.state.userInfo.userInfo.loginname) {
      next()
    } else {
      // 未登录
      next({
        path: '/login',
        query: { redirect: encodeURIComponent(to.name) } // 缓存要跳的页面，方便登录后直接跳转
      })
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
