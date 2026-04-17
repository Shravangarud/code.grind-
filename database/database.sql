-- ═════════════════════════════════════════════════════════════
-- code.grind() Database Schema & Seed
-- Description: Sets up the initial problems table and populates 
--              it with an extensive set of algorithm questions.
-- ═════════════════════════════════════════════════════════════

-- 1. Create the base table for Problems
CREATE TABLE IF NOT EXISTS problems (
    id SERIAL PRIMARY KEY, -- Use INTEGER PRIMARY KEY AUTOINCREMENT if using SQLite
    problem_number VARCHAR(10) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    difficulty VARCHAR(50) NOT NULL, -- 'Easy', 'Medium', 'Hard'
    acceptance_rate DECIMAL(5, 2) DEFAULT 0.00,
    category VARCHAR(100) DEFAULT 'Algorithms', -- e.g. Algorithms, Database, Shell
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the table for Users (Persistence & Leaderboard)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    xp INTEGER DEFAULT 0,
    solved_count INTEGER DEFAULT 0,
    rank_num INTEGER DEFAULT 15000,
    avatar_seed VARCHAR(255),
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the table for problem tags (e.g. Array, Hash Table)
CREATE TABLE IF NOT EXISTS problem_tags (
    id SERIAL PRIMARY KEY,
    problem_id INTEGER NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    tag_name VARCHAR(50) NOT NULL
);

-- 3. Clear existing data (if re-running the seed)
-- DELETE FROM problem_tags;
-- DELETE FROM problems;

-- ═════════════════════════════════════════════════════════════
-- SEED DATA: MASSIVE ALGORITHM QUESTION BANK
-- ═════════════════════════════════════════════════════════════

-- Insert Algorithm Questions
INSERT OR IGNORE INTO problems (problem_number, title, slug, difficulty, acceptance_rate, category, description) VALUES
-- ARRAYS & STRINGS
('001', 'Two Sum', 'two-sum', 'Easy', 49.50, 'Algorithms', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'),
('003', 'Longest Substring Without Repeating Characters', 'longest-substring-without-repeating-characters', 'Medium', 33.80, 'Algorithms', 'Given a string s, find the length of the longest substring without repeating characters.'),
('004', 'Median of Two Sorted Arrays', 'median-of-two-sorted-arrays', 'Hard', 35.10, 'Algorithms', 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.'),
('011', 'Container With Most Water', 'container-with-most-water', 'Medium', 54.00, 'Algorithms', 'You are given an integer array height of length n. Find two lines that together with the x-axis form a container, such that the container contains the most water.'),
('015', '3Sum', '3sum', 'Medium', 32.60, 'Algorithms', 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.'),
('020', 'Valid Parentheses', 'valid-parentheses', 'Easy', 40.20, 'Algorithms', 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.'),
('042', 'Trapping Rain Water', 'trapping-rain-water', 'Hard', 59.40, 'Algorithms', 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.'),
('076', 'Minimum Window Substring', 'minimum-window-substring', 'Hard', 40.50, 'Algorithms', 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t is included in the window.'),

-- LINKED LISTS
('002', 'Add Two Numbers', 'add-two-numbers', 'Medium', 40.20, 'Algorithms', 'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.'),
('019', 'Remove Nth Node From End of List', 'remove-nth-node-from-end-of-list', 'Medium', 40.30, 'Algorithms', 'Given the head of a linked list, remove the nth node from the end of the list and return its head.'),
('021', 'Merge Two Sorted Lists', 'merge-two-sorted-lists', 'Easy', 61.60, 'Algorithms', 'Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.'),
('141', 'Linked List Cycle', 'linked-list-cycle', 'Easy', 47.50, 'Algorithms', 'Given head, the head of a linked list, determine if the linked list has a cycle in it.'),
('146', 'LRU Cache', 'lru-cache', 'Medium', 40.60, 'Algorithms', 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.'),
('206', 'Reverse Linked List', 'reverse-linked-list', 'Easy', 73.10, 'Algorithms', 'Given the head of a singly linked list, reverse the list, and return the reversed list.'),

-- DYNAMIC PROGRAMMING
('005', 'Longest Palindromic Substring', 'longest-palindromic-substring', 'Medium', 32.40, 'Algorithms', 'Given a string s, return the longest palindromic substring in s.'),
('010', 'Regular Expression Matching', 'regular-expression-matching', 'Hard', 28.30, 'Algorithms', 'Given an input string s and a pattern p, implement regular expression matching with support for "." and "*".'),
('053', 'Maximum Subarray', 'maximum-subarray', 'Medium', 50.10, 'Algorithms', 'Given an integer array nums, find the subarray which has the largest sum and return its sum.'),
('070', 'Climbing Stairs', 'climbing-stairs', 'Easy', 52.10, 'Algorithms', 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?'),
('1143', 'Longest Common Subsequence', 'longest-common-subsequence', 'Medium', 58.60, 'Algorithms', 'Given two strings text1 and text2, return the length of their longest common subsequence.'),
('322', 'Coin Change', 'coin-change', 'Medium', 42.10, 'Algorithms', 'Given an integer array coins representing coins of different denominations and an integer amount, return the fewest number of coins that you need to make up that amount.'),
('300', 'Longest Increasing Subsequence', 'longest-increasing-subsequence', 'Medium', 51.60, 'Algorithms', 'Given an integer array nums, return the length of the longest strictly increasing subsequence.'),

-- TREES & GRAPHS
('094', 'Binary Tree Inorder Traversal', 'binary-tree-inorder-traversal', 'Easy', 73.20, 'Algorithms', 'Given the root of a binary tree, return the inorder traversal of its nodes values.'),
('098', 'Validate Binary Search Tree', 'validate-binary-search-tree', 'Medium', 31.90, 'Algorithms', 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).'),
('102', 'Binary Tree Level Order Traversal', 'binary-tree-level-order-traversal', 'Medium', 63.80, 'Algorithms', 'Given the root of a binary tree, return the level order traversal of its nodes values.'),
('104', 'Maximum Depth of Binary Tree', 'maximum-depth-of-binary-tree', 'Easy', 73.40, 'Algorithms', 'Given the root of a binary tree, return its maximum depth.'),
('200', 'Number of Islands', 'number-of-islands', 'Medium', 56.40, 'Algorithms', 'Given an m x n 2D grid map of "1"s (land) and "0"s (water), return the number of islands.'),
('207', 'Course Schedule', 'course-schedule', 'Medium', 45.80, 'Algorithms', 'There are a total of numCourses courses you have to take. Return true if you can finish all courses. Otherwise, return false.'),
('236', 'Lowest Common Ancestor of a Binary Tree', 'lowest-common-ancestor', 'Medium', 58.70, 'Algorithms', 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.'),

-- BACKTRACKING
('017', 'Letter Combinations of a Phone Number', 'letter-combinations-of-a-phone-number', 'Medium', 56.10, 'Algorithms', 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.'),
('022', 'Generate Parentheses', 'generate-parentheses', 'Medium', 72.30, 'Algorithms', 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.'),
('039', 'Combination Sum', 'combination-sum', 'Medium', 68.20, 'Algorithms', 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations where the chosen numbers sum to target.'),
('046', 'Permutations', 'permutations', 'Medium', 75.30, 'Algorithms', 'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.'),
('051', 'N-Queens', 'n-queens', 'Hard', 63.40, 'Algorithms', 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.'),

-- GREEDY & SORTING
('055', 'Jump Game', 'jump-game', 'Medium', 38.40, 'Algorithms', 'You are given an integer array nums. You are initially positioned at the arrays first index. Return true if you can reach the last index.'),
('056', 'Merge Intervals', 'merge-intervals', 'Medium', 46.10, 'Algorithms', 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.'),
('121', 'Best Time to Buy and Sell Stock', 'best-time-to-buy-and-sell-stock', 'Easy', 54.40, 'Algorithms', 'You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.'),
('347', 'Top K Frequent Elements', 'top-k-frequent-elements', 'Medium', 64.60, 'Algorithms', 'Given an integer array nums and an integer k, return the k most frequent elements.'),

-- MATH & BIT MANIPULATION
('007', 'Reverse Integer', 'reverse-integer', 'Medium', 27.20, 'Algorithms', 'Given a signed 32-bit integer x, return x with its digits reversed.'),
('009', 'Palindrome Number', 'palindrome-number', 'Easy', 53.00, 'Algorithms', 'Given an integer x, return true if x is a palindrome, and false otherwise.'),
('136', 'Single Number', 'single-number', 'Easy', 70.80, 'Algorithms', 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.'),
('191', 'Number of 1 Bits', 'number-of-1-bits', 'Easy', 65.50, 'Algorithms', 'Write a function that takes the binary representation of an unsigned integer and returns the number of "1" bits it has.');

-- Insert Tags associated with the questions
INSERT OR IGNORE INTO problem_tags (problem_id, tag_name) VALUES
-- Array / String tags
((SELECT id FROM problems WHERE problem_number = '001'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '001'), 'Hash Table'),
((SELECT id FROM problems WHERE problem_number = '003'), 'Sliding Window'),
((SELECT id FROM problems WHERE problem_number = '003'), 'String'),
((SELECT id FROM problems WHERE problem_number = '004'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '004'), 'Binary Search'),
((SELECT id FROM problems WHERE problem_number = '011'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '011'), 'Two Pointers'),
((SELECT id FROM problems WHERE problem_number = '015'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '015'), 'Two Pointers'),
((SELECT id FROM problems WHERE problem_number = '020'), 'String'),
((SELECT id FROM problems WHERE problem_number = '020'), 'Stack'),
((SELECT id FROM problems WHERE problem_number = '042'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '042'), 'Two Pointers'),
((SELECT id FROM problems WHERE problem_number = '076'), 'String'),
((SELECT id FROM problems WHERE problem_number = '076'), 'Sliding Window'),

-- Linked List tags
((SELECT id FROM problems WHERE problem_number = '002'), 'Linked List'),
((SELECT id FROM problems WHERE problem_number = '002'), 'Math'),
((SELECT id FROM problems WHERE problem_number = '019'), 'Linked List'),
((SELECT id FROM problems WHERE problem_number = '019'), 'Two Pointers'),
((SELECT id FROM problems WHERE problem_number = '021'), 'Linked List'),
((SELECT id FROM problems WHERE problem_number = '141'), 'Linked List'),
((SELECT id FROM problems WHERE problem_number = '141'), 'Two Pointers'),
((SELECT id FROM problems WHERE problem_number = '146'), 'Hash Table'),
((SELECT id FROM problems WHERE problem_number = '146'), 'Linked List'),
((SELECT id FROM problems WHERE problem_number = '146'), 'Design'),
((SELECT id FROM problems WHERE problem_number = '206'), 'Linked List'),

-- Dynamic Programming tags
((SELECT id FROM problems WHERE problem_number = '005'), 'String'),
((SELECT id FROM problems WHERE problem_number = '005'), 'Dynamic Programming'),
((SELECT id FROM problems WHERE problem_number = '010'), 'String'),
((SELECT id FROM problems WHERE problem_number = '010'), 'Dynamic Programming'),
((SELECT id FROM problems WHERE problem_number = '053'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '053'), 'Dynamic Programming'),
((SELECT id FROM problems WHERE problem_number = '070'), 'Math'),
((SELECT id FROM problems WHERE problem_number = '070'), 'Dynamic Programming'),
((SELECT id FROM problems WHERE problem_number = '322'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '322'), 'Dynamic Programming'),
((SELECT id FROM problems WHERE problem_number = '1143'), 'String'),
((SELECT id FROM problems WHERE problem_number = '1143'), 'Dynamic Programming'),
((SELECT id FROM problems WHERE problem_number = '300'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '300'), 'Dynamic Programming'),

-- Trees / Graphs tags
((SELECT id FROM problems WHERE problem_number = '094'), 'Tree'),
((SELECT id FROM problems WHERE problem_number = '098'), 'Tree'),
((SELECT id FROM problems WHERE problem_number = '098'), 'Depth-First Search'),
((SELECT id FROM problems WHERE problem_number = '102'), 'Tree'),
((SELECT id FROM problems WHERE problem_number = '102'), 'Breadth-First Search'),
((SELECT id FROM problems WHERE problem_number = '104'), 'Tree'),
((SELECT id FROM problems WHERE problem_number = '104'), 'Depth-First Search'),
((SELECT id FROM problems WHERE problem_number = '200'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '200'), 'Breadth-First Search'),
((SELECT id FROM problems WHERE problem_number = '200'), 'Matrix'),
((SELECT id FROM problems WHERE problem_number = '207'), 'Graph'),
((SELECT id FROM problems WHERE problem_number = '207'), 'Topological Sort'),
((SELECT id FROM problems WHERE problem_number = '236'), 'Tree'),

-- Backtracking tags
((SELECT id FROM problems WHERE problem_number = '017'), 'String'),
((SELECT id FROM problems WHERE problem_number = '017'), 'Backtracking'),
((SELECT id FROM problems WHERE problem_number = '022'), 'String'),
((SELECT id FROM problems WHERE problem_number = '022'), 'Backtracking'),
((SELECT id FROM problems WHERE problem_number = '039'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '039'), 'Backtracking'),
((SELECT id FROM problems WHERE problem_number = '046'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '046'), 'Backtracking'),
((SELECT id FROM problems WHERE problem_number = '051'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '051'), 'Backtracking'),

-- Greedy / Sorting tags
((SELECT id FROM problems WHERE problem_number = '055'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '055'), 'Greedy'),
((SELECT id FROM problems WHERE problem_number = '056'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '056'), 'Sorting'),
((SELECT id FROM problems WHERE problem_number = '121'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '121'), 'Dynamic Programming'),
((SELECT id FROM problems WHERE problem_number = '347'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '347'), 'Sorting'),
((SELECT id FROM problems WHERE problem_number = '347'), 'Heap (Priority Queue)'),

-- Math and Bit Manipulation
((SELECT id FROM problems WHERE problem_number = '007'), 'Math'),
((SELECT id FROM problems WHERE problem_number = '009'), 'Math'),
((SELECT id FROM problems WHERE problem_number = '136'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '136'), 'Bit Manipulation'),
((SELECT id FROM problems WHERE problem_number = '191'), 'Bit Manipulation'),
((SELECT id FROM problems WHERE problem_number = '191'), 'Divide and Conquer');
