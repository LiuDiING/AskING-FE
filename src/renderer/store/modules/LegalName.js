const state = {
  fullName: ''
}

const mutations = {
  UPDATE_LEGAL_NAME (state, fullName) {
    state.fullName = fullName
  },
  REMOVE_LEGAL_NAME (state) {
    state.fullName = ''
  }
}

const actions = {
  updateLegalName ({ commit }, fullName) {
    commit('UPDATE_LEGAL_NAME', fullName)
  },
  removeLegalName ({ commit }) {
    commit('REMOVE_LEGAL_NAME')
  }
}

export default {
  state,
  mutations,
  actions
}
