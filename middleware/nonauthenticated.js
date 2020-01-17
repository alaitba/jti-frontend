export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!localStorage.getItem("authToken")) {
  	return redirect('/auth/signin')
  }
}
