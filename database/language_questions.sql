-- ═════════════════════════════════════════════════════════════
-- code.grind() Seed Data: Multi-Language Mastery (Python, Java, C++)
-- Description: Inserts language-specific syntax and idiom problems
-- ═════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO problems (problem_number, title, slug, difficulty, acceptance_rate, category, description) VALUES
('P1', 'Decorator Patterns', 'python-decorators', 'Medium', 45.0, 'Python', 'Write a Python decorator that logs the execution time of any function it wraps.'),
('P2', 'List Comprehensions', 'python-list-comprehension', 'Easy', 88.5, 'Python', 'Given a list of strings, use a single list comprehension to filter out strings with length less than 3 and capitalize the rest.'),
('J1', 'Interface vs Abstract Class', 'java-interface-abstract', 'Easy', 60.1, 'Java', 'Implement a scenario in Java where multiple inheritance is achieved using Interfaces to avoid the diamond problem.'),
('J2', 'Multithreading ExecutorService', 'java-threading-executor', 'Hard', 35.4, 'Java', 'Create a fixed thread pool of size 4 and submit 10 tasks that calculate factorials, ensuring all results are collected using Futures.'),
('C1', 'Pointer Arithmetic', 'cpp-pointer-arithmetic', 'Medium', 42.8, 'C++', 'In C++, given an integer array, find the sum of all elements using ONLY pointer arithmetic (no subscript operator `[]`).'),
('C2', 'Memory Management (RAII)', 'cpp-raii-pattern', 'Hard', 28.9, 'C++', 'Demonstrate the RAII pattern in C++ by creating a class that wraps a raw pointer and ensures it is deleted automatically in the destructor.'),
('C3', 'STL Vector Optimization', 'cpp-stl-vector', 'Medium', 55.2, 'C++', 'Explain and demonstrate how to use `std::vector::reserve()` to prevent multiple reallocations in a high-performance loop.');

-- Tags for Language Mastery
INSERT OR IGNORE INTO problem_tags (problem_id, tag_name) VALUES
((SELECT id FROM problems WHERE problem_number = 'P1'), 'Python'),
((SELECT id FROM problems WHERE problem_number = 'P1'), 'Decorators'),
((SELECT id FROM problems WHERE problem_number = 'P2'), 'Python'),
((SELECT id FROM problems WHERE problem_number = 'J1'), 'Java'),
((SELECT id FROM problems WHERE problem_number = 'J1'), 'OOP'),
((SELECT id FROM problems WHERE problem_number = 'J2'), 'Java'),
((SELECT id FROM problems WHERE problem_number = 'J2'), 'Concurrency'),
((SELECT id FROM problems WHERE problem_number = 'C1'), 'C++'),
((SELECT id FROM problems WHERE problem_number = 'C2'), 'C++'),
((SELECT id FROM problems WHERE problem_number = 'C2'), 'Memory'),
((SELECT id FROM problems WHERE problem_number = 'C3'), 'C++'),
((SELECT id FROM problems WHERE problem_number = 'C3'), 'STL');
