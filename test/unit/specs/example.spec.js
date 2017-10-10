/* global chai */

import helloWorld from '../../../public/src/js/example';

const expect = chai.expect;

describe('helloWorld', () => {
	it('is a function', () => {
		// console.log(helloWorld);
		expect(helloWorld).to.be.a('function');
	});

	it('return "Hello world"', () => {
		const result = helloWorld();
		expect(result).to.equal('Hello world!');
	});
});

describe('fixture test', () => {
	before(() => {
		fixture.setBase('specs/support/fixtures');
	});

	afterEach(() => {
		fixture.cleanup();
	});

	it('should pass', () => {
		fixture.load('example.html');

		const selector = document.querySelectorAll('li');
		expect(selector.length).to.equal(5);
	});

	it('should add active class', () => {
		fixture.load('example.html');
		const selector = document.querySelectorAll('li');
		const result = helloWorld(selector);
		console.log(result);
		expect(selector.firstChild).to.equal('<li class="active"></li>');
	});
});
