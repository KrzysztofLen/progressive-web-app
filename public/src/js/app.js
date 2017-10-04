const enableNotificationsButtons = document.querySelectorAll('.enable-notifications');

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

const displayConfirmNotification = () => {
	if ('serviceWorker' in navigator) {
		const options = {
			body: 'You successfully subscribed to our Notification service!',
			icon: '/src/images/icons/apple-icon-96x96.png',
			dir: 'ltr',
			lang: 'en-US',
			vibrate: [ 500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500 ],
			bagde:	'/src/images/icons/apple-icon-96x96.png',
			tag: 'confirm-notification',
			renotify: true,
			actions: [
				{
					action: 'confirm',
					title: 'Yes',
					icon: '/src/images/icons/check.png'
				},
				{
					action: 'cancel',
					title: 'No',
					icon: '/src/images/icons/close.png'
				}
			]
		};

		navigator.serviceWorker.ready
			.then((swreg) => {
				swreg.showNotification('Succesfully subscribed! (from SW)', options);
			});
	}

};

const configurePushSub = () => {
	if (!('serviceWorker' in navigator)) {
		return;
	}

	let reg;
	navigator.serviceWorker.ready
		.then((swreg) => {
			reg = swreg;
			swreg.pushManager.getSubscription();
		})
		.then((sub) => {
			if (sub === null) {
				// Create a new subscription
				reg.pushManager.subscribe({
					userVisibleOnly: true
				});
			} else {
				// We have  a subscripion
			}
		});
};

const askForNotificationPermission = () => {
	Notification.requestPermission()
		.then((result) => {
			console.log('[User Choice]', result); // eslint-disable-line no-console
			if (result !== 'granted') {
				console.log('[User Choice] : Notification Permission wasn\'t granted.'); // eslint-disable-line no-console
			} else {
				// configurePushSub();
				displayConfirmNotification();
			}
		});
};

// check support
if ('Notification' in window && 'serviceWorker' in navigator) {
	for (let i = 0; i < enableNotificationsButtons.length; i++) {
		enableNotificationsButtons[ i ].style.display = 'inline-block';
		enableNotificationsButtons[ i ].addEventListener('click', askForNotificationPermission);
	}
}
