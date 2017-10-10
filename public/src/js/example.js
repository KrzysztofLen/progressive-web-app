function helloWorld(element) {
	console.log(element);
	const li = document.querySelector('li');
	element.addEventListener('click', () => {
		element.firstChild.className = 'active';
	})
	return 'Hello world!';
}

export default helloWorld;

