const state = {
  token: ''
}

const mutations = {
  updateToken (state, Token) {
    state.token = Token
  }
}

const actions = {
  update ({ commit }, Token) {
    // do something async
    commit('updateToken', Token)
  }
}

export default {
  state,
  mutations,
  actions
}
