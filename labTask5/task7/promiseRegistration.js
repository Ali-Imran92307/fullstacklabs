const pause = (value, ms = 5) => new Promise(resolve => setTimeout(() => resolve(value), ms));
export function getStudent(id) { return id === 101 ? pause({ id, completed: ['CS301'], registered: [] }) : Promise.reject(new Error('Student does not exist')); }
export function getCourse(code) { return code === 'CS401' ? pause({ code, prerequisite: 'CS301', seats: 2 }) : Promise.reject(new Error('Course does not exist')); }
export function checkPrerequisites(student, course) { return student.completed.includes(course.prerequisite) ? pause({ student, course }) : Promise.reject(new Error('Prerequisite not completed')); }
export function checkSeats(student, course) { return course.seats > 0 ? pause({ student, course }) : Promise.reject(new Error('Course is full')); }
export function registerStudent(student, course) { return pause({ studentId: student.id, course: course.code, status: 'REGISTERED' }); }
export function sendEmail() { return pause('sent'); }
export function sendSMS() { return Promise.reject(new Error('SMS service unavailable')); }
export function writeAuditLog() { return pause('written'); }

export function getFirstSuccessfulCourse(code, servers) {
  // any() ignores early rejections and fulfills with the first successful server.
  return Promise.any(servers.map(server => server(code)));
}

export function registerAndNotify(id, code) {
  let registration;
  return getStudent(id)
    .then(student => getCourse(code).then(course => ({ student, course })))
    .then(({ student, course }) => checkPrerequisites(student, course))
    .then(({ student, course }) => checkSeats(student, course))
    .then(({ student, course }) => registerStudent(student, course))
    .then(result => {
      registration = result;
      return Promise.allSettled([sendEmail(), sendSMS(), writeAuditLog()]).then(outcomes => ({
        registration: result,
        services: outcomes.map((outcome, index) => ({ service: ['Email', 'SMS', 'Audit'][index], status: outcome.status }))
      }));
    })
    .catch(error => ({ error: error.message, registration: registration ?? null }))
    .finally(() => console.log('Task 7 registration workflow finished.'));
}

export async function runPromiseDemo() {
  const result = await registerAndNotify(101, 'CS401');
  const firstSuccessful = await getFirstSuccessfulCourse('CS401', [
    () => Promise.reject(new Error('Primary server unavailable')),
    code => pause({ code, source: 'backup server' })
  ]);
  console.log('\nTask 7 promises:', result, 'race example:', await Promise.race([pause('fast', 1), pause('slow', 10)]), 'first successful server:', firstSuccessful);
}
