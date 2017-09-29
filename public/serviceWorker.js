let CACHE_STATIC_NAME = 'static-v1.1';
let CACHE_DYNAMIC_NAME = 'dynamic-v1.0';
const STATIC_FILES = [
    "/",
    "/index.html",
    "/offline.html",
    "/main.bundle.js",
    "/src/js/promise.js", // support for older browser
    "/src/js/fetch.js", // don't make sens because service workers doesn't supports by older browsers
    "/src/images/benjamin-hung-340383.jpg",
    "https://fonts.googleapis.com/css?family=Roboto:400,700",
    "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.min.js",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css"
];

self.addEventListener('install', (event) => {
     console.log("[Service Worker] Installing Service Worker ...", event);
     event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then((cache) => {
                console.log("[Service Worker] Precaching App Shell");
                cache.addAll(STATIC_FILES);
            })
     )
});

self.addEventListener('activate', (event) => {
     console.log('[Service Worker] Activating Service Worker ...', event);
     return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
     event.respondWith(
         caches.match(event.request)
            .then((response) => {
                if(response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then((res) => {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then((cache) => {
                                    cache.put(event.request.url, res.clone());
                                        return res;
                                })
                        })
                }
            })
    );
});