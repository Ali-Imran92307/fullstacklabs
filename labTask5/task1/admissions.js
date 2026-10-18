const SUPPORTED_PROGRAMS = new Set(['BSCS', 'BSSE', 'BSAI']);

export function processApplicant(applicant) {
  const errors = [];
  if (!applicant || typeof applicant !== 'object') {
    return { applicant: null, valid: false, status: 'INVALID DATA', errors: ['Applicant must be an object'] };
  }
  const required = ['id', 'name', 'age', 'matricMarks', 'intermediateMarks', 'entryTest', 'program', 'feePaid'];
  for (const key of required) {
    if (applicant[key] === undefined || applicant[key] === null || String(applicant[key]).trim() === '') errors.push(`Missing ${key}`);
  }
  const numeric = {};
  for (const key of ['age', 'matricMarks', 'intermediateMarks', 'entryTest']) {
    const value = Number(applicant[key]);
    if (applicant[key] !== undefined && applicant[key] !== null && String(applicant[key]).trim() !== '' && !Number.isFinite(value)) errors.push(`Invalid ${key}`);
    else numeric[key] = value;
  }
  for (const key of ['matricMarks', 'intermediateMarks', 'entryTest']) {
    if (Number.isFinite(numeric[key]) && (numeric[key] < 0 || numeric[key] > 100)) errors.push(`${key} must be from 0 to 100`);
  }
  if (Number.isFinite(numeric.age) && (numeric.age < 17 || numeric.age > 30)) errors.push('age must be from 17 to 30');
  if (applicant.program && !SUPPORTED_PROGRAMS.has(applicant.program)) errors.push('Unsupported program');
  if (applicant.feePaid !== undefined && !['true', 'false', true, false].includes(applicant.feePaid)) errors.push('feePaid must be true or false');
  const valid = errors.length === 0;
  if (!valid) return { applicant: { ...applicant }, valid, merit: null, status: 'INVALID DATA', errors };
  const merit = numeric.matricMarks * 0.2 + numeric.intermediateMarks * 0.3 + numeric.entryTest * 0.5;
  const eligible = merit >= 70 && numeric.entryTest >= 60 && numeric.intermediateMarks >= 60;
  const feePaid = applicant.feePaid === true || applicant.feePaid === 'true';
  const status = eligible && feePaid ? 'SELECTED' : eligible && merit >= 65 ? 'WAITING' : 'REJECTED';
  return { applicant: { ...applicant }, valid, merit: Number(merit.toFixed(2)), eligible, status, errors };
}

export function summarizeApplicants(processed) {
  const valid = processed.filter(item => item.valid);
  const byProgram = processed.reduce((counts, item) => {
    const program = item.applicant?.program ?? 'MISSING';
    counts[program] = (counts[program] ?? 0) + 1;
    return counts;
  }, {});
  const ranked = [...valid].sort((a, b) => b.merit - a.merit);
  return {
    validApplicants: valid.length,
    invalidApplicants: processed.length - valid.length,
    highestMeritApplicant: ranked[0] ? { id: ranked[0].applicant.id, name: ranked[0].applicant.name, merit: ranked[0].merit } : null,
    lowestValidMerit: ranked.length ? ranked.at(-1).merit : null,
    averageMerit: valid.length ? Number((valid.reduce((sum, item) => sum + item.merit, 0) / valid.length).toFixed(2)) : null,
    applicantsByProgram: byProgram
  };
}

export function runAdmissionDemo() {
  const applicants = [
    { id: 'A101', name: 'Sara Khan', age: '19', matricMarks: '91', intermediateMarks: '87', entryTest: '78', program: 'BSCS', feePaid: 'true' },
    { id: 'A102', name: 'Ahmed Ali', age: 'twenty', matricMarks: '88', intermediateMarks: '', entryTest: '72', program: 'BSSE', feePaid: 'false' },
    { id: 'A103', name: 'Hassan', age: '18', matricMarks: '76', intermediateMarks: '83', entryTest: '91', program: 'BSAI', feePaid: 'true' },
    { id: 'A104', name: 'Boundary', age: '17', matricMarks: '0', intermediateMarks: '60', entryTest: '60', program: 'BSCS', feePaid: false },
    { id: 'A105', name: 'Bad marks', age: '31', matricMarks: '101', intermediateMarks: '80', entryTest: '60', program: 'MED', feePaid: 'true' }
  ];
  const processed = applicants.map(processApplicant);
  console.log('\nTask 1 admissions:', { processed, summary: summarizeApplicants(processed) });
}
