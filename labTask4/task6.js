const readline = require('readline');

function sumMultiples(x, y, z) {
	let sum = 0;

	for (let number = 1; number < z; number++) {
		if (number % x === 0 || number % y === 0) {
			sum += number;
		}
	}

	return sum;
}

const input = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

input.question('Enter x, y, and z separated by spaces or commas: ', function (value) {
	const values = value.trim().split(/[\s,]+/).map(Number);
	const x = values[0];
	const y = values[1];
	const z = values[2];

	if (values.length !== 3 || !Number.isInteger(x) || !Number.isInteger(y) ||
		!Number.isInteger(z) || x <= 0 || y <= 0 || z <= 0) {
		console.log('Please enter three positive integers.');
	} else {
		console.log('Sum:', sumMultiples(x, y, z));
	}

	input.close();
});
