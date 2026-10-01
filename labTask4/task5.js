var readline = require('readline');

function applyMathMethod(method, values) {
	if (values.length === 0) {
		return 0;
	}

	var results = values.map(method);
	return values.length === 1 ? results[0] : results;
}

function abs() {
	return applyMathMethod(Math.abs, Array.prototype.slice.call(arguments));
}

function ceil() {
	return applyMathMethod(Math.ceil, Array.prototype.slice.call(arguments));
}

function floor() {
	return applyMathMethod(Math.floor, Array.prototype.slice.call(arguments));
}

var input = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

input.question('Enter zero or more numbers, separated by commas or spaces: ', function (value) {
	var trimmedValue = value.trim();
	var numbers = trimmedValue === ''
		? []
		: trimmedValue.split(/[\s,]+/).map(Number);

	if (numbers.some(function (number) { return Number.isNaN(number); })) {
		console.log('Please enter valid numbers only.');
	} else {
		console.log('abs:', abs.apply(null, numbers));
		console.log('ceil:', ceil.apply(null, numbers));
		console.log('floor:', floor.apply(null, numbers));
	}

	input.close();
});
