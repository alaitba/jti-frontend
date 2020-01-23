export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  // console.log(route,'route')
  if(route.name=='Selectstore') return
  if (localStorage.getItem("authToken")) {
	  	if((localStorage.getItem("setTradePoint")=='f')){  			
	  		return redirect('/selectstore')
		} else {
			return redirect('/')
		}  	  	
  } else{
  	if(!localStorage.getItem("authUser") && route.name!='Auth-Signin'){
  		return redirect('/auth/signin')
  	}
  }
}
