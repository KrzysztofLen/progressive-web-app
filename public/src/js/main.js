import './utility.js';

const shareImageButton = document.querySelector('#share-image-button'),
	createPostArea = document.querySelector('#create-post'),
	closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn'),
	pwaContactsList = document.querySelector('#pwa-contacts-list'),
	form = document.querySelector('form'),
	name = document.querySelector('#name'),
	email = document.querySelector('#email'),
	adress = document.querySelector('#adress'),
	bitcoin = document.querySelector('#bitcoin');

let defferedPrompt = '';

const openCreatePostModal = () => {
	createPostArea.style.transform = 'translateY(0)';

	if (defferedPrompt) {
		defferedPrompt.prompt();

		defferedPrompt.userChoice
			.then((choiceResult) => {
				console.log(choiceResult.outcome); // eslint-disable-line no-console

				if (choiceResult.outcome === 'dismissed') {
					console.log('User cancelled installation'); // eslint-disable-line no-console
				} else {
					console.log('User added to home screen'); // eslint-disable-line no-console
				}
			});

		defferedPrompt = null;
	}

	shareImageButton.style.display = 'none';
};

window.addEventListener('beforeinstallprompt', (event) => {
	console.log('beforeinstallprompt fired'); // eslint-disable-line no-console
	event.preventDefault();
	defferedPrompt = event;
	return false;
});

const closeCreatePostModal = () => {
	createPostArea.style.transform = 'translateY(100vh)';
	shareImageButton.style.display = 'block';
};

const clearContact = () => {
	while (pwaContactsList.hasChildNodes()) {
		pwaContactsList.removeChild(pwaContactsList.lastChild);
	}
};

const createContact = (data) => {
	const template = `
		<div class="demo-card-square mdl-card mdl-shadow--2dp">
			<div class="mdl-card__title mdl-card--expand">
				<span class="mdl-list__item-primary-content">
					<i class="material-icons mdl-list__item-avatar">person</i>
					<h4 class="pwa-card-name__name-header">${data.name}</h4>
				</span>
			</div>
			<div class="mdl-card__supporting-text">
				<div class="pwa-card-other-data-wrapper">
					<span class="pwa-card-label">email: </span>
					<span class="mdl-list__item-sub-title">${data.email}</span>
				</div>
				<div class="pwa-card-other-data-wrapper">
					<span class="pwa-card-label">adress: </span>
					<span class="mdl-list__item-sub-title">${data.adress}</span>
				</div>
				<div class="pwa-card-other-data-wrapper">
					<span class="pwa-card-label">bitcoin: </span>
					<span class="mdl-list__item-sub-title">${data.bitcoin}</span>
				</div>
				<div class="pwa-card-other-data-wrapper">
					<img src="${data.image}" alt="xyz">
				</div>
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">View</button>
			</div>
		</div>
	`
	pwaContactsList.innerHTML += template;
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

const updateUI = (data) => {
	clearContact();
	for (let index = 0; index < data.length; index++) {
		createContact(data[index]);
	}
};

const url = 'https://pwa-app-72fbb.firebaseio.com/contacts.json';
let networkDataReceived = false;

fetch(url)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		networkDataReceived = true;
		console.log('From web', data); // eslint-disable-line no-console

		const dataArray = [];

		for (const key in data) {
			dataArray.push(data[key]);
		}

		updateUI(dataArray);
	});

if ('indexedDB' in window) {
	getAllData('contacts')
		.then((data) => {
			if (!networkDataReceived) {
				console.log('[From cache]', data); // eslint-disable-line no-console
				updateUI(data);
			}
		});
}

// Send data imidiatly to backend
const sendData = () => {
	fetch('https://us-central1-pwa-app-72fbb.cloudfunctions.net/storeContactsData', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			id: new Date().toISOString(),
			name: name.value,
			email: email.value,
			adress: adress.value,
			bitcoin: bitcoin.value,
			image: 'https://firebasestorage.googleapis.com/v0/b/pwa-app-72fbb.appspot.com/o/brooke-lark-229136.jpg?alt=media&token=922238cc-7795-4316-ab1e-b32864c39f54'
		})
	})
		.then((res) => {
			console.log('Sent data', res); // eslint-disable-line no-console
			updateUI();
		});
};

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (name.value.trim() === '' || email.value.trim() === '' || adress.value.trim() === '' || bitcoin.value.trim() === '') {
		alert('Please enter valid data!');
		return;
	}

	closeCreatePostModal();

	if ('serviceWorker' in navigator && 'SyncManager' in window) {
		navigator.serviceWorker.ready
			.then((sw) => {

				const contact = {
					id: new Date().toISOString(),
					name: name.value,
					email: email.value,
					adress: adress.value,
					bitcoin: bitcoin.value
				};

				setAllData('sync-contacts', contact)
					.then(() => {
						return sw.sync.register('sync-new-contact');
					})
					// showing material message
					.then(() => {
						const snackbarContainer = document.querySelector('#confirmation-toast');
						const data = {message: 'Your Post was saved for syncing!'};
						snackbarContainer.MaterialSnackbar.showSnackbar(data);
					})
					.catch((err) => {
						console.log(err); // eslint-disable-line no-console
					});
			});
	} else {
		sendData();
	}
});
