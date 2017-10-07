const app = {
	isLoading: true,
	visibleCards: {},
	selectedCities: [],
	spinner: document.querySelector('.loader'),
	cardTemplate: document.querySelector('.cardTemplate'),
	container: document.querySelector('.main'),
	addDialog: document.querySelector('.dialog-container'),
	daysOfWeek: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]
};

document.getElementById('butAdd').addEventListener('click', () => {
	app.toggleAddDialog(true);
});

document.getElementById('butAddCancel').addEventListener('click', () => {
	app.toggleAddDialog(false);
});

document.getElementById('butRefresh').addEventListener('click', () => {
	app.updateForecasts();
});

document.getElementById('butAddCity').addEventListener('click', () => {
	const select = document.getElementById('selectCityToAdd');
	const selected = select.options[select.selectedIndex];
	const key = selected.value;
	const label = selected.textContent;

	if(!app.selectedCities) {
		app.selectedCities = [];
	}

	app.getForecast(key, label);
	app.selectedCities.push({
		key: key,
		label: label
	});
	app.saveSelectedCities();
	app.toggleAddDialog(false);
});

app.toggleAddDialog = (visible) => {
	if(visible) {
		app.addDialog.classList.add('dialog-container--visible');
	} else {
		app.addDialog.classList.remove('dialog-container--visible');
	}
};

app.getForecast = (key, label) => {
	const statment = 'select * from weather.forecast where woeid=' + key;
	const url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + statment;

	fetch(url)
		.then((response) => {
			if(response.status !== 200) {
				console.log('Looks like there was a problem. Status code: ' + response.status);
				return;
			}

			response.json()
				.then((data) => {
					const results = data.query.results;
					results.key = key;
					results.label = label;
					results.created = data.query.created;

					app.updateForecastCard(results);
				})
		})
		.catch((err) => {
		console.log('Fetch Error :-S', err);
	});
};

app.updateForecasts = () => {
	const keys = Object.keys(app.visibleCards);
	keys.forEach((key) => {
		app.getForecast(key);
	});
};

app.updateForecastCard = (results) => {
	console.log(results);

	const dataLastUpdated = new Date(results.created);
	const sunrise = results.channel.astronomy.sunrise;
	const sunset = results.channel.astronomy.sunset;
	const current = results.channel.item.condition;
	const humidity = results.channel.atmosphere.humidity;
	const wind = results.channel.wind;

	let card = app.visibleCards[results.key];

	if(!card) {
		card = app.cardTemplate.cloneNode(true);
		card.classList.remove('cardTemplate');
		card.querySelector('.location').textContent = results.label;
		card.removeAttribute('hidden');
		app.container.appendChild(card);
		app.visibleCards[results.key] = card;
	}

	const cardLastUpdatedElem = card.querySelector('.card-last-updated');
	let cardLastUpdated = cardLastUpdatedElem.textContent;

	if(cardLastUpdated) {
		cardLastUpdated = new Date(cardLastUpdated);

		if(dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
			return;
		}
	}

	cardLastUpdatedElem.textContent = results.created;

	card.querySelector('.description').textContent = current.text;
	card.querySelector('.date').textContent = current.date;
	card.querySelector('.current .icon').classList.add(app.getIconClass(current.code));
	card.querySelector('.current .temperature .value').textContent = Math.round(current.temp);
	card.querySelector('.current .sunrise').textContent = sunrise;
	card.querySelector('.current .sunset').textContent = sunset;
	card.querySelector('.current .humidity').textContent = Math.round(humidity) + '%';
	card.querySelector('.current .wind .value').textContent = Math.round(wind.speed);
	card.querySelector('.current .wind .direction').textContent = wind.direction;

	const nextDays = card.querySelectorAll('.future .oneday');
	let today = new Date();
	today = today.getDate();

	for(let i = 0; i < 7; i++) {
		const nextDay = nextDays[i];
		const daily = results.channel.item.forecast[i];

		if(daily && nextDay) {
			nextDay.querySelector('.date').textContent = app.daysOfWeek[(i + today) % 7];
			nextDay.querySelector('.icon').classList.add(app.getIconClass(daily.code));
			nextDay.querySelector('.temp-high .value').textContent = Math.round(daily.high);
			nextDay.querySelector('.temp-low .value').textContent = Math.round(daily.low);
		}
	}

	if(app.isLoading) {
		app.spinner.setAttribute('hidden', true);
		app.container.removeAttribute('hidden');
		app.isLoading = false;
	}
};

app.saveSelectedCities = () => {
	const selectedCities = JSON.stringify(app.selectedCities);
	localStorage.selectedCities = selectedCities;
};

app.getIconClass = (weatherCode) => {
	weatherCode = parseInt(weatherCode);
	switch(weatherCode) {
		case 25: // cold
		case 32: // sunny
		case 33: // fair (night)
		case 34: // fair (day)
		case 36: // hot
		case 3200: // not available
			return 'clear-day';
		case 0: // tornado
		case 1: // tropical storm
		case 2: // hurricane
		case 6: // mixed rain and sleet
		case 8: // freezing drizzle
		case 9: // drizzle
		case 10: // freezing rain
		case 11: // showers
		case 12: // showers
		case 17: // hail
		case 35: // mixed rain and hail
		case 40: // scattered showers
			return 'rain';
		case 3: // severe thunderstorms
		case 4: // thunderstorms
		case 37: // isolated thunderstorms
		case 38: // scattered thunderstorms
		case 39: // scattered thunderstorms (not a typo)
		case 45: // thundershowers
		case 47: // isolated thundershowers
			return 'thunderstorms';
		case 5: // mixed rain and snow
		case 7: // mixed snow and sleet
		case 13: // snow flurries
		case 14: // light snow showers
		case 16: // snow
		case 18: // sleet
		case 41: // heavy snow
		case 42: // scattered snow showers
		case 43: // heavy snow
		case 46: // snow showers
			return 'snow';
		case 15: // blowing snow
		case 19: // dust
		case 20: // foggy
		case 21: // haze
		case 22: // smoky
			return 'fog';
		case 24: // windy
		case 23: // blustery
			return 'windy';
		case 26: // cloudy
		case 27: // mostly cloudy (night)
		case 28: // mostly cloudy (day)
		case 31: // clear (night)
			return 'cloudy';
		case 29: // partly cloudy (night)
		case 30: // partly cloudy (day)
		case 44: // partly cloudy
			return 'partly-cloudy-day';
	}
};

app.selectedCities = localStorage.selectedCities;
if(app.selectedCities) {
	app.selectedCities = JSON.parse(app.selectedCities);
	app.selectedCities.forEach((city) => {
		app.getForecast(city.key, city.label);
	});
} else {
	console.log('[Fake city]');
}
