import Student from './Student.js';
import { calculateAverage, calculateGPA as gradeGPA } from './gradeUtils.js';

export function processTranscriptJSON(rawData) {
  let input;
  try { input = JSON.parse(rawData); } catch (error) { throw new SyntaxError(`Malformed transcript JSON: ${error.message}`); }
  if (!Array.isArray(input)) throw new TypeError('Transcript must be an array of students');
  const ids = new Set();
  const students = input.map((entry, index) => {
    if (!entry || entry.id === undefined || entry.id === null || entry.id === '') throw new TypeError(`Student at index ${index} is missing an ID`);
    if (ids.has(entry.id)) throw new Error(`Duplicate student ID: ${entry.id}`);
    ids.add(entry.id);
    if (!Array.isArray(entry.courses)) throw new TypeError(`Student ${entry.id} courses must be an array`);
    const courses = entry.courses.map((course, courseIndex) => {
      if (!course?.code || typeof course.code !== 'string') throw new TypeError(`Student ${entry.id}, course ${courseIndex} is missing a course code`);
      if (!Number.isFinite(course.marks) || course.marks < 0 || course.marks > 100) throw new RangeError(`Invalid marks for ${course.code}`);
      return { ...course, grade: gradeGPA(course.marks) };
    });
    const average = calculateAverage(courses.map(course => course.marks));
    return { ...new Student(entry.id, entry.name ?? 'Unknown', courses), average, gpa: courses.length ? calculateAverage(courses.map(course => course.grade)) : 0 };
  });
  const report = { generatedAt: new Date().toISOString(), studentCount: students.length, students };
  return { report, json: JSON.stringify(report, null, 2) };
}
