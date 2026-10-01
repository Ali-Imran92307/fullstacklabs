var name = 'Ali Imran';
var age = 21;
var isStudent = true;
var email = 'alex.johnson@example.com';

var biography = {
	name: name,
	age: age,
	isStudent: isStudent,
	email: email,
	address: {
		street: '123 Main Street',
		city: 'Islamabad',
		country: 'Pakistan'
	},
	degreePrograms: {
		current: 'Bachelor of Computer Science',
		completed: 'Intermediate in Computer Science'
	}
};

console.log('Name:', biography.name);
console.log('Age:', biography.age);
console.log('Student:', biography.isStudent);
console.log('Email:', biography.email);
console.log('Address:', biography.address.city + ', ' + biography.address.country);
console.log('Current degree program:', biography.degreePrograms.current);
