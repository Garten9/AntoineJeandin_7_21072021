import { createStore } from 'vuex'

export default createStore({
  state: {
    logged : false,
  },
  mutations: {
    LOG_IN(state){
      state.logged = true
    },
    LOG_OUT(state){
      state.logged = false
    }
  },
  actions: {
  },
  modules: {
  }
})
