var readline = require('readline');

function formatPhoneNumber(digits) {
	if (!Array.isArray(digits) || digits.length !== 10) {
		throw new Error('The input must be an array of 10 integers.');
	}

	for (var index = 0; index < digits.length; index++) {
		if (!Number.isInteger(digits[index]) || digits[index] < 0 || digits[index] > 9) {
			throw new Error('Each item must be an integer between 0 and 9.');
		}
	}

	return '(' + digits.slice(0, 3).join('') + ') ' +
		digits.slice(3, 6).join('') + '-' + digits.slice(6).join('');
}

var input = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

input.question('Enter 10 digits for the phone number: ', function (value) {
	try {
		var phoneDigits = value.trim().split('').map(Number);
		console.log(formatPhoneNumber(phoneDigits));
	} catch (error) {
		console.log(error.message);
	}

	input.close();
});
