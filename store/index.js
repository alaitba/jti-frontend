export const state = () => {
  return {
    auth: null,
    authStatus: false,
    number: null,
    tradepoints: null,
    selectedTradePoint: null,
    authToken: null,
    numberAnketa: null,
    brands: null,
  }
}

export const mutations = {
  setUser (state,auth) {
    state.auth = auth
  },
  setAuthToken (state,authToken){
  	state.authToken = authToken
  },
  setUserStatus (state,authStatus) {
    state.authStatus = authStatus
  },
  setNumber (state, number) {
  	state.number = number
  },
  setNumberAnketa (state, numberAnketa) {
  	state.numberAnketa = numberAnketa
  },
  setTradePoints (state, tradepoints) {
  	state.tradepoints = tradepoints;
  },
  setTradePoint (state, tradepoint) {
  	state.tradepoint = tradepoint;	
  },
  setBrands (state, brands) {
  	state.brands = brands;
  }
}