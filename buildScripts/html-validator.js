const chalk = require('chalk');
const fs = require('fs'),

	html5Lint = require('html5-lint');

fs.readFile('./public/index.html', 'utf8', (err, html) => {
	if (err) {
		throw err;
	}

	html5Lint(html, (err, results) => {
		results.messages.forEach((msg) => {
			const type = msg.type, // error or warning
				message = msg.message;

			console.log(chalk.redBright('HTML5 Lint : ' + type) + '	' + (message)); // eslint-disable-line no-console

		});
	});
});
