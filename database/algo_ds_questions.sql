-- ═════════════════════════════════════════════════════════════
-- code.grind() Seed Data: Algorithms & Data Structures
-- Description: Inserts advanced DS/Algo problems (Array, Linked List, Tree, Graph)
-- ═════════════════════════════════════════════════════════════

INSERT OR IGNORE INTO problems (problem_number, title, slug, difficulty, acceptance_rate, category, description) VALUES
('1', 'Two Sum', 'two-sum', 'Easy', 50.2, 'Algorithms', 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.'),
('2', 'Add Two Numbers', 'add-two-numbers', 'Medium', 41.2, 'Algorithms', 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.'),
('3', 'Longest Substring Without Repeating Characters', 'longest-substring-without-repeating-characters', 'Medium', 33.8, 'Algorithms', 'Given a string `s`, find the length of the longest substring without repeating characters.'),
('4', 'Median of Two Sorted Arrays', 'median-of-two-sorted-arrays', 'Hard', 37.5, 'Algorithms', 'Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).'),
('5', 'Longest Palindromic Substring', 'longest-palindromic-substring', 'Medium', 32.4, 'Algorithms', 'Given a string `s`, return the longest palindromic substring in `s`.'),
('20', 'Valid Parentheses', 'valid-parentheses', 'Easy', 40.5, 'Algorithms', 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.'),
('21', 'Merge Two Sorted Lists', 'merge-two-sorted-lists', 'Easy', 63.2, 'Algorithms', 'Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.'),
('23', 'Merge k Sorted Lists', 'merge-k-sorted-lists', 'Hard', 50.1, 'Algorithms', 'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.'),
('42', 'Trapping Rain Water', 'trapping-rain-water', 'Hard', 59.5, 'Algorithms', 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.'),
('70', 'Climbing Stairs', 'climbing-stairs', 'Easy', 52.1, 'Algorithms', 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?'),
('94', 'Binary Tree Inorder Traversal', 'binary-tree-inorder-traversal', 'Easy', 74.2, 'Algorithms', 'Given the `root` of a binary tree, return the inorder traversal of its nodes values.'),
('98', 'Validate Binary Search Tree', 'validate-binary-search-tree', 'Medium', 32.1, 'Algorithms', 'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).'),
('102', 'Binary Tree Level Order Traversal', 'binary-tree-level-order-traversal', 'Medium', 65.4, 'Algorithms', 'Given the `root` of a binary tree, return the level order traversal of its nodes values. (i.e., from left to right, level by level).'),
('121', 'Best Time to Buy and Sell Stock', 'best-time-to-buy-and-sell-stock', 'Easy', 54.3, 'Algorithms', 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day. Return the maximum profit you can achieve from this transaction.'),
('141', 'Linked List Cycle', 'linked-list-cycle', 'Easy', 47.8, 'Algorithms', 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it.'),
('200', 'Number of Islands', 'number-of-islands', 'Medium', 57.2, 'Algorithms', 'Given an `m x n` 2D binary grid `grid` which represents a map of `1` (land) and `0` (water), return the number of islands.'),
('206', 'Reverse Linked List', 'reverse-linked-list', 'Easy', 74.5, 'Algorithms', 'Given the head of a singly linked list, reverse the list, and return the reversed list.'),
('215', 'Kth Largest Element in an Array', 'kth-largest-element-in-an-array', 'Medium', 66.8, 'Algorithms', 'Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array.'),
('236', 'Lowest Common Ancestor of a Binary Tree', 'lowest-common-ancestor-of-a-binary-tree', 'Medium', 59.1, 'Algorithms', 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.'),
('322', 'Coin Change', 'coin-change', 'Medium', 42.5, 'Algorithms', 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount.'),
('412', 'Fizz Buzz', 'fizz-buzz', 'Easy', 71.3, 'Algorithms', 'Given an integer `n`, return a string array `answer` (1-indexed) where `answer[i]` is a specific string according to the FizzBuzz rules.'),
('704', 'Binary Search', 'binary-search', 'Easy', 56.4, 'Algorithms', 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`.');

-- Tags for DS/Algorithms
INSERT OR IGNORE INTO problem_tags (problem_id, tag_name) VALUES
((SELECT id FROM problems WHERE problem_number = '1'), 'Array'),
((SELECT id FROM problems WHERE problem_number = '1'), 'Hash Table'),
((SELECT id FROM problems WHERE problem_number = '2'), 'Linked List'),
((SELECT id FROM problems WHERE problem_number = '2'), 'Math'),
((SELECT id FROM problems WHERE problem_number = '20'), 'Stack'),
((SELECT id FROM problems WHERE problem_number = '20'), 'String'),
((SELECT id FROM problems WHERE problem_number = '21'), 'Linked List'),
((SELECT id FROM problems WHERE problem_number = '21'), 'Recursion'),
((SELECT id FROM problems WHERE problem_number = '23'), 'Linked List'),
((SELECT id FROM problems WHERE problem_number = '23'), 'Heap'),
((SELECT id FROM problems WHERE problem_number = '42'), 'Two Pointers'),
((SELECT id FROM problems WHERE problem_number = '70'), 'Dynamic Programming'),
((SELECT id FROM problems WHERE problem_number = '94'), 'Tree'),
((SELECT id FROM problems WHERE problem_number = '94'), 'Stack'),
((SELECT id FROM problems WHERE problem_number = '98'), 'Tree'),
((SELECT id FROM problems WHERE problem_number = '98'), 'DFS'),
((SELECT id FROM problems WHERE problem_number = '102'), 'BFS'),
((SELECT id FROM problems WHERE problem_number = '141'), 'Linked List'),
((SELECT id FROM problems WHERE problem_number = '200'), 'Graph'),
((SELECT id FROM problems WHERE problem_number = '200'), 'Union Find'),
((SELECT id FROM problems WHERE problem_number = '215'), 'Quickselect'),
((SELECT id FROM problems WHERE problem_number = '236'), 'Tree'),
((SELECT id FROM problems WHERE problem_number = '322'), 'Dynamic Programming'),
((SELECT id FROM problems WHERE problem_number = '704'), 'Binary Search');
