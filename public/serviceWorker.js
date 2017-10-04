importScripts('/src/js/idb.js'); // eslint-disable-line no-undef
importScripts('/src/js/utility.js'); // eslint-disable-line no-undef

const CACHE_STATIC_NAME = 'static-v1.14';
const CACHE_DYNAMIC_NAME = 'dynamic-v1.0';
const STATIC_FILES = [
	'/',
	'/index.html',
	'/offline.html',
	'/main.bundle.js',
	'/src/js/material.min.js',
	'/src/js/promise.min.js', // support for older browser
	'/src/js/fetch.min.js', // don't make sens because service workers doesn't supports by older browsers
	'/src/js/idb.min.js',
	'/src/images/benjamin-hung-340383.jpg',
	'https://fonts.googleapis.com/css?family=Roboto:400,700',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
];

const isInArray = (string, array) => {
	let cachePath;

	if (string.indexOf(self.origin) === 0) {
		cachePath = string.substring(self.origin.length);
	} else {
		cachePath = string;
	}

	return array.indexOf(cachePath) > -1;
};

self.addEventListener('install', (event) => {
	console.log('[Service Worker] Installing Service Worker ...', event); // eslint-disable-line no-console
	event.waitUntil(
		caches.open(CACHE_STATIC_NAME)
			.then((cache) => {
				console.log('[Service Worker] Precaching App Shell'); // eslint-disable-line no-console
				cache.addAll(STATIC_FILES);
			})
	);
});

// Removing old cache
self.addEventListener('activate', (event) => {
	console.log('[Service Worker] Activating Service Worker ...', event); // eslint-disable-line no-console
	event.waitUntil(
		caches.keys()
			.then((keyList) => {
				return Promise.all(keyList.map((key) => { // eslint-disable-line no-undef
					if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
						console.log('[Service Worker] Removing old cache.', key); // eslint-disable-line no-console
						return caches.delete(key);
					}
				}));
			})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	const url = 'https://pwa-app-72fbb.firebaseio.com/contacts';

	if (event.request.url.indexOf(url) > -1) {
		event.respondWith(fetch(event.request)
			.then((res) => {
				const clonedRes = res.clone();
				clearAllData('contacts') // eslint-disable-line no-undef
					.then(() => {
						console.log('[indexDB data cleared!]'); // eslint-disable-line no-console
						return clonedRes.json();
					})
					.then((data) => {
						for (const key in data) {
							setAllData('contacts', data[ key ]); // eslint-disable-line no-undef
						}
					});
				return res;
			})
		);

	} else if (isInArray(event.request.url, STATIC_FILES)) {
		event.respondWith(
			caches.match(event.request)
		);
	} else {
		event.respondWith(
			caches.match(event.request)
				.then((response) => {
					if (response) {
						return response;
					} else {
						return fetch(event.request)
							.then((res) => {
								return caches.open(CACHE_DYNAMIC_NAME)
									.then((cache) => {
										cache.put(event.request.url, res.clone());
										return res;
									});
							})
							.catch((err) => {
								console.log(err); // eslint-disable-line no-console
								return caches.open(CACHE_STATIC_NAME)
									.then((cache) => {
										if (event.request.headers.get('accept').includes('text/html')) {
											return cache.match('/offline.html');
										}
									});
							});
					}
				})
		);
	}
});

self.addEventListener('sync', (event) => {
	console.log('[Service Worker] Background syncing', event); // eslint-disable-line no-console

	if (event.tag === 'sync-new-contact') {
		console.log('[Service Worker] Syncing new Contact'); // eslint-disable-line no-console
		event.waitUntil(
			getAllData('sync-contacts') // eslint-disable-line no-undef
				.then((data) => {
					for (const dt of data) {
						fetch('https://us-central1-pwa-app-72fbb.cloudfunctions.net/storeContactsData', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								'Accept': 'application/json'
							},
							body: JSON.stringify({
								id: dt.id,
								name: dt.name,
								email: dt.email,
								adress: dt.adress,
								bitcoin: dt.bitcoin,
								image: 'https://firebasestorage.googleapis.com/v0/b/pwa-app-72fbb.appspot.com/o/brooke-lark-229136.jpg?alt=media&token=922238cc-7795-4316-ab1e-b32864c39f54'
							})
						})
							.then((res) => {
								console.log('Sent data', res); // eslint-disable-line no-console
								if (res.ok) {
									res.json()
										.then((resData) => {
											deleteItemFromDatabase('sync-contacts', resData.id); // eslint-disable-line no-undef
										});
								}
							})
							.catch((err) => {
								console.log('Error while sending data', err); // eslint-disable-line no-console
							});
					}
				})
		);
	}
});

// notification click event
self.addEventListener('notificationclick', (event) => {
	const notification = event.notification;
	const action = event.action;

	console.log(notification); // eslint-disable-line no-console

	if (action === 'confirm') {
		console.log('[Confirm was chosen]'); // eslint-disable-line no-console
	} else {
		console.log(action); // eslint-disable-line no-console
	}
	notification.close();
});

self.addEventListener('notificationclose', (event) => {
	console.log('[Notification was closed', event); // eslint-disable-line no-console
});
