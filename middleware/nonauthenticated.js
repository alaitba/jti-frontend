if(!navigator.cookieEnabled){
	alert('Включите cookies в настройках браузера и обновите страницу');
}
export default function ({ app, store, redirect, route }) {
  	// If the user is not authenticated
  	// if(route.path.replace(new RegExp('/kk', 'g'),'') == '/selectstore/') return
    if(route.name  == 'selectstore' || route.name == 'lang-selectstore') return
  	if (localStorage.getItem("authToken")) {
	  	if((localStorage.getItem("setTradePoint")=='f')){
  	  		return redirect(app.i18n.path('/selectstore'))
  		} else {
        	// if(route.path.replace(new RegExp('/kk', 'g'),'') != '/auth/resetpassword/'){
            if(!(route.name == 'auth-resetpassword' || route.name =='lang-auth-resetpassword')){
          		console.log('routegh: ', route.path.replace(new RegExp('/kk', 'g'),''))
    			return redirect('/')
        	}
  		}
  	} else{
        console.log('hello', route, route.path.replace(new RegExp('/kk', 'g'),'') !='/auth/signin')
  		if(!localStorage.getItem("authUser") && !(route.name == 'auth-signin' || route.name == 'lang-auth-signin')){
            console.log(app.i18n.path('auth/signin'), app.i18n.path(''), app.i18n.path('/'))
  			return redirect(app.i18n.path('auth/signin'))
  		}
  	}
}
