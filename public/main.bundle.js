!function(Q){function t(n){if(F[n])return F[n].exports;var c=F[n]={i:n,l:!1,exports:{}};return Q[n].call(c.exports,c,c.exports,t),c.l=!0,c.exports}var F={};t.m=Q,t.c=F,t.d=function(Q,F,n){t.o(Q,F)||Object.defineProperty(Q,F,{configurable:!1,enumerable:!0,get:n})},t.n=function(Q){var F=Q&&Q.__esModule?function(){return Q.default}:function(){return Q};return t.d(F,"a",F),F},t.o=function(Q,t){return Object.prototype.hasOwnProperty.call(Q,t)},t.p="",t(t.s=0)}([function(Q,t,F){Q.exports=F(1)},function(module,exports,__webpack_require__){"use strict";eval("\n\n__webpack_require__(2);\n\n__webpack_require__(3);\n\n__webpack_require__(4);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvc3JjL2luZGV4LmpzPzNlYzMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQSIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2pzL21haW4uanMnO1xyXG5pbXBvcnQgJy4vanMvYXBwLmpzJztcclxuaW1wb3J0ICcuL2Nzcy9hcHAuY3NzJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n")},function(module,exports,__webpack_require__){"use strict";eval("\n\nvar shareImageButton = document.querySelector('#share-image-button'),\n    createPostArea = document.querySelector('#create-post'),\n    closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn'),\n    pwaContactsList = document.querySelector('#pwa-contacts-list'),\n    form = document.querySelector('form'),\n    name = document.querySelector('#name'),\n    email = document.querySelector('#email'),\n    adress = document.querySelector('#adress'),\n    bitcoin = document.querySelector('#bitcoin');\n\nvar defferedPrompt = '';\n\nvar openCreatePostModal = function openCreatePostModal() {\n\tcreatePostArea.style.transform = 'translateY(0)';\n\n\tif (defferedPrompt) {\n\t\tdefferedPrompt.prompt();\n\n\t\tdefferedPrompt.userChoice.then(function (choiceResult) {\n\t\t\tconsole.log(choiceResult.outcome); // eslint-disable-line no-console\n\n\t\t\tif (choiceResult.outcome === 'dismissed') {\n\t\t\t\tconsole.log('User cancelled installation'); // eslint-disable-line no-console\n\t\t\t} else {\n\t\t\t\tconsole.log('User added to home screen'); // eslint-disable-line no-console\n\t\t\t}\n\t\t});\n\n\t\tdefferedPrompt = null;\n\t}\n\n\tshareImageButton.style.display = 'none';\n};\n\nwindow.addEventListener('beforeinstallprompt', function (event) {\n\tconsole.log('beforeinstallprompt fired'); // eslint-disable-line no-console\n\tevent.preventDefault();\n\tdefferedPrompt = event;\n\treturn false;\n});\n\nvar closeCreatePostModal = function closeCreatePostModal() {\n\tcreatePostArea.style.transform = 'translateY(100vh)';\n\tshareImageButton.style.display = 'block';\n};\n\nvar clearContact = function clearContact() {\n\twhile (pwaContactsList.hasChildNodes()) {\n\t\tpwaContactsList.removeChild(pwaContactsList.lastChild);\n\t}\n};\n\nvar createContact = function createContact(data) {\n\n\tvar cardWrapper = document.createElement('div');\n\tcardWrapper.className = 'demo-card-square mdl-card mdl-shadow--2dp';\n\n\tvar cardPersonName = document.createElement('div');\n\tcardPersonName.className = 'mdl-card__title mdl-card--expand';\n\tcardWrapper.appendChild(cardPersonName);\n\n\tvar personDataWrapper = document.createElement('span');\n\tpersonDataWrapper.className = 'mdl-list__item-primary-content';\n\tcardPersonName.appendChild(personDataWrapper);\n\n\tvar personIcon = document.createElement('i');\n\tpersonIcon.className = 'material-icons mdl-list__item-avatar';\n\tpersonIcon.textContent = 'person';\n\tpersonDataWrapper.appendChild(personIcon);\n\n\tvar personName = document.createElement('h4');\n\tpersonName.className = 'pwa-card-name__name-header';\n\tpersonName.textContent = data.name;\n\tpersonDataWrapper.appendChild(personName);\n\n\tvar personOtherData = document.createElement('div');\n\tpersonOtherData.className = 'mdl-card__supporting-text';\n\tcardWrapper.appendChild(personOtherData);\n\n\tvar spanLabelArray = [];\n\tvar spanDataArray = [];\n\n\tfor (var index = 0; index < 3; index++) {\n\t\tvar seperatingDiv = document.createElement('div');\n\t\tseperatingDiv.className = 'pwa-card-other-data-wrapper';\n\t\tpersonOtherData.appendChild(seperatingDiv);\n\n\t\tvar personOtherDataCardLabel = document.createElement('span');\n\t\tpersonOtherDataCardLabel.className = 'pwa-card-label';\n\t\tseperatingDiv.appendChild(personOtherDataCardLabel);\n\n\t\tvar personOtherDataCardData = document.createElement('span');\n\t\tpersonOtherDataCardData.className = 'mdl-list__item-sub-title';\n\t\tseperatingDiv.appendChild(personOtherDataCardData);\n\n\t\tspanDataArray.push(personOtherDataCardData);\n\t\tspanLabelArray.push(personOtherDataCardLabel);\n\t}\n\n\tspanLabelArray[1].textContent = 'adress: ';\n\tspanLabelArray[2].textContent = 'bitcoin: ';\n\tspanLabelArray[0].textContent = 'email: ';\n\n\tspanDataArray[0].textContent = data.email;\n\tspanDataArray[1].textContent = data.adress;\n\tspanDataArray[2].textContent = data.bitcoin;\n\n\tvar seperatingDivForImage = document.createElement('div');\n\tseperatingDivForImage.className = 'pwa-card-other-data-wrapper';\n\tpersonOtherData.appendChild(seperatingDivForImage);\n\n\tvar personOtherDataImage = document.createElement('img');\n\tpersonOtherDataImage.setAttribute('src', data.image);\n\tpersonOtherDataImage.setAttribute('alt', 'xyz');\n\tseperatingDivForImage.appendChild(personOtherDataImage);\n\n\tvar personDataOtherButtonWrapper = document.createElement('div');\n\tpersonDataOtherButtonWrapper.className = 'mdl-card__actions mdl-card--border';\n\tcardWrapper.appendChild(personDataOtherButtonWrapper);\n\n\tvar personDataOtherButton = document.createElement('button');\n\tpersonDataOtherButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored';\n\tpersonDataOtherButton.textContent = 'View';\n\tpersonDataOtherButtonWrapper.appendChild(personDataOtherButton);\n\n\tpwaContactsList.appendChild(cardWrapper);\n};\n\nshareImageButton.addEventListener('click', openCreatePostModal);\n\ncloseCreatePostModalButton.addEventListener('click', closeCreatePostModal);\n\nvar updateUI = function updateUI(data) {\n\tclearContact();\n\tfor (var index = 0; index < data.length; index++) {\n\t\tcreateContact(data[index]);\n\t}\n};\n\nvar url = 'https://pwa-app-72fbb.firebaseio.com/contacts.json';\nvar networkDataReceived = false;\n\nfetch(url).then(function (res) {\n\treturn res.json();\n}).then(function (data) {\n\tnetworkDataReceived = true;\n\tconsole.log('From web', data); // eslint-disable-line no-console\n\n\tvar dataArray = [];\n\n\tfor (var key in data) {\n\t\tdataArray.push(data[key]);\n\t}\n\n\tupdateUI(dataArray);\n});\n\nif ('indexedDB' in window) {\n\tgetAllData('contacts') // eslint-disable-line no-undef\n\t.then(function (data) {\n\t\tif (!networkDataReceived) {\n\t\t\tconsole.log('From cache', data); // eslint-disable-line no-console\n\t\t\tupdateUI(data);\n\t\t}\n\t});\n}\n\n// Send data imidiatly to backend\nvar sendData = function sendData() {\n\tfetch('https://us-central1-pwa-app-72fbb.cloudfunctions.net/storeContactsData', {\n\t\tmethod: 'POST',\n\t\theaders: {\n\t\t\t'Content-Type': 'application/json',\n\t\t\t'Accept': 'application/json'\n\t\t},\n\t\tbody: JSON.stringify({\n\t\t\tid: new Date().toISOString(),\n\t\t\tname: name.value,\n\t\t\temail: email.value,\n\t\t\tadress: adress.value,\n\t\t\tbitcoin: bitcoin.value,\n\t\t\timage: 'https://firebasestorage.googleapis.com/v0/b/pwa-app-72fbb.appspot.com/o/brooke-lark-229136.jpg?alt=media&token=922238cc-7795-4316-ab1e-b32864c39f54'\n\t\t})\n\t}).then(function (res) {\n\t\tconsole.log('Sent data', res); // eslint-disable-line no-console\n\t\tupdateUI();\n\t});\n};\n\nform.addEventListener('submit', function (event) {\n\tevent.preventDefault();\n\tif (name.value.trim() === '' || email.value.trim() === '' || adress.value.trim() === '' || bitcoin.value.trim() === '') {\n\t\talert('Please enter valid data!');\n\t\treturn;\n\t}\n\n\tcloseCreatePostModal();\n\n\tif ('serviceWorker' in navigator && 'SyncManager' in window) {\n\t\tnavigator.serviceWorker.ready.then(function (sw) {\n\n\t\t\tvar contact = {\n\t\t\t\tid: new Date().toISOString(),\n\t\t\t\tname: name.value,\n\t\t\t\temail: email.value,\n\t\t\t\tadress: adress.value,\n\t\t\t\tbitcoin: bitcoin.value\n\t\t\t};\n\n\t\t\tsetAllData('sync-contacts', contact) // eslint-disable-line no-undef\n\t\t\t.then(function () {\n\t\t\t\treturn sw.sync.register('sync-new-contact');\n\t\t\t})\n\t\t\t// showing material message\n\t\t\t.then(function () {\n\t\t\t\tvar snackbarContainer = document.querySelector('#confirmation-toast');\n\t\t\t\tvar data = { message: 'Your Post was saved for syncing!' };\n\t\t\t\tsnackbarContainer.MaterialSnackbar.showSnackbar(data);\n\t\t\t}).catch(function (err) {\n\t\t\t\tconsole.log(err); // eslint-disable-line no-console\n\t\t\t});\n\t\t});\n\t} else {\n\t\tsendData();\n\t}\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvc3JjL2pzL21haW4uanM/ZGViYyJdLCJuYW1lcyI6WyJzaGFyZUltYWdlQnV0dG9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlUG9zdEFyZWEiLCJjbG9zZUNyZWF0ZVBvc3RNb2RhbEJ1dHRvbiIsInB3YUNvbnRhY3RzTGlzdCIsImZvcm0iLCJuYW1lIiwiZW1haWwiLCJhZHJlc3MiLCJiaXRjb2luIiwiZGVmZmVyZWRQcm9tcHQiLCJvcGVuQ3JlYXRlUG9zdE1vZGFsIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJwcm9tcHQiLCJ1c2VyQ2hvaWNlIiwidGhlbiIsImNob2ljZVJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJvdXRjb21lIiwiZGlzcGxheSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY2xvc2VDcmVhdGVQb3N0TW9kYWwiLCJjbGVhckNvbnRhY3QiLCJoYXNDaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJjcmVhdGVDb250YWN0IiwiZGF0YSIsImNhcmRXcmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImNhcmRQZXJzb25OYW1lIiwiYXBwZW5kQ2hpbGQiLCJwZXJzb25EYXRhV3JhcHBlciIsInBlcnNvbkljb24iLCJ0ZXh0Q29udGVudCIsInBlcnNvbk5hbWUiLCJwZXJzb25PdGhlckRhdGEiLCJzcGFuTGFiZWxBcnJheSIsInNwYW5EYXRhQXJyYXkiLCJpbmRleCIsInNlcGVyYXRpbmdEaXYiLCJwZXJzb25PdGhlckRhdGFDYXJkTGFiZWwiLCJwZXJzb25PdGhlckRhdGFDYXJkRGF0YSIsInB1c2giLCJzZXBlcmF0aW5nRGl2Rm9ySW1hZ2UiLCJwZXJzb25PdGhlckRhdGFJbWFnZSIsInNldEF0dHJpYnV0ZSIsImltYWdlIiwicGVyc29uRGF0YU90aGVyQnV0dG9uV3JhcHBlciIsInBlcnNvbkRhdGFPdGhlckJ1dHRvbiIsInVwZGF0ZVVJIiwibGVuZ3RoIiwidXJsIiwibmV0d29ya0RhdGFSZWNlaXZlZCIsImZldGNoIiwicmVzIiwianNvbiIsImRhdGFBcnJheSIsImtleSIsImdldEFsbERhdGEiLCJzZW5kRGF0YSIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImlkIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidmFsdWUiLCJ0cmltIiwiYWxlcnQiLCJuYXZpZ2F0b3IiLCJzZXJ2aWNlV29ya2VyIiwicmVhZHkiLCJzdyIsImNvbnRhY3QiLCJzZXRBbGxEYXRhIiwic3luYyIsInJlZ2lzdGVyIiwic25hY2tiYXJDb250YWluZXIiLCJtZXNzYWdlIiwiTWF0ZXJpYWxTbmFja2JhciIsInNob3dTbmFja2JhciIsImNhdGNoIiwiZXJyIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLG1CQUFtQkMsU0FBU0MsYUFBVCxDQUF1QixxQkFBdkIsQ0FBekI7QUFBQSxJQUNDQyxpQkFBaUJGLFNBQVNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FEbEI7QUFBQSxJQUVDRSw2QkFBNkJILFNBQVNDLGFBQVQsQ0FBdUIsOEJBQXZCLENBRjlCO0FBQUEsSUFHQ0csa0JBQWtCSixTQUFTQyxhQUFULENBQXVCLG9CQUF2QixDQUhuQjtBQUFBLElBSUNJLE9BQU9MLFNBQVNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FKUjtBQUFBLElBS0NLLE9BQU9OLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FMUjtBQUFBLElBTUNNLFFBQVFQLFNBQVNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FOVDtBQUFBLElBT0NPLFNBQVNSLFNBQVNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FQVjtBQUFBLElBUUNRLFVBQVVULFNBQVNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FSWDs7QUFVQSxJQUFJUyxpQkFBaUIsRUFBckI7O0FBRUEsSUFBTUMsc0JBQXNCLFNBQXRCQSxtQkFBc0IsR0FBTTtBQUNqQ1QsZ0JBQWVVLEtBQWYsQ0FB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dCI6WyJjb25zdCBzaGFyZUltYWdlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NoYXJlLWltYWdlLWJ1dHRvbicpLFxuXHRjcmVhdGVQb3N0QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcmVhdGUtcG9zdCcpLFxuXHRjbG9zZUNyZWF0ZVBvc3RNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1jcmVhdGUtcG9zdC1tb2RhbC1idG4nKSxcblx0cHdhQ29udGFjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3B3YS1jb250YWN0cy1saXN0JyksXG5cdGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyksXG5cdG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZScpLFxuXHRlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpLFxuXHRhZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRyZXNzJyksXG5cdGJpdGNvaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYml0Y29pbicpO1xuXG5sZXQgZGVmZmVyZWRQcm9tcHQgPSAnJztcblxuY29uc3Qgb3BlbkNyZWF0ZVBvc3RNb2RhbCA9ICgpID0+IHtcblx0Y3JlYXRlUG9zdEFyZWEuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoMCknO1xuXG5cdGlmIChkZWZmZXJlZFByb21wdCkge1xuXHRcdGRlZmZlcmVkUHJvbXB0LnByb21wdCgpO1xuXG5cdFx0ZGVmZmVyZWRQcm9tcHQudXNlckNob2ljZVxuXHRcdFx0LnRoZW4oKGNob2ljZVJlc3VsdCkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhjaG9pY2VSZXN1bHQub3V0Y29tZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG5cdFx0XHRcdGlmIChjaG9pY2VSZXN1bHQub3V0Y29tZSA9PT0gJ2Rpc21pc3NlZCcpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnVXNlciBjYW5jZWxsZWQgaW5zdGFsbGF0aW9uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdVc2VyIGFkZGVkIHRvIGhvbWUgc2NyZWVuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdGRlZmZlcmVkUHJvbXB0ID0gbnVsbDtcblx0fVxuXG5cdHNoYXJlSW1hZ2VCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVpbnN0YWxscHJvbXB0JywgKGV2ZW50KSA9PiB7XG5cdGNvbnNvbGUubG9nKCdiZWZvcmVpbnN0YWxscHJvbXB0IGZpcmVkJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRkZWZmZXJlZFByb21wdCA9IGV2ZW50O1xuXHRyZXR1cm4gZmFsc2U7XG59KTtcblxuY29uc3QgY2xvc2VDcmVhdGVQb3N0TW9kYWwgPSAoKSA9PiB7XG5cdGNyZWF0ZVBvc3RBcmVhLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDEwMHZoKSc7XG5cdHNoYXJlSW1hZ2VCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59O1xuXG5jb25zdCBjbGVhckNvbnRhY3QgPSAoKSA9PiB7XG5cdHdoaWxlIChwd2FDb250YWN0c0xpc3QuaGFzQ2hpbGROb2RlcygpKSB7XG5cdFx0cHdhQ29udGFjdHNMaXN0LnJlbW92ZUNoaWxkKHB3YUNvbnRhY3RzTGlzdC5sYXN0Q2hpbGQpO1xuXHR9XG59O1xuXG5jb25zdCBjcmVhdGVDb250YWN0ID0gKGRhdGEpID0+IHtcblxuXHRjb25zdCBjYXJkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjYXJkV3JhcHBlci5jbGFzc05hbWUgPSAnZGVtby1jYXJkLXNxdWFyZSBtZGwtY2FyZCBtZGwtc2hhZG93LS0yZHAnO1xuXG5cdGNvbnN0IGNhcmRQZXJzb25OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNhcmRQZXJzb25OYW1lLmNsYXNzTmFtZSA9ICdtZGwtY2FyZF9fdGl0bGUgbWRsLWNhcmQtLWV4cGFuZCc7XG5cdGNhcmRXcmFwcGVyLmFwcGVuZENoaWxkKGNhcmRQZXJzb25OYW1lKTtcblxuXHRjb25zdCBwZXJzb25EYXRhV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0cGVyc29uRGF0YVdyYXBwZXIuY2xhc3NOYW1lID0gJ21kbC1saXN0X19pdGVtLXByaW1hcnktY29udGVudCc7XG5cdGNhcmRQZXJzb25OYW1lLmFwcGVuZENoaWxkKHBlcnNvbkRhdGFXcmFwcGVyKTtcblxuXHRjb25zdCBwZXJzb25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXHRwZXJzb25JY29uLmNsYXNzTmFtZSA9ICdtYXRlcmlhbC1pY29ucyBtZGwtbGlzdF9faXRlbS1hdmF0YXInO1xuXHRwZXJzb25JY29uLnRleHRDb250ZW50ID0gICdwZXJzb24nO1xuXHRwZXJzb25EYXRhV3JhcHBlci5hcHBlbmRDaGlsZChwZXJzb25JY29uKTtcblxuXHRjb25zdCBwZXJzb25OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcblx0cGVyc29uTmFtZS5jbGFzc05hbWUgPSAncHdhLWNhcmQtbmFtZV9fbmFtZS1oZWFkZXInO1xuXHRwZXJzb25OYW1lLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuXHRwZXJzb25EYXRhV3JhcHBlci5hcHBlbmRDaGlsZChwZXJzb25OYW1lKTtcblxuXHRjb25zdCBwZXJzb25PdGhlckRhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0cGVyc29uT3RoZXJEYXRhLmNsYXNzTmFtZSA9ICdtZGwtY2FyZF9fc3VwcG9ydGluZy10ZXh0Jztcblx0Y2FyZFdyYXBwZXIuYXBwZW5kQ2hpbGQocGVyc29uT3RoZXJEYXRhKTtcblxuXHRjb25zdCBzcGFuTGFiZWxBcnJheSA9IFtdO1xuXHRjb25zdCBzcGFuRGF0YUFycmF5ID0gW107XG5cblx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDM7IGluZGV4KyspIHtcblx0XHRjb25zdCBzZXBlcmF0aW5nRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0c2VwZXJhdGluZ0Rpdi5jbGFzc05hbWUgPSAncHdhLWNhcmQtb3RoZXItZGF0YS13cmFwcGVyJztcblx0XHRwZXJzb25PdGhlckRhdGEuYXBwZW5kQ2hpbGQoc2VwZXJhdGluZ0Rpdik7XG5cblx0XHRjb25zdCBwZXJzb25PdGhlckRhdGFDYXJkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0cGVyc29uT3RoZXJEYXRhQ2FyZExhYmVsLmNsYXNzTmFtZSA9ICdwd2EtY2FyZC1sYWJlbCc7XG5cdFx0c2VwZXJhdGluZ0Rpdi5hcHBlbmRDaGlsZChwZXJzb25PdGhlckRhdGFDYXJkTGFiZWwpO1xuXG5cdFx0Y29uc3QgcGVyc29uT3RoZXJEYXRhQ2FyZERhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0cGVyc29uT3RoZXJEYXRhQ2FyZERhdGEuY2xhc3NOYW1lID0gJ21kbC1saXN0X19pdGVtLXN1Yi10aXRsZSc7XG5cdFx0c2VwZXJhdGluZ0Rpdi5hcHBlbmRDaGlsZChwZXJzb25PdGhlckRhdGFDYXJkRGF0YSk7XG5cblx0XHRzcGFuRGF0YUFycmF5LnB1c2gocGVyc29uT3RoZXJEYXRhQ2FyZERhdGEpO1xuXHRcdHNwYW5MYWJlbEFycmF5LnB1c2gocGVyc29uT3RoZXJEYXRhQ2FyZExhYmVsKTtcblx0fVxuXG5cdHNwYW5MYWJlbEFycmF5WyAxIF0udGV4dENvbnRlbnQgPSAnYWRyZXNzOiAnO1xuXHRzcGFuTGFiZWxBcnJheVsgMiBdLnRleHRDb250ZW50ID0gJ2JpdGNvaW46ICc7XG5cdHNwYW5MYWJlbEFycmF5WyAwIF0udGV4dENvbnRlbnQgPSAnZW1haWw6ICc7XG5cblx0c3BhbkRhdGFBcnJheVsgMCBdLnRleHRDb250ZW50ID0gXHRkYXRhLmVtYWlsO1xuXHRzcGFuRGF0YUFycmF5WyAxIF0udGV4dENvbnRlbnQgPSBcdGRhdGEuYWRyZXNzO1xuXHRzcGFuRGF0YUFycmF5WyAyIF0udGV4dENvbnRlbnQgPSBcdGRhdGEuYml0Y29pbjtcblxuXHRjb25zdCBzZXBlcmF0aW5nRGl2Rm9ySW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0c2VwZXJhdGluZ0RpdkZvckltYWdlLmNsYXNzTmFtZSA9ICdwd2EtY2FyZC1vdGhlci1kYXRhLXdyYXBwZXInO1xuXHRwZXJzb25PdGhlckRhdGEuYXBwZW5kQ2hpbGQoc2VwZXJhdGluZ0RpdkZvckltYWdlKTtcblxuXHRjb25zdCBwZXJzb25PdGhlckRhdGFJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRwZXJzb25PdGhlckRhdGFJbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGRhdGEuaW1hZ2UpO1xuXHRwZXJzb25PdGhlckRhdGFJbWFnZS5zZXRBdHRyaWJ1dGUoJ2FsdCcsICd4eXonKTtcblx0c2VwZXJhdGluZ0RpdkZvckltYWdlLmFwcGVuZENoaWxkKHBlcnNvbk90aGVyRGF0YUltYWdlKTtcblxuXHRjb25zdCBwZXJzb25EYXRhT3RoZXJCdXR0b25XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHBlcnNvbkRhdGFPdGhlckJ1dHRvbldyYXBwZXIuY2xhc3NOYW1lID0gJ21kbC1jYXJkX19hY3Rpb25zIG1kbC1jYXJkLS1ib3JkZXInO1xuXHRjYXJkV3JhcHBlci5hcHBlbmRDaGlsZChwZXJzb25EYXRhT3RoZXJCdXR0b25XcmFwcGVyKTtcblxuXHRjb25zdCBwZXJzb25EYXRhT3RoZXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0cGVyc29uRGF0YU90aGVyQnV0dG9uLmNsYXNzTmFtZSA9ICdtZGwtYnV0dG9uIG1kbC1qcy1idXR0b24gbWRsLWJ1dHRvbi0tcmFpc2VkIG1kbC1idXR0b24tLWNvbG9yZWQnO1xuXHRwZXJzb25EYXRhT3RoZXJCdXR0b24udGV4dENvbnRlbnQgPSAnVmlldyc7XG5cdHBlcnNvbkRhdGFPdGhlckJ1dHRvbldyYXBwZXIuYXBwZW5kQ2hpbGQocGVyc29uRGF0YU90aGVyQnV0dG9uKTtcblxuXHRwd2FDb250YWN0c0xpc3QuYXBwZW5kQ2hpbGQoY2FyZFdyYXBwZXIpO1xuXG59O1xuXG5zaGFyZUltYWdlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbkNyZWF0ZVBvc3RNb2RhbCk7XG5cbmNsb3NlQ3JlYXRlUG9zdE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VDcmVhdGVQb3N0TW9kYWwpO1xuXG5jb25zdCB1cGRhdGVVSSA9IChkYXRhKSA9PiB7XG5cdGNsZWFyQ29udGFjdCgpO1xuXHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRjcmVhdGVDb250YWN0KGRhdGFbIGluZGV4IF0pO1xuXHR9XG59O1xuXG5jb25zdCB1cmwgPSAnaHR0cHM6Ly9wd2EtYXBwLTcyZmJiLmZpcmViYXNlaW8uY29tL2NvbnRhY3RzLmpzb24nO1xubGV0IG5ldHdvcmtEYXRhUmVjZWl2ZWQgPSBmYWxzZTtcblxuZmV0Y2godXJsKVxuXHQudGhlbigocmVzKSA9PiB7XG5cdFx0cmV0dXJuIHJlcy5qc29uKCk7XG5cdH0pXG5cdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0bmV0d29ya0RhdGFSZWNlaXZlZCA9IHRydWU7XG5cdFx0Y29uc29sZS5sb2coJ0Zyb20gd2ViJywgZGF0YSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG5cdFx0Y29uc3QgZGF0YUFycmF5ID0gW107XG5cblx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG5cdFx0XHRkYXRhQXJyYXkucHVzaChkYXRhWyBrZXkgXSk7XG5cdFx0fVxuXG5cdFx0dXBkYXRlVUkoZGF0YUFycmF5KTtcblx0fSk7XG5cbmlmICgnaW5kZXhlZERCJyBpbiB3aW5kb3cpIHtcblx0Z2V0QWxsRGF0YSgnY29udGFjdHMnKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdGlmICghbmV0d29ya0RhdGFSZWNlaXZlZCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnRnJvbSBjYWNoZScsIGRhdGEpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHRcdFx0dXBkYXRlVUkoZGF0YSk7XG5cdFx0XHR9XG5cdFx0fSk7XG59XG5cbi8vIFNlbmQgZGF0YSBpbWlkaWF0bHkgdG8gYmFja2VuZFxuY29uc3Qgc2VuZERhdGEgPSAoKSA9PiB7XG5cdGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLXB3YS1hcHAtNzJmYmIuY2xvdWRmdW5jdGlvbnMubmV0L3N0b3JlQ29udGFjdHNEYXRhJywge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHQnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0fSxcblx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRpZDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuXHRcdFx0bmFtZTpcdG5hbWUudmFsdWUsXG5cdFx0XHRlbWFpbDpcdGVtYWlsLnZhbHVlLFxuXHRcdFx0YWRyZXNzOlx0YWRyZXNzLnZhbHVlLFxuXHRcdFx0Yml0Y29pbjpcdGJpdGNvaW4udmFsdWUsXG5cdFx0XHRpbWFnZTogJ2h0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvcHdhLWFwcC03MmZiYi5hcHBzcG90LmNvbS9vL2Jyb29rZS1sYXJrLTIyOTEzNi5qcGc/YWx0PW1lZGlhJnRva2VuPTkyMjIzOGNjLTc3OTUtNDMxNi1hYjFlLWIzMjg2NGMzOWY1NCdcblx0XHR9KVxuXHR9KVxuXHRcdC50aGVuKChyZXMpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKCdTZW50IGRhdGEnLCByZXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHRcdHVwZGF0ZVVJKCk7XG5cdFx0fSk7XG59O1xuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRpZiAobmFtZS52YWx1ZS50cmltKCkgPT09ICcnIHx8IGVtYWlsLnZhbHVlLnRyaW0oKSA9PT0gJycgfHwgYWRyZXNzLnZhbHVlLnRyaW0oKSA9PT0gJycgfHwgYml0Y29pbi52YWx1ZS50cmltKCkgPT09ICcnKSB7XG5cdFx0YWxlcnQoJ1BsZWFzZSBlbnRlciB2YWxpZCBkYXRhIScpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNsb3NlQ3JlYXRlUG9zdE1vZGFsKCk7XG5cblx0aWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IgJiYgJ1N5bmNNYW5hZ2VyJyBpbiB3aW5kb3cpIHtcblx0XHRuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWFkeVxuXHRcdFx0LnRoZW4oKHN3KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgY29udGFjdCA9IHtcblx0XHRcdFx0XHRpZDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuXHRcdFx0XHRcdG5hbWU6XHRuYW1lLnZhbHVlLFxuXHRcdFx0XHRcdGVtYWlsOlx0ZW1haWwudmFsdWUsXG5cdFx0XHRcdFx0YWRyZXNzOlx0YWRyZXNzLnZhbHVlLFxuXHRcdFx0XHRcdGJpdGNvaW46XHRiaXRjb2luLnZhbHVlXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2V0QWxsRGF0YSgnc3luYy1jb250YWN0cycsIGNvbnRhY3QpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0XHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3cuc3luYy5yZWdpc3Rlcignc3luYy1uZXctY29udGFjdCcpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdC8vIHNob3dpbmcgbWF0ZXJpYWwgbWVzc2FnZVxuXHRcdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHNuYWNrYmFyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbmZpcm1hdGlvbi10b2FzdCcpO1xuXHRcdFx0XHRcdFx0Y29uc3QgZGF0YSA9IHtcdG1lc3NhZ2U6ICdZb3VyIFBvc3Qgd2FzIHNhdmVkIGZvciBzeW5jaW5nISdcdH07XG5cdFx0XHRcdFx0XHRzbmFja2JhckNvbnRhaW5lci5NYXRlcmlhbFNuYWNrYmFyLnNob3dTbmFja2JhcihkYXRhKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaCgoZXJyKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHNlbmREYXRhKCk7XG5cdH1cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL3NyYy9qcy9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///2\n")},function(module,exports,__webpack_require__){"use strict";eval("\n\nif (!window.Promise) {\n\twindow.Promise = Promise; // eslint-disable-line no-undef\n}\n\nif ('serviceWorker' in navigator) {\n\tnavigator.serviceWorker.register('/serviceWorker.js').then(function () {\n\t\tconsole.log('Service worker registered!'); // eslint-disable-line no-console\n\t}).catch(function (err) {\n\t\tconsole.log(err); // eslint-disable-line no-console\n\t});\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvc3JjL2pzL2FwcC5qcz85YWJkIl0sIm5hbWVzIjpbIndpbmRvdyIsIlByb21pc2UiLCJuYXZpZ2F0b3IiLCJzZXJ2aWNlV29ya2VyIiwicmVnaXN0ZXIiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksQ0FBQ0EsT0FBT0MsT0FBWixFQUFxQjtBQUNwQkQsUUFBT0MsT0FBUCxHQUFpQkEsT0FBakIsQ0FEb0IsQ0FDTTtBQUMxQjs7QUFFRCxJQUFJLG1CQUFtQkMsU0FBdkIsRUFBa0M7QUFDakNBLFdBQVVDLGFBQVYsQ0FBd0JDLFFBQXhCLENBQWlDLG1CQUFqQyxFQUNFQyxJQURGLENBQ1EsWUFBTTtBQUNaQyxVQUFRQyxHQUFSLENBQVksNEJBQVosRUFEWSxDQUMrQjtBQUMzQyxFQUhGLEVBSUVDLEtBSkYsQ0FJUSxVQUFDQyxHQUFELEVBQVM7QUFDZkgsVUFBUUMsR0FBUixDQUFZRSxHQUFaLEVBRGUsQ0FDRztBQUNsQixFQU5GO0FBT0EiLCJmaWxlIjoiMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmICghd2luZG93LlByb21pc2UpIHtcblx0d2luZG93LlByb21pc2UgPSBQcm9taXNlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG59XG5cbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG5cdG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc2VydmljZVdvcmtlci5qcycpXG5cdFx0LnRoZW4oICgpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKCdTZXJ2aWNlIHdvcmtlciByZWdpc3RlcmVkIScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9KVxuXHRcdC5jYXRjaCgoZXJyKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHR9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9zcmMvanMvYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///3\n")},function(module,exports,__webpack_require__){eval('// removed by extract-text-webpack-plugin\n    if(false) {\n      // 1507064890519\n      var cssReload = require("../../../node_modules/css-hot-loader/hotModuleReplacement.js")(module.id, {"fileMap":"{fileName}"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvc3JjL2Nzcy9hcHAuY3NzP2UwNWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0EsMEdBQTBHLFlBQVksU0FBUyxFQUFFO0FBQ2pJO0FBQ0E7QUFDQSIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTA3MDY0ODkwNTE5XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtaG90LWxvYWRlci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImZpbGVNYXBcIjpcIntmaWxlTmFtZX1cIn0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9zcmMvY3NzL2FwcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///4\n')}]);