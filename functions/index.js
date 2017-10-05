const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const webpush = require('web-push');

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
				webpush.setVapidDetails('mailto:len.krzysztof@gmail.com', 'BAUPeHt3kZqk4sF0HlrSs-zBP_E1AX0nQQiuB0SLXD5lhuh-YFWh69wPb6mX_mXVulzof3bMGmb73fczAnZILac', 'daDhOOzyWlScCUI_FqDtUDCDu7hhJKehWinP3oCYOnc');
				return admin.database().ref('subscription').once('value');
			})
			.then((subscription) => {
				subscription.forEach((sub) => {
					const pushConfig = {
						endpoint: sub.val().endpoint,
						keys: {
							auth: sub.val().keys.auth,
							p256dh: sub.val().keys.p256dh
						}
					};
					webpush.sendNotification(pushConfig, JSON.stringify({
						title: 'New contact',
						content: 'New contact added',
						openUrl: '/'
					}))
						.catch((err) => {
							console.log(err); // eslint-disable-line no-console
						});
				});
				response.status(201).json({ message: 'Data stored', id: request.body.id });
			})
			.catch((err) => {
				response.status(500).json({ error: err });
			});
	});
});

