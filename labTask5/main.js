import { runAdmissionDemo } from './task1/admissions.js';
import { runAnalyticsDemo } from './task2/analytics.js';
import { runProfileDemo } from './task3/profile.js';
import { runUserDemo } from './task4/users.js';
import { runTranscriptDemo } from './task5/main.js';
import { runCallbackDemo } from './task6/callbackRegistration.js';
import { runPromiseDemo } from './task7/promiseRegistration.js';
import { runDashboardDemo } from './task8/dashboard.js';

// Each task exports reusable functions; this entry point runs the demonstrations.
runAdmissionDemo();
runAnalyticsDemo();
runProfileDemo();
runUserDemo();
await runTranscriptDemo();
runCallbackDemo();
await runPromiseDemo();
await runDashboardDemo();
