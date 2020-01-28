export const state = () => {
  return {
    auth: JSON.parse(localStorage.getItem("authUser")) ? JSON.parse(localStorage.getItem("authUser")) : null,
    authStatus: false,
    number: null,
    tradepoints: JSON.parse(localStorage.getItem("tradePoints")) ? JSON.parse(localStorage.getItem("tradePoints")) : null,
    selectedTradePoint: null,
    authToken: localStorage.getItem("authToken") ? localStorage.getItem("authToken") : null,
    numberAnketa: localStorage.getItem("anketaNumber") ? localStorage.getItem("anketaNumber") : null,
    brands: null,
    tokenStatus: null,
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
  },
  setTokenStatus (state, tokenStatus){
    state.tokenStatus = tokenStatus;
  },
  resetState (state) {
    state.auth = null;
    state.authStatus = false;
    state.number = null;
    state.tradepoints = null;
    state.setTradePoint = null;
    state.authToken = null;
    state.numberAnketa = null;
    state.brands = null;
  }
}