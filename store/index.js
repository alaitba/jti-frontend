export const state = () => {
  return {
    auth: null,
    number: null,
    tradepoints: null,
  }
}

export const mutations = {
  setUser (state,auth) {
    state.auth = auth
  },
  setNumber (state, number) {
  	state.number = number
  },
  setTradePoints (state, tradepoints) {
  	state.tradepoints = tradepoints;
  }
}