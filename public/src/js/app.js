if(!window.Promise) {
    window.Promise = Promise;
}

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then( () => {
            console.log("Service worker registered!");
        })
        .catch((err) => {
            console.log(err);
        });
}


// fetch('https://httpbin.org/post', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     mode: 'cors',
//     body: JSON.stringify({message: 'Does this work?'})
// })
// 	.then((response) => {
// 		console.log(response);
// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});
