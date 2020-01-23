
export default function ({ store, redirect, $axios }) {
  // If the user is authenticated redirect to home page
  // console.log($axios,'aasdsa');
  if (localStorage.getItem("authToken")) { 
  	if((localStorage.getItem("setTradePoint")=='t')){
  		// console.log('default',localStorage.getItem("setTradePoint"))
  		return redirect('/')
  	}
  } else{
  		return redirect('/auth/signin')
  }
}
