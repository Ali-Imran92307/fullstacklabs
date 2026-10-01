let givenPrime = 11;
let nextNumber = givenPrime + 1;
let nextPrime;

while (nextPrime === undefined) {
	let isPrime = true;

	for (let divisor = 2; divisor * divisor <= nextNumber; divisor++) {
		if (nextNumber % divisor === 0) {
			isPrime = false;
			break;
		}
	}

	if (isPrime) {
		nextPrime = nextNumber;
	} else {
		nextNumber++;
	}
}

console.log('The prime number after ' + givenPrime + ' is ' + nextPrime + '.');
