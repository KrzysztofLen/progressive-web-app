if (!window.Promise) {
	window.Promise = Promise; // eslint-disable-line no-undef
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/serviceWorker.js')
		.then( () => {
			console.log('Service worker registered!'); // eslint-disable-line no-console
		})
		.catch((err) => {
			console.log(err); // eslint-disable-line no-console
		});
}
