
export default function ({ store, redirect, $axios }) {
  // If the user is authenticated redirect to home page
  // console.log($axios,'aasdsa');
  if (localStorage.getItem("authToken")) { 
  	if((localStorage.getItem("setTradePoint")=='t')){
  		console.log('default',localStorage.getItem("setTradePoint"))
  		// return redirect('/')
  	} else {
  		console.log('default2',localStorage.getItem("setTradePoint"))
  		return redirect('/selectstore')
  	}
  } else{
  		return redirect('/auth/signin')
  }
}
