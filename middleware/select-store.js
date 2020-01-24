
export default async function ({ store, redirect, $axios }) {
  // If the user is authenticated redirect to home page
  // console.log($axios,'aasdsa');

  $axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("authToken");
  try {
    let res = await $axios.$post('/auth/refresh/');
      localStorage.setItem('authToken',res.token);
    }catch(error){
        console.log('error');
        localStorage.clear();
        store.commit('resetState');
    }

  if (localStorage.getItem("authToken")) { 
  	if((localStorage.getItem("setTradePoint")=='t')){
  		// console.log('default',localStorage.getItem("setTradePoint"))
  		return redirect('/')
  	}else if((localStorage.getItem("setTradePoint")=='f')) {
        // console.log('default2',localStorage.getItem("setTradePoint"))
        // return redirect('/selectstore')

    } else {
      // console.log('st')
      localStorage.clear();
      store.commit('resetState');
      return redirect('/auth/signin')
    }
  } else{
  		return redirect('/auth/signin')
  }
}
