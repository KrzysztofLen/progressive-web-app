const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const serviceAccount = require('./pwa-app.json');

admin.initializeApp({
	credential:	admin.credential.cert(serviceAccount),
	databaseURL: 'https://pwa-app-72fbb.firebaseio.com/'
});

exports.storeContactsData = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		admin.database().ref('contacts').push({
			id: request.body.id,
			name: request.body.name,
			email: request.body.email,
			adress: request.body.adress,
			bitcoin: request.body.bitcoin,
			image: request.body.image
		})
		.then(() => {
			response.status(201).json({message: 'Data stored', id: request.body.id});
		})
		.catch((err) => {
			response.status(500).json({error: err});
		});
	});
});
