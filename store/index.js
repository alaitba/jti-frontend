export const state = () => {
    return {
        auth: JSON.parse(localStorage.getItem("authUser")) ? JSON.parse(localStorage.getItem("authUser")) : null,
        authStatus: localStorage.getItem("authUserStatus") ? localStorage.getItem("authUserStatus") : null,
        number: localStorage.getItem("mobile_phone") ? localStorage.getItem("mobile_phone") : null,
        tradepoints: JSON.parse(localStorage.getItem("tradePoints")) ? JSON.parse(localStorage.getItem("tradePoints")) : null,
        selectedTradePoint: null,
        authToken: localStorage.getItem("authToken") ? localStorage.getItem("authToken") : null,
        numberAnketa: localStorage.getItem("anketaNumber") ? localStorage.getItem("anketaNumber") : null,
        brands: null,
        tokenStatus: null,
        checkedDays: localStorage.getItem('checkedDays') ? JSON.parse(localStorage.getItem('checkedDays')) : [],
        locales: ['ru', 'kk'],
        locale: 'ru',
        langs: null,
        loginStatus: true,
        passEnterStatus: false,
        subscribeStatus: localStorage.getItem('subscribeStatus') ? JSON.parse(localStorage.getItem('subscribeStatus')) : true,
    }
}

export const mutations = {
    SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    },
    changeLoginStatus(state, loginStatus){
        state.loginStatus = loginStatus;
    },
    changePassStatus(state, passEnterStatus){
        state.passEnterStatus = passEnterStatus;
    },
    setLangs(state, payload) {
        state.langs = payload
    },
    setUser (state,auth) {
        state.auth = auth
    },
    setAuthToken (state,authToken) {
      	state.authToken = authToken
    },
    setUserStatus (state,authStatus) {
        state.authStatus = authStatus
    },
    setSubscribeStatus (state, subscribeStatus){
        state.subscribeStatus = subscribeStatus
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
    setCheckedDays(state, checkedDays){
        state.checkedDays = checkedDays;
    },
    resetState (state) {
        state.auth = null;
        state.authStatus = null;
        state.number = null;
        state.tradepoints = null;
        state.setTradePoint = null;
        state.authToken = null;
        state.numberAnketa = null;
        state.brands = null;
        state.loginStatus = true;
        state.passEnterStatus = false;
    }
}