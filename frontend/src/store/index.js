import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editArticleId: '',  //编辑的文章的id
    userToken: '',  //用户token
    user: ''  //用户的身份
  },
  mutations: {
    changeEAId(state, id) {
      state.editArticleId = id
    },
    getToken(state, token) {
      state.userToken = token
    },
    getUser(state, identify) {
      state.user = identify
    }
  },
  actions: {
  },
  modules: {
  }
})
