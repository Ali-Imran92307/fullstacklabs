export class Person {
  constructor(name, email) { this.name = name; this.email = email; }
  introduce() { return `I am ${this.name} (${this.email}).`; }
}

export class Student extends Person {
  constructor(name, email, rollNo, marks) { super(name, email); this.rollNo = rollNo; this.marks = marks; }
  introduce() { return `${super.introduce()} Student roll number: ${this.rollNo}.`; }
  getResult() { return this.marks >= 50 ? 'PASSED' : 'FAILED'; }
}

export class FacultyMember extends Person {
  constructor(name, email, employeeId, department) { super(name, email); this.employeeId = employeeId; this.department = department; }
  introduce() { return `${super.introduce()} Faculty in ${this.department}, employee ${this.employeeId}.`; }
}

export function runUserDemo() {
  const student = new Student('Ali', 'ali@university.edu', 'S-101', 82);
  const users = [student, new Student('Sara', 'sara@university.edu', 'S-102', 48), new FacultyMember('Dr. Khan', 'khan@university.edu', 'F-10', 'CS')];
  const guest = { name: 'Dr. Ahmed', email: 'ahmed@example.com' };
  const fn = student.introduce;
  let detachedResult;
  try { detachedResult = fn(); } catch (error) { detachedResult = `${error.name}: detached this is unavailable in strict ES modules`; }
  console.log('\nTask 4 users:', { introductions: users.map(user => user.introduce()), guest: Person.prototype.introduce.call(guest), detachedResult, bound: fn.bind(student)(), isStudent: student instanceof Student, isPerson: student instanceof Person, result: student.getResult() });
}
