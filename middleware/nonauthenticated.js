if(!navigator.cookieEnabled){
  alert('Включите cookies в настройках браузера и обновите страницу');  
} 
export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  if(route.name=='selectstore') return
  if (localStorage.getItem("authToken")) {
	  	if((localStorage.getItem("setTradePoint")=='f')){  			
  	  		return redirect('/selectstore')
  		} else {
        if(route.name!=='auth-resetpassword'){
    			return redirect('/')          
        }
  		}  	  	
  } else{
  	if(!localStorage.getItem("authUser") && route.name!='auth-signin'){
  		return redirect('/auth/signin')
  	}
  }
}
