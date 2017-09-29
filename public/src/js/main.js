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

const createContact = () => {
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
	personName.textContent = 'Emlen Lafuente';
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

	spanDataArray[0].textContent = 'elafuente1@scribd.com:';
	spanDataArray[1].textContent = '1184 Dunning Street:';
	spanDataArray[2].textContent = '1EuupijjV7GStvHA8Ee6dLhEo4zbpWNUfh:';

	const seperatingDivForImage = document.createElement('div');
	seperatingDivForImage.className = 'pwa-card-other-data-wrapper';
	personOtherData.appendChild(seperatingDivForImage);

	const personOtherDataImage = document.createElement('img');
	personOtherDataImage.setAttribute('src', '../src/images/brooke-lark-229136.jpg');
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


fetch('https://httpbin.org/ip')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		createContact();
	})