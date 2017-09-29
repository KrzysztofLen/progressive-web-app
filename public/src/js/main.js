const shareImageButton = document.querySelector('#share-image-button');
const createPostArea = document.querySelector('#create-post');
const closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
const pwaContactsList = document.querySelector('#pwa-contacts-list');
let defferedPrompt = '';

const openCreatePostModal = () => {
	createPostArea.style.display = 'block';

	if(defferedPrompt) {
		defferedPrompt.prompt();

		defferedPrompt.userChoice
			.then((choiceResult) => {
				console.log(choiceResult.outcome);

				if (choiceResult.outcome === 'dismissed') {
					console.log('User cancelled installation');
				} else {
					console.log('User added to home screen');
				}
			});

			defferedPrompt = null;
	}

	shareImageButton.style.display = 'none';
}

window.addEventListener('beforeinstallprompt', (event) => {
    console.log("beforeinstallprompt fired");
    event.preventDefault();
    defferedPrompt = event;
    return false;
});

const closeCreatePostModal = () => {
	createPostArea.style.display = 'none';
	shareImageButton.style.display = 'block';
}

const clearContact = () => {
	while(pwaContactsList.hasChildNodes()) {
		pwaContactsList.removeChild(pwaContactsList.lastChild);
	}
}

const createContact = (data) => {
	for (let i = 0; i < 3; i++) {
		
	const cardWrapper = document.createElement('div');
	cardWrapper.className = 'demo-card-square mdl-card mdl-shadow--2dp';

	const cardPersonName = document.createElement('div');
	cardPersonName.className = 'mdl-card__title mdl-card--expand';
	cardWrapper.appendChild(cardPersonName);

	const personDataWrapper = document.createElement('span');
	personDataWrapper.className = 'mdl-list__item-primary-content';
	cardPersonName.appendChild(personDataWrapper);

	const personIcon = document.createElement('i');
	personIcon.className = 'material-icons mdl-list__item-avatar';
	personIcon.textContent =  'person';
	personDataWrapper.appendChild(personIcon);

	const personName = document.createElement('h4');
	personName.className = 'pwa-card-name__name-header';
	personName.textContent = data.name;
	personDataWrapper.appendChild(personName);

	const personOtherData = document.createElement('div');
	personOtherData.className = 'mdl-card__supporting-text';
	cardWrapper.appendChild(personOtherData);

	const spanLabelArray = [];
	const spanDataArray = [];

	for (let index = 0; index < 3; index++) {
		const seperatingDiv = document.createElement('div');
		seperatingDiv.className = 'pwa-card-other-data-wrapper';
		personOtherData.appendChild(seperatingDiv);
	
		const personOtherDataCardLabel = document.createElement('span');
		personOtherDataCardLabel.className = 'pwa-card-label';
		seperatingDiv.appendChild(personOtherDataCardLabel);

		const personOtherDataCardData = document.createElement('span');
		personOtherDataCardData.className = 'mdl-list__item-sub-title';
		seperatingDiv.appendChild(personOtherDataCardData);

		spanDataArray.push(personOtherDataCardData);
		spanLabelArray.push(personOtherDataCardLabel);
	}

	spanLabelArray[0].textContent = 'email: ';
	spanLabelArray[1].textContent = 'adress: ';
	spanLabelArray[2].textContent = 'bitcoin: ';

	spanDataArray[0].textContent = 	data.email;
	spanDataArray[1].textContent = 	data.adress;
	spanDataArray[2].textContent = 	data.bitcoin;

	const seperatingDivForImage = document.createElement('div');
	seperatingDivForImage.className = 'pwa-card-other-data-wrapper';
	personOtherData.appendChild(seperatingDivForImage);

	const personOtherDataImage = document.createElement('img');
	personOtherDataImage.setAttribute('src', data.image);
	personOtherDataImage.setAttribute('alt', 'xyz');
	seperatingDivForImage.appendChild(personOtherDataImage);

	const personDataOtherButtonWrapper = document.createElement('div');
	personDataOtherButtonWrapper.className = 'mdl-card__actions mdl-card--border';
	cardWrapper.appendChild(personDataOtherButtonWrapper);

	const personDataOtherButton = document.createElement('button');
	personDataOtherButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored';
	personDataOtherButton.textContent = 'View';
	personDataOtherButtonWrapper.appendChild(personDataOtherButton);

	pwaContactsList.appendChild(cardWrapper);

	}	
};

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

const updateUI = (data) => {
	clearContact();
	for (var index = 0; index < data.length; index++) {
		createContact(data[index]);	
	}
}

const url = 'https://pwa-app-72fbb.firebaseio.com/contacts.json';
let networkDataReceived = true;

fetch(url)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		networkDataReceived = true;
		console.log('From web', data);
		
		let dataArray = [];

		for(let key in data) {
			dataArray.push(data[key]);
		}

		updateUI(dataArray);
	});

if('caches' in window) {
	caches.match(url)
		.then((response) => {
			if(response) {
				return response.json();
			}
		})
		.then((data) => {
			console.log('From cache', data);
			if(!networkDataReceived) {
				let dataArray = [];

				for(let key in data) {
					dataArray.push(data[key]);
				}	

				updateUI(dataArray);
			}
		});
}
