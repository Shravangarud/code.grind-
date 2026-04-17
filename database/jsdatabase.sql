-- ═════════════════════════════════════════════════════════════
-- code.grind() Seed Data: JavaScript Section
-- Description: Inserts 20 JavaScript specific queries/challenges
--              into the 'problems' table.
-- ═════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO problems (problem_number, title, slug, difficulty, acceptance_rate, category, description) VALUES
('2667', 'Create Hello World Function', 'create-hello-world-function', 'Easy', 80.50, 'JavaScript', 'Write a function createHelloWorld. It should return a new function that always returns "Hello World".'),
('2620', 'Counter', 'counter', 'Easy', 82.30, 'JavaScript', 'Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called.'),
('2704', 'To Be Or Not To Be', 'to-be-or-not-to-be', 'Easy', 78.40, 'JavaScript', 'Write a function expect that helps developers test their code. It should take in any value val and return an object with two functions: toBe and notToBe.'),
('2665', 'Counter II', 'counter-ii', 'Easy', 75.10, 'JavaScript', 'Write a function createCounter. It should accept an initial integer init. It should return an object with three functions: increment, decrement, and reset.'),
('2635', 'Apply Transform Over Each Element in Array', 'apply-transform-over-each-element-in-array', 'Easy', 85.20, 'JavaScript', 'Given an integer array arr and a mapping function fn, return a new array with a transformation applied to each element.'),
('2634', 'Filter Elements from Array', 'filter-elements-from-array', 'Easy', 82.10, 'JavaScript', 'Given an integer array arr and a filtering function fn, return a filtered array filteredArr.'),
('2626', 'Array Reduce Transformation', 'array-reduce-transformation', 'Easy', 79.80, 'JavaScript', 'Given an integer array nums, a reducer function fn, and an initial value init, return the final result obtained by executing the fn function on each element of the array.'),
('2629', 'Function Composition', 'function-composition', 'Easy', 76.50, 'JavaScript', 'Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.'),
('2703', 'Return Length of Arguments Passed', 'return-length-of-arguments-passed', 'Easy', 92.30, 'JavaScript', 'Write a function argumentsLength that returns the count of arguments passed to it.'),
('2666', 'Allow One Function Call', 'allow-one-function-call', 'Easy', 81.20, 'JavaScript', 'Given a function fn, return a new function that is identical to the original function except that it ensures fn is called at most once.'),
('2623', 'Memoize', 'memoize', 'Medium', 65.40, 'JavaScript', 'Given a function fn, return a memoized version of that function.'),
('2723', 'Add Two Promises', 'add-two-promises', 'Easy', 90.10, 'JavaScript', 'Given two promises promise1 and promise2, return a new promise. promise1 and promise2 will both resolve with a number.'),
('2621', 'Sleep', 'sleep', 'Easy', 89.20, 'JavaScript', 'Given a positive integer millis, write an asynchronous function that sleeps for millis milliseconds.'),
('2715', 'Timeout Cancellation', 'timeout-cancellation', 'Easy', 75.60, 'JavaScript', 'Given a function fn, an array of arguments args, and a timeout t in milliseconds, return a cancel function cancelFn.'),
('2725', 'Interval Cancellation', 'interval-cancellation', 'Easy', 72.80, 'JavaScript', 'Given a function fn, an array of arguments args, and an interval time t in milliseconds, return a cancel function cancelFn.'),
('2637', 'Promise Time Limit', 'promise-time-limit', 'Medium', 60.10, 'JavaScript', 'Given an asynchronous function fn and a time t in milliseconds, return a new time limited version of the input function.'),
('2622', 'Cache With Time Limit', 'cache-with-time-limit', 'Medium', 52.30, 'JavaScript', 'Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.'),
('2627', 'Debounce', 'debounce', 'Medium', 66.80, 'JavaScript', 'Given a function fn and a time in milliseconds t, return a debounced version of that function.'),
('2721', 'Execute Asynchronous Functions in Parallel', 'execute-asynchronous-functions-in-parallel', 'Medium', 55.40, 'JavaScript', 'Given an array of asynchronous functions functions, return a new promise promise.'),
('2727', 'Is Object Empty', 'is-object-empty', 'Easy', 86.90, 'JavaScript', 'Given an object or an array, return if it is empty.');

-- Insert corresponding Database query tags
INSERT OR IGNORE INTO problem_tags (problem_id, tag_name) VALUES
((SELECT id FROM problems WHERE problem_number = '2667'), 'Closures'),
((SELECT id FROM problems WHERE problem_number = '2620'), 'Closures'),
((SELECT id FROM problems WHERE problem_number = '2704'), 'Closures'),
((SELECT id FROM problems WHERE problem_number = '2665'), 'Closures'),
((SELECT id FROM problems WHERE problem_number = '2635'), 'Basic Array Math'),
((SELECT id FROM problems WHERE problem_number = '2634'), 'Basic Array Math'),
((SELECT id FROM problems WHERE problem_number = '2626'), 'Basic Array Math'),
((SELECT id FROM problems WHERE problem_number = '2629'), 'Function Transformations'),
((SELECT id FROM problems WHERE problem_number = '2703'), 'Function Transformations'),
((SELECT id FROM problems WHERE problem_number = '2666'), 'Function Transformations'),
((SELECT id FROM problems WHERE problem_number = '2623'), 'Function Transformations'),
((SELECT id FROM problems WHERE problem_number = '2723'), 'Promises and Time'),
((SELECT id FROM problems WHERE problem_number = '2621'), 'Promises and Time'),
((SELECT id FROM problems WHERE problem_number = '2715'), 'Promises and Time'),
((SELECT id FROM problems WHERE problem_number = '2725'), 'Promises and Time'),
((SELECT id FROM problems WHERE problem_number = '2637'), 'Promises and Time'),
((SELECT id FROM problems WHERE problem_number = '2622'), 'Promises and Time'),
((SELECT id FROM problems WHERE problem_number = '2627'), 'Promises and Time'),
((SELECT id FROM problems WHERE problem_number = '2721'), 'Promises and Time'),
((SELECT id FROM problems WHERE problem_number = '2727'), 'JSON');
