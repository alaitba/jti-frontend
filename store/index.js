export const state = () => {
  return {
    auth: null,
    authStatus: false,
    number: null,
    tradepoints: null,
  }
}

export const mutations = {
  setUser (state,auth) {
    state.auth = auth
  },
  setUserStatus (state,authStatus) {
    state.authStatus = authStatus
  },
  setNumber (state, number) {
  	state.number = number
  },
  setTradePoints (state, tradepoints) {
  	state.tradepoints = tradepoints;
  }
}