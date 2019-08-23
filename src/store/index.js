import Vue from 'vue'
import Vuex from 'vuex'
// 加载所有成员  user.getUser
import * as user from '@/utils/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: user.getUser()
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      user.saveUser(state.user)
    }
  },
  actions: {}
})
