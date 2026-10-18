export function calculateGrade(marks) {
  if (!Number.isFinite(marks) || marks < 0 || marks > 100) throw new RangeError('Marks must be from 0 to 100');
  if (marks >= 85) return 'A'; if (marks >= 80) return 'A-'; if (marks >= 75) return 'B+';
  if (marks >= 70) return 'B'; if (marks >= 65) return 'B-'; if (marks >= 60) return 'C+';
  if (marks >= 50) return 'C'; return 'F';
}

export function calculateAverage(values) {
  if (!Array.isArray(values) || values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function calculateGPA(marks) {
  const points = { A: 4, 'A-': 3.7, 'B+': 3.3, B: 3, 'B-': 2.7, 'C+': 2.3, C: 2, F: 0 };
  return points[calculateGrade(marks)];
}
