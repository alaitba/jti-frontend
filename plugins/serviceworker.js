if ('serviceWorker' in navigator) {
	console.log('serviceWorker')
	navigator.serviceWorker.getRegistrations().then((registrations) => {
    	for (const worker of registrations) {
      		alert('Service worker:', worker)
      		console.log('Service worker:', worker);
    	}
  	});
}