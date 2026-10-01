var readline = require('readline');

function roundMe() {
	if (arguments.length === 0) {
		return 0;
	}

	var roundedValues = [];

	for (var index = 0; index < arguments.length; index++) {
		roundedValues.push(Math.round(arguments[index]));
	}

	return arguments.length === 1 ? roundedValues[0] : roundedValues;
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
		console.log(roundMe.apply(null, numbers));
	}

	input.close();
});
