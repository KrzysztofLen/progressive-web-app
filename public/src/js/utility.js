// const dbPromise = idb.open('contacts-store', 1, (db) => { // eslint-disable-line no-undef
// 	if (!db.objectStoreNames.contains('contacts')) {
// 		db.createObjectStore('contacts', {	keyPath: 'id'	});
// 	}

// 	if (!db.objectStoreNames.contains('sync-contacts')) {
// 		db.createObjectStore('sync-contacts', {	keyPath: 'id'	});
// 	}
// });

// # TODO Figure it out how import method
// const idbKeyval = {
// 	get: (st) => {
// 		return dbPromise
// 			.then((db) => {
// 				return db.transaction(st, 'readonly')
// 					.objectStore(st).getAll();
// 			});
// 	},
// 	set: (st, data) => {
// 		return dbPromise
// 			.then((db) => {
// 				const tx = db.transaction(st, 'readwrite');
// 				let store = tx.objectStore(st);
// 				store.put(data);
// 				return tx.complete;
// 			});
// 	},
// 	clear: (st) => {
// 		return dbPromise
// 			.then((db) => {
// 				const tx = db.transaction(st, 'readwrite');
// 				const store = tx.objectStore(st);
// 				store.clear();
// 				return tx.complete;
// 			});
// 	},
// 	delete: (st, id) => {
// 		return dbPromise
// 			.then((db) => {
// 				const tx = db.transaction(st, 'readwrite');
// 				const store = tx.objectStore(st);
// 				store.delete(id);
// 				return tx.complete;
// 			});
// 	}
// };

// const setAllData = (st, data) => { // eslint-disable-line no-unused-vars
// 	return dbPromise
// 		.then((db) => {
// 			const tx = db.transaction(st, 'readwrite');
// 			const store = tx.objectStore(st);
// 			store.put(data);
// 			return tx.complete;
// 		});
// };

// function getAllData(st) { // eslint-disable-line no-unused-vars
// 	return dbPromise
// 		.then((db) => {
// 			const tx = db.transaction(st, 'readonly');
// 			const store = tx.objectStore(st);
// 			return store.getAll();
// 		});
// }

// const clearAllData = (st) => { // eslint-disable-line no-unused-vars
// 	return dbPromise
// 		.then((db) => {
// 			const tx = db.transaction(st, 'readwrite');
// 			const store = tx.objectStore(st);
// 			store.clear();
// 			return tx.complete;
// 		});
// };

// const deleteItemFromDatabase = (st, id) => { // eslint-disable-line no-unused-vars
// 	return dbPromise
// 		.then((db) => {
// 			const tx = db.transaction(st, 'readwrite');
// 			const store = tx.objectStore(st);
// 			store.delete(id);
// 			return tx.complete;
// 		});
// };

/* eslint-disable */
var dbPromise = idb.open('contacts-store', 1, function (db) {
	if (!db.objectStoreNames.contains('contacts')) {
	  db.createObjectStore('contacts', {keyPath: 'id'});
	}
	if (!db.objectStoreNames.contains('sync-contacts')) {
	  db.createObjectStore('sync-contacts', {keyPath: 'id'});
	}
  });

  function setAllData(st, data) {
	return dbPromise
	  .then(function(db) {
		var tx = db.transaction(st, 'readwrite');
		var store = tx.objectStore(st);
		store.put(data);
		return tx.complete;
	  });
  }

  function getAllData(st) {
	return dbPromise
	  .then(function(db) {
		var tx = db.transaction(st, 'readonly');
		var store = tx.objectStore(st);
		return store.getAll();
	  });
  }

  function clearAllData(st) {
	return dbPromise
	  .then(function(db) {
		var tx = db.transaction(st, 'readwrite');
		var store = tx.objectStore(st);
		store.clear();
		return tx.complete;
	  });
  }

  function deleteItemFromDatabase(st, id) {
	dbPromise
	  .then(function(db) {
		var tx = db.transaction(st, 'readwrite');
		var store = tx.objectStore(st);
		store.delete(id);
		return tx.complete;
	  })
	  .then(function() {
		console.log('Item deleted!');
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
