import Student from './Student.js';
import { calculateAverage, calculateGPA as getGPA } from './gradeUtils.js';
import { processTranscriptJSON } from './transcriptService.js';

export async function runTranscriptDemo() {
  const rawData = `[{"id":101,"name":"Ali","courses":[{"code":"CS301","marks":81},{"code":"CS302","marks":74}]}]`;
  try {
    const { report, json } = processTranscriptJSON(rawData);
    console.log('\nTask 5 transcript:', { report, json, importedStudentClass: Student.name, averageExample: calculateAverage([81, 74]), gpaExample: getGPA(81) });
    for (const invalid of ['{bad json}', '[{"name":"No ID","courses":[]}]']) {
      try { processTranscriptJSON(invalid); } catch (error) { console.log(`Transcript rejected (${error.name}): ${error.message}`); }
    }
  } catch (error) {
    console.error('Transcript processing failed:', error);
  } finally {
    console.log('Task 5 transcript attempt finished.');
  }
}
