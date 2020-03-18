if(!navigator.cookieEnabled){
  alert('Включите cookies в настройках браузера и обновите страницу');  
} 
export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  if(route.name=='selectstore1') return
  if (localStorage.getItem("authToken")) {
	  	if((localStorage.getItem("setTradePoint")=='f')){  			
  	  		return redirect('/selectstore1')
  		} else {
        if(route.name!=='auth2-resetpassword'){
    			return redirect('/')          
        }
  		}  	  	
  } else{
  	if(!localStorage.getItem("authUser") && route.name!='auth2-signin'){
  		return redirect('/auth2/signin')
  	}
  }
}
