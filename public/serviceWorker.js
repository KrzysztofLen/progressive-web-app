importScripts('/src/js/idb.js');

let CACHE_STATIC_NAME = 'static-v1.9';
let CACHE_DYNAMIC_NAME = 'dynamic-v1.0';
const STATIC_FILES = [
    "/",
    "/index.html",
    "/offline.html",
    "/main.bundle.js",
    "/src/js/promise.js", // support for older browser
    "/src/js/fetch.js", // don't make sens because service workers doesn't supports by older browsers
    "/src/js/idb.js",
    "/src/images/benjamin-hung-340383.jpg",
    "https://fonts.googleapis.com/css?family=Roboto:400,700",
    "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.min.js",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css"
];

var dbPromise = idb.open('contacts-store', 1, function(db) {
    if(!db.objectStoreNames.contains('contacts')) {
        db.createObjectStore('contacts', {keyPath: 'id'});
    }
});

const isInArray = (string, array) => {
    let cachePath;

    if(string.indexOf(self.origin) === 0) {
        cachePath = string.substring(self.origin.length);
    } else {
        cachePath = string;
    }

    return array.indexOf(cachePath) > -1;
}

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

// Removing old cache
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating Service Worker ...', event);
    event.waitUntil(
        caches.keys()
            .then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if(key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        console.log('[Service Worker] Removing old cache.', key);
                        return caches.delete(key);
                    }
                }));
            })
        )
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = 'https://pwa-app-72fbb.firebaseio.com/contacts';

    if(event.request.url.indexOf(url) > -1) {
        event.respondWith(fetch(event.request)
            .then((res) => {
                let clonedRes = res.clone();    

                clonedRes.json()
                    .then((data) => {
                        for(let key in data) {
                            dbPromise
                                .then((db) => {
                                    let tx = db.transaction('contacts', 'readwrite');
                                    let store = tx.objectStore('contacts');
                               console.log(data[key]);
                                    return tx.complete;
                                });
                        }
                    });

                return res;
            })
        );

    } else if(isInArray(event.request.url, STATIC_FILES)) {
        event.respondWith(
            caches.match(event.request)
        );
    } else {
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
                            .catch((err) => {
                                return caches.open(CACHE_STATIC_NAME)
                                    .then((cache) => {
                                        if(event.request.headers.get('accept').includes('text/html')) {
                                            return cache.match('/offline.html');
                                        }
                                    });
                            });
                    }
                })
        );
    }
});