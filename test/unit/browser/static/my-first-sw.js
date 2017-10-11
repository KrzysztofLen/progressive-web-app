self.addEventListener('install', (event) => {
	const promiseChain = caches.open('test-cache')
		.then((openCache) => {
			return openCache.put(
				new Request('/__test/example'),
				new Response('Hello world')
			);
		});
	event.waitUntil(promiseChain);
});
