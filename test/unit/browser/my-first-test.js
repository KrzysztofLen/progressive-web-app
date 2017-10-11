describe('Service worker Suite', () => {
	beforeEach(function() {
		return navigator.serviceWorker.getRegistrations()
			.then((registrations) => {
				const unregisterPromises = registrations.map((registration) => {
					return registration.unregister();
				});
				return Promise.all(unregisterPromises);
			});
	});

	it('should register a service worker and cache file on install', () => {
		// 1: Register service worker.
		// 2: Wait for service worker to install.
		// 3: Check cache was performed correctly.

		return navigator.serviceWorker.register('static/my-first-sw.js')
			.then((reg) => {
				return window.__waitForSWState(reg, 'installed');
			});
	});
});
