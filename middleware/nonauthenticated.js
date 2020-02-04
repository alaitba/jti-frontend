if(!navigator.cookieEnabled){
  alert('Включите cookies в настройках браузера и обновите страницу');  
} 
export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  if(route.name=='Selectstore') return
  if (localStorage.getItem("authToken")) {
	  	if((localStorage.getItem("setTradePoint")=='f')){  			
  	  		return redirect('/selectstore')
  		} else {
        if(route.name!=='Auth-ResetPassword'){
    			return redirect('/')          
        }
  		}  	  	
  } else{
  	if(!localStorage.getItem("authUser") && route.name!='Auth-Signin'){
  		return redirect('/auth/signin')
  	}
  }
}
