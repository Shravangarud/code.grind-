-- ═════════════════════════════════════════════════════════════
-- code.grind() Seed Data: Database Section
-- Description: Inserts 30 advanced SQL/Database queries 
--              into the 'problems' table.
-- ═════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO problems (problem_number, title, slug, difficulty, acceptance_rate, category, description) VALUES
('175', 'Combine Two Tables', 'combine-two-tables', 'Easy', 75.80, 'Database', 'Write a solution to report the first name, last name, city, and state of each person in the Person table.'),
('176', 'Second Highest Salary', 'second-highest-salary', 'Medium', 38.60, 'Database', 'Write a solution to find the second highest distinct salary from the Employee table.'),
('177', 'Nth Highest Salary', 'nth-highest-salary', 'Medium', 38.10, 'Database', 'Write a solution to find the nth highest distinct salary from the Employee table.'),
('178', 'Rank Scores', 'rank-scores', 'Medium', 61.20, 'Database', 'Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules...'),
('180', 'Consecutive Numbers', 'consecutive-numbers', 'Medium', 46.50, 'Database', 'Find all numbers that appear at least three times consecutively.'),
('181', 'Employees Earning More Than Their Managers', 'employees-earning-more-than-their-managers', 'Easy', 68.70, 'Database', 'Write a solution to find the employees who earn more than their managers.'),
('182', 'Duplicate Emails', 'duplicate-emails', 'Easy', 71.00, 'Database', 'Write a solution to report all the duplicate emails. Note that its guaranteed that the email field is not NULL.'),
('183', 'Customers Who Never Order', 'customers-who-never-order', 'Easy', 68.30, 'Database', 'Write a solution to find all customers who never order anything.'),
('184', 'Department Highest Salary', 'department-highest-salary', 'Medium', 51.50, 'Database', 'Write a solution to find employees who have the highest salary in each of the departments.'),
('185', 'Department Top Three Salaries', 'department-top-three-salaries', 'Hard', 52.10, 'Database', 'Write a solution to find the employees who are high earners in each of the departments.'),
('196', 'Delete Duplicate Emails', 'delete-duplicate-emails', 'Easy', 60.10, 'Database', 'Write a solution to delete all duplicate emails, keeping only one unique email with the smallest id.'),
('197', 'Rising Temperature', 'rising-temperature', 'Easy', 45.30, 'Database', 'Write a solution to find all dates id with higher temperatures compared to its previous dates (yesterday).'),
('262', 'Trips and Users', 'trips-and-users', 'Hard', 36.80, 'Database', 'Write a solution to find the cancellation rate of requests with unbanned users (both client and driver must not be banned) each day.'),
('511', 'Game Play Analysis I', 'game-play-analysis-i', 'Easy', 75.10, 'Database', 'Write an SQL query to report the first login date for each player.'),
('512', 'Game Play Analysis II', 'game-play-analysis-ii', 'Easy', 53.60, 'Database', 'Write an SQL query to report the device that is first logged in for each player.'),
('534', 'Game Play Analysis III', 'game-play-analysis-iii', 'Medium', 80.50, 'Database', 'Write an SQL query to report for each player and date, how many games played so far by the player. That is, the total number of games played by the player until that date.'),
('550', 'Game Play Analysis IV', 'game-play-analysis-iv', 'Medium', 48.90, 'Database', 'Write an SQL query to report the fraction of players that logged in again on the day after the day they first logged in.'),
('577', 'Employee Bonus', 'employee-bonus', 'Easy', 74.50, 'Database', 'Write an SQL query to report the name and bonus amount of each employee with a bonus less than 1000.'),
('584', 'Find Customer Referee', 'find-customer-referee', 'Easy', 74.70, 'Database', 'Write an SQL query to report the names of the customer that are not referred by the customer with id = 2.'),
('586', 'Customer Placing the Largest Number of Orders', 'customer-placing-the-largest-number-of-orders', 'Easy', 67.50, 'Database', 'Write an SQL query to find the customer_number for the customer who has placed the largest number of orders.'),
('595', 'Big Countries', 'big-countries', 'Easy', 87.20, 'Database', 'A country is big if it has an area of at least three million, or a population of at least twenty-five million. Report the name, population, and area of the big countries.'),
('596', 'Classes More Than 5 Students', 'classes-more-than-5-students', 'Easy', 45.80, 'Database', 'Write an SQL query to report all the classes that have at least five students.'),
('601', 'Human Traffic of Stadium', 'human-traffic-of-stadium', 'Hard', 48.50, 'Database', 'Write an SQL query to display the records with three or more rows with consecutive ids, and the number of people is greater than or equal to 100 for each.'),
('607', 'Sales Person', 'sales-person', 'Easy', 65.40, 'Database', 'Write an SQL query to report the names of all the salespersons who did not have any orders related to the company with the name RED.'),
('626', 'Exchange Seats', 'exchange-seats', 'Medium', 69.50, 'Database', 'Write an SQL query to swap the seat id of every two consecutive students. If the number of students is odd, the id of the last student is not swapped.'),
('1050', 'Actors and Directors Who Cooperated At Least Three Times', 'actors-and-directors-who-cooperated', 'Easy', 72.30, 'Database', 'Write a SQL query for a report that provides the pairs (actor_id, director_id) where the actor has cooperated with the director at least three times.'),
('1148', 'Article Views I', 'article-views-i', 'Easy', 77.10, 'Database', 'Write an SQL query to find all the authors that viewed at least one of their own articles.'),
('1527', 'Patients With a Condition', 'patients-with-a-condition', 'Easy', 59.50, 'Database', 'Write an SQL query to report the patient_id, patient_name and conditions of the patients who have Type I Diabetes.'),
('1667', 'Fix Names in a Table', 'fix-names-in-a-table', 'Easy', 64.90, 'Database', 'Write an SQL query to fix the names so that only the first character is uppercase and the rest are lowercase.'),
('1757', 'Recyclable and Low Fat Products', 'recyclable-and-low-fat-products', 'Easy', 90.00, 'Database', 'Write an SQL query to find the ids of products that are both low fat and recyclable.');

-- Insert corresponding Database query tags
INSERT OR IGNORE INTO problem_tags (problem_id, tag_name) VALUES
((SELECT id FROM problems WHERE problem_number = '175'), 'PostgreSQL'),
((SELECT id FROM problems WHERE problem_number = '175'), 'MySQL'),
((SELECT id FROM problems WHERE problem_number = '176'), 'Subquery'),
((SELECT id FROM problems WHERE problem_number = '177'), 'Window Function'),
((SELECT id FROM problems WHERE problem_number = '178'), 'Window Function'),
((SELECT id FROM problems WHERE problem_number = '180'), 'Self Join'),
((SELECT id FROM problems WHERE problem_number = '181'), 'Join'),
((SELECT id FROM problems WHERE problem_number = '184'), 'Group By'),
((SELECT id FROM problems WHERE problem_number = '185'), 'Window Function'),
((SELECT id FROM problems WHERE problem_number = '185'), 'Subquery'),
((SELECT id FROM problems WHERE problem_number = '196'), 'Delete'),
((SELECT id FROM problems WHERE problem_number = '197'), 'Date Function'),
((SELECT id FROM problems WHERE problem_number = '262'), 'Group By'),
((SELECT id FROM problems WHERE problem_number = '262'), 'Aggregations'),
((SELECT id FROM problems WHERE problem_number = '511'), 'Group By'),
((SELECT id FROM problems WHERE problem_number = '550'), 'Self Join'),
((SELECT id FROM problems WHERE problem_number = '550'), 'Date Function'),
((SELECT id FROM problems WHERE problem_number = '595'), 'Filtering'),
((SELECT id FROM problems WHERE problem_number = '601'), 'Window Function'),
((SELECT id FROM problems WHERE problem_number = '626'), 'Case Statement'),
((SELECT id FROM problems WHERE problem_number = '1527'), 'Regex'),
((SELECT id FROM problems WHERE problem_number = '1667'), 'String Formatting');
