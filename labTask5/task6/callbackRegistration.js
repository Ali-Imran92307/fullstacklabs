const students = [{ id: 101, completed: ['CS301'], registered: [] }];
const courses = [{ code: 'CS401', prerequisite: 'CS301', seats: 1 }];

function asyncResult(work, callback) {
  setTimeout(() => {
    let value;
    try { value = work(); } catch (error) { callback(error); return; }
    callback(null, value);
  }, 0);
}
export function loadStudent(id, callback) { asyncResult(() => students.find(student => student.id === id) ?? (() => { throw new Error('Student does not exist'); })(), callback); }
export function checkPrerequisites(student, course, callback) { asyncResult(() => { if (!student.completed.includes(course.prerequisite)) throw new Error('Prerequisite not completed'); return { student, course }; }, callback); }
export function checkAvailableSeats(student, course, callback) { asyncResult(() => { if (course.seats < 1) throw new Error('Course is full'); if (student.registered.includes(course.code)) throw new Error('Student already registered'); return { student, course }; }, callback); }
export function registerCourse(student, course, callback) { asyncResult(() => { course.seats -= 1; student.registered.push(course.code); return { studentId: student.id, course: course.code, status: 'REGISTERED' }; }, callback); }

export function registerWithCallbacks(studentId, courseCode, callback) {
  const course = courses.find(item => item.code === courseCode);
  if (!course) return setTimeout(() => callback(new Error('Course does not exist')), 0);
  loadStudent(studentId, (error, student) => {
    if (error) return callback(error);
    checkPrerequisites(student, course, (prerequisiteError, ready) => {
      if (prerequisiteError) return callback(prerequisiteError);
      checkAvailableSeats(ready.student, ready.course, (seatError, available) => {
        if (seatError) return callback(seatError);
        registerCourse(available.student, available.course, callback);
      });
    });
  });
}

export function runCallbackDemo() {
  registerWithCallbacks(101, 'CS401', (error, result) => {
    console.log('\nTask 6 callback registration:', error ? error.message : result);
    // Dependent callback stages nest; each boundary needs explicit error forwarding.
    console.log('Callback workflows become harder to maintain as nesting and repeated error checks grow.');
  });
}
