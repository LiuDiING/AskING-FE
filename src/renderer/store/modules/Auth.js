const state = {
  username: '',
  token: ''
}

const mutations = {
  SET_USERNAME (state, username) {
    state.username = username
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}

const actions = {
  setUsername ({ commit }, username) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER', username)
  },
  setToken ({ commit }, token) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER', token)
  }
}

export default {
  state,
  mutations,
  actions
}
