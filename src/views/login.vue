<template>
  <div>
    <c-head title="登录"></c-head>
    <section class="login">
      <div class="login-token">
        <input type="text" class="txt" placeholder="Access Token" v-model="token" maxlength="36">
        <button class="btn btn-login" @click="handleLogin">登录</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cHead from '../components/header'
import * as types from '../constants/constants'
export default {
  data () {
    return {
      token: ''
    }
  },

  methods: {
    handleLogin () {
      const data = {
        accesstoken: this.token
      }
      this.$store.dispatch(types.LOGIN, data).then(() => {
        const redirect = decodeURIComponent(this.$route.query.redirect || 'list');
        console.log('redirect',redirect);
        this.$router.push({ name: redirect })
      })

    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // if(vm.userInfo.loginname) {
      //   vm.$route.replace({name: 'list'})
      // }
    })
  },

  components: {
    cHead
  }
}
</script>

<style lang="scss">
.login {
  padding-top: 40px;
  .login-token {
    padding: 0 15px;
    margin-top: 50px;
    input {
      padding: 12px 0;
      border-bottom: 1px solid #4fc08d;
      background-color: transparent;
      font-size: 1.4rem;
      color: #313131;
      width: 100%;
    }
    .btn-login {
      width: 100%;
      border-bottom: 2px solid #3aa373;
      background-color: #4fc08d;
      font-size: 1.6rem;
      margin: 15px 0;
      color: #fff;
      padding: 10px;
      border-radius: 3px;
    }
  }
}
</style>


