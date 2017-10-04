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

function urlBase64ToUint8Array(base64String) {
	var padding = '='.repeat((4 - base64String.length % 4) % 4);
	var base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	var rawData = window.atob(base64);
	var outputArray = new Uint8Array(rawData.length);

	for (var i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

const displayConfirmNotification = () => {
	if ('serviceWorker' in navigator) {
		const options = {
			body: 'You successfully subscribed to our Notification service!',
			icon: '/src/images/icons/apple-icon-96x96.png',
			dir: 'ltr',
			lang: 'en-US',
			vibrate: [ 500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500 ],
			badge:	'/src/images/icons/apple-icon-96x96.png',
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
			return swreg.pushManager.getSubscription();
		})
		.then((sub) => {
			if (sub === null) {
				// Create a new subscription
				const vapidPublicKey = 'BAUPeHt3kZqk4sF0HlrSs-zBP_E1AX0nQQiuB0SLXD5lhuh-YFWh69wPb6mX_mXVulzof3bMGmb73fczAnZILac';
				const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);

				return reg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: convertedVapidPublicKey
				});
			} else {
				// We have  a subscripion
			}
		})
		.then((newSubscription) => {
			return fetch('https://pwa-app-72fbb.firebaseio.com/subscription.json', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(newSubscription)
			})
		})
		.then((res) => {
			if (res.ok) {
				displayConfirmNotification();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

const askForNotificationPermission = () => {
	Notification.requestPermission()
		.then((result) => {
			console.log('[User Choice]', result); // eslint-disable-line no-console
			if (result !== 'granted') {
				console.log('[User Choice] : Notification Permission wasn\'t granted.'); // eslint-disable-line no-console
			} else {
				configurePushSub();
				// displayConfirmNotification();
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
