var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
	createPostArea.style.display = 'block';
	shareImageButton.style.display = 'none';
}

function closeCreatePostModal() {
	createPostArea.style.display = 'none';
	shareImageButton.style.display = 'block';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);