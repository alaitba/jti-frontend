if(!navigator.cookieEnabled){
	alert('Включите cookies в настройках браузера и обновите страницу');
}
export default function ({ app, store, redirect, route }) {
  	// If the user is not authenticated
  	if(route.path.replace(new RegExp('/kk', 'g'),'') == '/selectstore') return
  	if (localStorage.getItem("authToken")) {
	  	if((localStorage.getItem("setTradePoint")=='f')){
  	  		return redirect('/selectstore')
  		} else {
        	if(route.path.replace(new RegExp('/kk', 'g'),'') != '/auth/resetpassword'){
          		console.log('routegh: ', route.path.replace(new RegExp('/kk', 'g'),''))
    			return redirect('/')
        	}
  		}
  	} else{
  		if(!localStorage.getItem("authUser") && route.path.replace(new RegExp('/kk', 'g'),'') !='/auth/signin'){
  			return redirect('/auth/signin')
  		}
  	}
}
