
export default async function ({ store, redirect, $axios }) {
  // If the user is authenticated redirect to home page

  // if(!store.state.tokenStatus){
  // 	$axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("authToken");
	 //  // console.log(localStorage.getItem("authToken"),'tokenBefore');
	 //  try {
	 // 		let res = await $axios.$post('/auth/refresh/');
	 //     	localStorage.setItem('authToken',res.token);
	 //     	store.commit('setTokenStatus', true);
	 //     	// console.log(localStorage.getItem("authToken"),'tokenAfter');
	 //  }catch(error){
	 //  		// console.log('error');
		// 	// console.log(localStorage.getItem("authToken"),'tokenAfter1');
	 //    	localStorage.clear();
	 //    	store.commit('resetState');
	 //  }
  // }  
  // $axios.post('/auth/refresh/')
  //   .then(response => {
  //     localStorage.setItem('authToken',response.data.token);
  //     // console.log('response',response.data)
  //   })
  //   .catch(() => {
  //     console.log('error');
  //     localStorage.clear();
  //   })

  if (localStorage.getItem("authToken")) { 
  	if((localStorage.getItem("setTradePoint")=='t')){
  		// console.log('default',localStorage.getItem("setTradePoint"))
  		// return redirect('/')
  	} else if((localStorage.getItem("setTradePoint")=='f')) {
  		// console.log('default2',localStorage.getItem("setTradePoint"))
  		return redirect('/selectstore')
  	} else {
  		// console.log('no trd')
  		localStorage.clear();
    	store.commit('resetState');
    	return redirect('/auth/signin')
  	}
  } else{
  		return redirect('/auth/signin')
  }
}
