import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: false,
    moderator: false,
  },
  mutations: {
    LOG_IN(state) {
      state.logged = true
    },
    LOG_OUT(state) {
      state.logged = false
    },
    MODERATOR_ON(state) {
      state.moderator = true
    },
    MODERATOR_OFF(state) {
      state.moderator = false
    }
  },
  actions: {
  },
  modules: {
  }
})
