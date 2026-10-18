# Lab 5 - CampusFlow Advanced JavaScript

This project implements all eight tasks from the supplied lab handout using plain JavaScript and Node.js ES modules. It uses no DOM, framework, database, or third-party package. Task functions are exported so they can be reused independently; `main.js` runs example demonstrations.

## Run

Use Node.js 18 or later, then run `npm start` from this folder.

## Task map

1. `task1/admissions.js` sanitizes applicant data, validates ranges/programs, assigns admission status, and summarizes valid merit data. Fee payment is required for selection; eligible unpaid candidates with merit at least 65 are waiting.
2. `task2/analytics.js` applies the grading policy, creates a stable-by-copy merit ranking, computes dynamic department statistics, and demonstrates the requested array queries.
3. `task3/profile.js` returns an immutable profile update with nested merging and reference comparisons.
4. `task4/users.js` implements `Person`, `Student`, and `FacultyMember`, polymorphic introductions, guest `call`, detached method behavior, and `bind`.
5. `task5/` contains the required `Student.js`, `gradeUtils.js`, `transcriptService.js`, and `main.js` ES modules. It validates transcript JSON and returns both a report object and JSON text.
6. `task6/callbackRegistration.js` performs the dependent registration steps using asynchronous error-first callbacks, stopping on errors.
7. `task7/promiseRegistration.js` chains registration, reports independent post-registration results with `Promise.allSettled`, and uses `Promise.any` for first-success server selection.
8. `task8/dashboard.js` provides an injectable `getJSON`, concurrent dashboard aggregation, a response-shaped fake fetch, and abort-based timeout handling.

The demonstrations include ordinary, boundary, and invalid inputs where relevant. The callback nesting and its error-propagation cost are described in the Task 6 demo.
