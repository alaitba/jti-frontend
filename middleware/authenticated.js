export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home page
  if (localStorage.getItem("authToken")) {  	
  	console.log(localStorage.getItem("authToken"),'token')  	
    return redirect('/')
  }
}
