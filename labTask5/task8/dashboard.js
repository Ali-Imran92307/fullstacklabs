export async function getJSON(url, fetchImplementation = fetch) {
  const response = await fetchImplementation(url);
  if (!response.ok) {
    const error = new Error(`HTTP ${response.status} for ${url}`);
    error.name = 'HttpError';
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function fakeFetch(url, options = {}) {
  const route = {
    '/users': [{ id: 101, name: 'Ali', department: 'CS' }, { id: 102, name: 'Sara', department: 'CS' }, { id: 103, name: 'Hina', department: 'AI' }],
    '/courses': [{ code: 'CS301' }, { code: 'CS401' }],
    '/results': [{ studentId: 101, marks: 81 }, { studentId: 102, marks: 47 }, { studentId: 103, marks: 91 }]
  };
  const delay = url === '/slow' ? 50 : 2;
  await new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, delay);
    options.signal?.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Request aborted', 'AbortError')); }, { once: true });
  });
  if (url === '/network-error') throw new TypeError('Network request failed');
  if (url === '/invalid-json') return { ok: true, status: 200, json: async () => { throw new SyntaxError('Invalid JSON'); } };
  const status = url === '/missing' ? 404 : url === '/server-error' ? 500 : 200;
  return { ok: status === 200, status, json: async () => route[url] ?? null };
}

export function buildDashboard([users, courses, results]) {
  const marksById = new Map(results.map(result => [result.studentId, result.marks]));
  const students = users.map(user => ({ ...user, marks: marksById.get(user.id) ?? null }));
  const validMarks = results.map(result => result.marks).filter(Number.isFinite);
  const departments = students.reduce((stats, student) => {
    const stat = stats[student.department] ??= { students: 0, totalMarks: 0, markedStudents: 0, failed: 0 };
    stat.students += 1;
    if (Number.isFinite(student.marks)) { stat.totalMarks += student.marks; stat.markedStudents += 1; if (student.marks < 50) stat.failed += 1; }
    return stats;
  }, {});
  Object.values(departments).forEach(stat => { stat.averageMarks = stat.markedStudents ? Number((stat.totalMarks / stat.markedStudents).toFixed(2)) : null; delete stat.totalMarks; delete stat.markedStudents; });
  const top = [...students].filter(student => Number.isFinite(student.marks)).sort((a, b) => b.marks - a.marks)[0] ?? null;
  return { totalStudents: users.length, totalCourses: courses.length, overallAverageMarks: validMarks.length ? Number((validMarks.reduce((a, b) => a + b, 0) / validMarks.length).toFixed(2)) : null, highestPerformingStudent: top, failedStudents: validMarks.filter(mark => mark < 50).length, departments };
}

export async function fetchWithTimeout(url, milliseconds, fetchImplementation = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), milliseconds);
  try {
    return await getJSON(url, (target) => fetchImplementation(target, { signal: controller.signal }));
  } catch (error) {
    if (error.name === 'AbortError') { const timeout = new Error(`Request timed out after ${milliseconds}ms`); timeout.name = 'TimeoutError'; throw timeout; }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export async function runDashboardDemo() {
  const data = await Promise.all(['/users', '/courses', '/results'].map(url => getJSON(url, fakeFetch)));
  const dashboard = buildDashboard(data);
  const errorCases = {};
  for (const url of ['/missing', '/server-error', '/network-error', '/invalid-json']) {
    try { await getJSON(url, fakeFetch); } catch (error) { errorCases[url] = error.name; }
  }
  try { await fetchWithTimeout('/slow', 5, fakeFetch); } catch (error) { errorCases['/slow'] = error.name; }
  console.log('\nTask 8 dashboard:', dashboard, 'error cases:', errorCases);
}
