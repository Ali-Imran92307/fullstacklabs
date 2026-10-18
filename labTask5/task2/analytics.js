const results = [
  { id: 1, name: 'Ali', department: 'CS', course: 'FSWD', marks: 82 },
  { id: 2, name: 'Sara', department: 'CS', course: 'FSWD', marks: 91 },
  { id: 3, name: 'Usman', department: 'SE', course: 'FSWD', marks: 47 },
  { id: 4, name: 'Hina', department: 'AI', course: 'FSWD', marks: 73 },
  { id: 5, name: 'Ahmed', department: 'SE', course: 'FSWD', marks: 64 },
  { id: 6, name: 'Zoya', department: 'AI', course: 'FSWD', marks: 91 }
];

export function gradeResult(student) {
  const { marks } = student;
  if (!Number.isFinite(marks) || marks < 0 || marks > 100) return { ...student, grade: 'INVALID', status: 'INVALID', gradePoints: null };
  let grade;
  if (marks >= 85 && marks <= 100) grade = 'A';
  else if (marks >= 80) grade = 'A-';
  else if (marks >= 75) grade = 'B+';
  else if (marks >= 70) grade = 'B';
  else if (marks >= 65) grade = 'B-';
  else if (marks >= 60) grade = 'C+';
  else if (marks >= 50) grade = 'C';
  else grade = 'F';
  const points = { A: 4, 'A-': 3.7, 'B+': 3.3, B: 3, 'B-': 2.7, 'C+': 2.3, C: 2, F: 0 };
  return { ...student, grade, status: grade === 'F' ? 'FAILED' : 'PASSED', gradePoints: points[grade] };
}

export function analyzeResults(data = results) {
  const processed = data.map(gradeResult);
  const ranked = [...processed].sort((a, b) => b.marks - a.marks || a.name.localeCompare(b.name));
  const departments = processed.reduce((stats, student) => {
    const stat = stats[student.department] ??= { students: 0, total: 0, highest: -Infinity, passed: 0 };
    stat.students += 1;
    stat.total += student.marks;
    stat.highest = Math.max(stat.highest, student.marks);
    if (student.status === 'PASSED') stat.passed += 1;
    return stats;
  }, {});
  Object.values(departments).forEach(stat => { stat.average = Number((stat.total / stat.students).toFixed(2)); delete stat.total; });
  const average = processed.length ? processed.reduce((sum, item) => sum + item.marks, 0) / processed.length : 0;
  return {
    processed,
    ranked,
    departments,
    firstAbove85: processed.find(student => student.marks > 85) ?? null,
    firstFailedIndex: processed.findIndex(student => student.status === 'FAILED'),
    anyFailed: processed.some(student => student.status === 'FAILED'),
    allMarksValid: processed.every(student => Number.isFinite(student.marks) && student.marks >= 0 && student.marks <= 100),
    aboveAverage: processed.filter(student => student.marks > average),
    topThreeNames: ranked.slice(0, 3).map(student => student.name),
    originalUnchanged: data === results ? data.map(item => item.marks).join() === '82,91,47,73,64,91' : true
  };
}

export function runAnalyticsDemo() { console.log('\nTask 2 analytics:', analyzeResults()); }
