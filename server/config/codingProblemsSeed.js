// 120 Real Coding Interview Problems Seed Dataset
// Covers: Arrays, Strings, HashMap, Linked List, Stack, Queue, Trees, BST, Heap,
// Graph, DFS, BFS, Dynamic Programming, Greedy, Backtracking, Sliding Window,
// Two Pointers, Binary Search, Recursion, Math, Bit Manipulation

const problems = [
  // ============================================================
  // ARRAYS (15 problems)
  // ============================================================
  {
    problemNumber: 1,
    title: 'Two Sum',
    slug: 'two-sum',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    difficulty: 'Easy',
    topic: 'Arrays',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Adobe', 'TCS', 'Infosys'],
    tags: ['Array', 'Hash Table'],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
    inputFormat: 'An array of integers nums and an integer target.',
    outputFormat: 'An array of two indices.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].' }
    ],
    functionSignature: {
      javascript: 'function twoSum(nums, target)',
      python: 'def twoSum(self, nums: List[int], target: int) -> List[int]:',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target)',
      java: 'public int[] twoSum(int[] nums, int target)',
      c: 'int* twoSum(int* nums, int numsSize, int target, int* returnSize)'
    },
    starterCode: {
      javascript: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    // Write your solution here\n    \n}\n\n// Read input\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconst nums = JSON.parse(input[0]);\nconst target = parseInt(input[1]);\nconsole.log(JSON.stringify(twoSum(nums, target)));',
      python: 'from typing import List\nimport json, sys\n\ndef twoSum(nums: List[int], target: int) -> List[int]:\n    # Write your solution here\n    pass\n\n# Read input\ndata = sys.stdin.read().strip().split("\\n")\nnums = json.loads(data[0])\ntarget = int(data[1])\nprint(json.dumps(twoSum(nums, target)))',
      cpp: '#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n    return {};\n}\n\nint main() {\n    // Input parsing handled by judge\n    return 0;\n}',
      java: 'import java.util.*;\n\npublic class Main {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Input parsing handled by judge\n    }\n}',
      c: '#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your solution here\n    *returnSize = 2;\n    int* result = (int*)malloc(2 * sizeof(int));\n    return result;\n}\n\nint main() {\n    // Input parsing handled by judge\n    return 0;\n}'
    },
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]', isHidden: false },
      { input: '[3,2,4]\n6', expectedOutput: '[1,2]', isHidden: false },
      { input: '[3,3]\n6', expectedOutput: '[0,1]', isHidden: false },
      { input: '[1,5,8,3,9,2]\n7', expectedOutput: '[1,5]', isHidden: true },
      { input: '[-1,-2,-3,-4,-5]\n-8', expectedOutput: '[2,4]', isHidden: true }
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'A brute force approach would check every pair of numbers. Can you do better?',
      'Use a hash map to store numbers you have seen so far.',
      'For each number, check if (target - number) exists in the hash map.'
    ],
    editorial: '## Approach: Hash Map\n\nWe iterate through the array once, maintaining a hash map that maps each value to its index.\n\nFor each element `nums[i]`, we compute `complement = target - nums[i]` and check if `complement` exists in the map.\n\n```javascript\nfunction twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}\n```\n\n**Time Complexity:** O(n) — single pass through array.\n**Space Complexity:** O(n) — hash map storage.'
  },
  {
    problemNumber: 2,
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    difficulty: 'Easy',
    topic: 'Arrays',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Goldman Sachs', 'TCS', 'Infosys'],
    tags: ['Array', 'Dynamic Programming'],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    inputFormat: 'An array of integers representing stock prices.',
    outputFormat: 'An integer representing maximum profit.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No transactions are done and the max profit = 0.' }
    ],
    functionSignature: { javascript: 'function maxProfit(prices)', python: 'def maxProfit(self, prices: List[int]) -> int:', cpp: 'int maxProfit(vector<int>& prices)', java: 'public int maxProfit(int[] prices)', c: 'int maxProfit(int* prices, int pricesSize)' },
    starterCode: {
      javascript: '/**\n * @param {number[]} prices\n * @return {number}\n */\nfunction maxProfit(prices) {\n    // Write your solution here\n    \n}\n\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconst prices = JSON.parse(input);\nconsole.log(maxProfit(prices));',
      python: 'from typing import List\nimport json, sys\n\ndef maxProfit(prices: List[int]) -> int:\n    # Write your solution here\n    pass\n\ndata = sys.stdin.read().strip()\nprices = json.loads(data)\nprint(maxProfit(prices))',
      cpp: '#include <iostream>\n#include <vector>\n#include <climits>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    // Write your solution here\n    return 0;\n}\n\nint main() {\n    return 0;\n}',
      java: 'import java.util.*;\n\npublic class Main {\n    public static int maxProfit(int[] prices) {\n        // Write your solution here\n        return 0;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n    }\n}',
      c: '#include <stdio.h>\n\nint maxProfit(int* prices, int pricesSize) {\n    // Write your solution here\n    return 0;\n}\n\nint main() { return 0; }'
    },
    testCases: [
      { input: '[7,1,5,3,6,4]', expectedOutput: '5', isHidden: false },
      { input: '[7,6,4,3,1]', expectedOutput: '0', isHidden: false },
      { input: '[2,4,1]', expectedOutput: '2', isHidden: false },
      { input: '[1,2]', expectedOutput: '1', isHidden: true },
      { input: '[2,1,2,1,0,1,2]', expectedOutput: '2', isHidden: true }
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Track the minimum price seen so far.', 'At each step, calculate profit if you sold today.', 'Keep updating the maximum profit.'],
    editorial: '## Approach: One Pass\n\nKeep track of minimum price and maximum profit.\n\n```javascript\nfunction maxProfit(prices) {\n    let minPrice = Infinity, maxProfit = 0;\n    for (const price of prices) {\n        minPrice = Math.min(minPrice, price);\n        maxProfit = Math.max(maxProfit, price - minPrice);\n    }\n    return maxProfit;\n}\n```\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 3,
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    difficulty: 'Easy',
    topic: 'Arrays',
    companies: ['Amazon', 'Google', 'Apple', 'Adobe', 'TCS', 'Wipro'],
    tags: ['Array', 'Hash Table', 'Sorting'],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    inputFormat: 'An array of integers.',
    outputFormat: 'true or false.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true', explanation: 'Element 1 appears twice.' },
      { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'All elements are distinct.' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true', explanation: 'Multiple duplicates exist.' }
    ],
    functionSignature: { javascript: 'function containsDuplicate(nums)', python: 'def containsDuplicate(self, nums: List[int]) -> bool:', cpp: 'bool containsDuplicate(vector<int>& nums)', java: 'public boolean containsDuplicate(int[] nums)', c: 'bool containsDuplicate(int* nums, int numsSize)' },
    starterCode: {
      javascript: 'function containsDuplicate(nums) {\n    // Write your solution here\n    \n}\n\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(containsDuplicate(JSON.parse(input)));',
      python: 'import json, sys\ndef containsDuplicate(nums):\n    # Write your solution here\n    pass\n\ndata = sys.stdin.read().strip()\nprint(str(containsDuplicate(json.loads(data))).lower())',
      cpp: '#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\nbool containsDuplicate(vector<int>& nums) {\n    // Write your solution here\n    return false;\n}\nint main() { return 0; }',
      java: 'import java.util.*;\npublic class Main {\n    public static boolean containsDuplicate(int[] nums) {\n        // Write your solution here\n        return false;\n    }\n    public static void main(String[] args) {}\n}',
      c: '#include <stdio.h>\n#include <stdbool.h>\nbool containsDuplicate(int* nums, int numsSize) {\n    // Write your solution here\n    return false;\n}\nint main() { return 0; }'
    },
    testCases: [
      { input: '[1,2,3,1]', expectedOutput: 'true', isHidden: false },
      { input: '[1,2,3,4]', expectedOutput: 'false', isHidden: false },
      { input: '[1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'true', isHidden: true },
      { input: '[0]', expectedOutput: 'false', isHidden: true }
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: ['Use a Set to track seen elements.', 'If an element is already in the set, return true.'],
    editorial: '## Approach: Hash Set\n\n```javascript\nfunction containsDuplicate(nums) {\n    return new Set(nums).size !== nums.length;\n}\n```\n\n**Time:** O(n), **Space:** O(n)'
  },
  {
    problemNumber: 4,
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.',
    difficulty: 'Medium',
    topic: 'Arrays',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Uber'],
    tags: ['Array', 'Prefix Sum'],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'Product of any prefix/suffix fits in 32-bit integer'],
    inputFormat: 'An array of integers.',
    outputFormat: 'An array of integers.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: 'For index 0: 2*3*4=24, index 1: 1*3*4=12, etc.' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]', explanation: 'Product except self for each position.' }
    ],
    functionSignature: { javascript: 'function productExceptSelf(nums)', python: 'def productExceptSelf(self, nums: List[int]) -> List[int]:', cpp: 'vector<int> productExceptSelf(vector<int>& nums)', java: 'public int[] productExceptSelf(int[] nums)', c: 'int* productExceptSelf(int* nums, int numsSize, int* returnSize)' },
    starterCode: {
      javascript: 'function productExceptSelf(nums) {\n    // Write your solution here\n    \n}\n\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(JSON.stringify(productExceptSelf(JSON.parse(input))));',
      python: 'import json, sys\ndef productExceptSelf(nums):\n    # Write your solution here\n    pass\ndata = sys.stdin.read().strip()\nprint(json.dumps(productExceptSelf(json.loads(data))))',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nvector<int> productExceptSelf(vector<int>& nums) {\n    // Write your solution here\n    return {};\n}\nint main() { return 0; }',
      java: 'import java.util.*;\npublic class Main {\n    public static int[] productExceptSelf(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n    public static void main(String[] args) {}\n}',
      c: '#include <stdio.h>\n#include <stdlib.h>\nint* productExceptSelf(int* nums, int numsSize, int* returnSize) {\n    *returnSize = numsSize;\n    int* result = (int*)malloc(numsSize * sizeof(int));\n    return result;\n}\nint main() { return 0; }'
    },
    testCases: [
      { input: '[1,2,3,4]', expectedOutput: '[24,12,8,6]', isHidden: false },
      { input: '[-1,1,0,-3,3]', expectedOutput: '[0,0,9,0,0]', isHidden: false },
      { input: '[2,3]', expectedOutput: '[3,2]', isHidden: true },
      { input: '[1,1,1,1]', expectedOutput: '[1,1,1,1]', isHidden: true }
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) (excluding output)',
    hints: ['Think about prefix and suffix products.', 'Can you compute it in two passes?', 'First pass: left products. Second pass: multiply by right products.'],
    editorial: '## Approach: Prefix & Suffix\n\n```javascript\nfunction productExceptSelf(nums) {\n    const n = nums.length;\n    const answer = new Array(n).fill(1);\n    let left = 1;\n    for (let i = 0; i < n; i++) {\n        answer[i] = left;\n        left *= nums[i];\n    }\n    let right = 1;\n    for (let i = n - 1; i >= 0; i--) {\n        answer[i] *= right;\n        right *= nums[i];\n    }\n    return answer;\n}\n```\n\n**Time:** O(n), **Space:** O(1) extra'
  },
  {
    problemNumber: 5,
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    difficulty: 'Medium',
    topic: 'Arrays',
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Adobe', 'TCS', 'Wipro', 'Infosys'],
    tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    inputFormat: 'An array of integers.',
    outputFormat: 'An integer (maximum subarray sum).',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum = 6.' },
      { input: 'nums = [1]', output: '1', explanation: 'Single element.' },
      { input: 'nums = [5,4,-1,7,8]', output: '23', explanation: 'The entire array has the largest sum.' }
    ],
    functionSignature: { javascript: 'function maxSubArray(nums)', python: 'def maxSubArray(self, nums: List[int]) -> int:', cpp: 'int maxSubArray(vector<int>& nums)', java: 'public int maxSubArray(int[] nums)', c: 'int maxSubArray(int* nums, int numsSize)' },
    starterCode: {
      javascript: 'function maxSubArray(nums) {\n    // Write your solution here\n    \n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(maxSubArray(JSON.parse(input)));',
      python: 'import json, sys\ndef maxSubArray(nums):\n    pass\ndata = sys.stdin.read().strip()\nprint(maxSubArray(json.loads(data)))',
      cpp: '#include <iostream>\n#include <vector>\n#include <climits>\nusing namespace std;\nint maxSubArray(vector<int>& nums) { return 0; }\nint main() { return 0; }',
      java: 'import java.util.*;\npublic class Main {\n    public static int maxSubArray(int[] nums) { return 0; }\n    public static void main(String[] args) {}\n}',
      c: '#include <stdio.h>\nint maxSubArray(int* nums, int numsSize) { return 0; }\nint main() { return 0; }'
    },
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', isHidden: false },
      { input: '[1]', expectedOutput: '1', isHidden: false },
      { input: '[5,4,-1,7,8]', expectedOutput: '23', isHidden: false },
      { input: '[-1]', expectedOutput: '-1', isHidden: true },
      { input: '[-2,-1]', expectedOutput: '-1', isHidden: true }
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Kadane\'s Algorithm: track current sum and max sum.', 'If current sum goes negative, reset it to 0.'],
    editorial: '## Kadane\'s Algorithm\n\n```javascript\nfunction maxSubArray(nums) {\n    let maxSum = nums[0], currentSum = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        currentSum = Math.max(nums[i], currentSum + nums[i]);\n        maxSum = Math.max(maxSum, currentSum);\n    }\n    return maxSum;\n}\n```\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 6,
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    description: 'You are given an integer array `height` of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.',
    difficulty: 'Medium',
    topic: 'Arrays',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Adobe'],
    tags: ['Array', 'Two Pointers', 'Greedy'],
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    inputFormat: 'An array of non-negative integers.',
    outputFormat: 'An integer.',
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Lines at index 1 and 8 form container with area min(8,7)*7 = 49.' },
      { input: 'height = [1,1]', output: '1', explanation: 'Only two lines, area = 1.' }
    ],
    functionSignature: { javascript: 'function maxArea(height)', python: 'def maxArea(self, height: List[int]) -> int:', cpp: 'int maxArea(vector<int>& height)', java: 'public int maxArea(int[] height)', c: 'int maxArea(int* height, int heightSize)' },
    starterCode: {
      javascript: 'function maxArea(height) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(maxArea(JSON.parse(input)));',
      python: 'import json, sys\ndef maxArea(height):\n    pass\ndata = sys.stdin.read().strip()\nprint(maxArea(json.loads(data)))',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint maxArea(vector<int>& height) { return 0; }\nint main() { return 0; }',
      java: 'import java.util.*;\npublic class Main {\n    public static int maxArea(int[] height) { return 0; }\n    public static void main(String[] args) {}\n}',
      c: '#include <stdio.h>\nint maxArea(int* height, int heightSize) { return 0; }\nint main() { return 0; }'
    },
    testCases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49', isHidden: false },
      { input: '[1,1]', expectedOutput: '1', isHidden: false },
      { input: '[4,3,2,1,4]', expectedOutput: '16', isHidden: true },
      { input: '[1,2,1]', expectedOutput: '2', isHidden: true }
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Use two pointers starting from both ends.', 'Move the pointer with the shorter line inward.'],
    editorial: '## Two Pointers\n\n```javascript\nfunction maxArea(height) {\n    let left = 0, right = height.length - 1, max = 0;\n    while (left < right) {\n        max = Math.max(max, Math.min(height[left], height[right]) * (right - left));\n        if (height[left] < height[right]) left++;\n        else right--;\n    }\n    return max;\n}\n```\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 7,
    title: '3Sum',
    slug: '3sum',
    description: 'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.',
    difficulty: 'Medium',
    topic: 'Arrays',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Adobe', 'Uber'],
    tags: ['Array', 'Two Pointers', 'Sorting'],
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    inputFormat: 'An array of integers.',
    outputFormat: 'A 2D array of triplets.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'The distinct triplets that sum to zero.' },
      { input: 'nums = [0,1,1]', output: '[]', explanation: 'No triplets sum to zero.' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]', explanation: 'Three zeros sum to zero.' }
    ],
    functionSignature: { javascript: 'function threeSum(nums)', python: 'def threeSum(self, nums: List[int]) -> List[List[int]]:', cpp: 'vector<vector<int>> threeSum(vector<int>& nums)', java: 'public List<List<Integer>> threeSum(int[] nums)', c: 'int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes)' },
    starterCode: {
      javascript: 'function threeSum(nums) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(JSON.stringify(threeSum(JSON.parse(input))));',
      python: 'import json, sys\ndef threeSum(nums):\n    pass\ndata = sys.stdin.read().strip()\nprint(json.dumps(threeSum(json.loads(data))))',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nvector<vector<int>> threeSum(vector<int>& nums) { return {}; }\nint main() { return 0; }',
      java: 'import java.util.*;\npublic class Main {\n    public static List<List<Integer>> threeSum(int[] nums) { return new ArrayList<>(); }\n    public static void main(String[] args) {}\n}',
      c: '#include <stdio.h>\nint main() { return 0; }'
    },
    testCases: [
      { input: '[-1,0,1,2,-1,-4]', expectedOutput: '[[-1,-1,2],[-1,0,1]]', isHidden: false },
      { input: '[0,1,1]', expectedOutput: '[]', isHidden: false },
      { input: '[0,0,0]', expectedOutput: '[[0,0,0]]', isHidden: true }
    ],
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1) extra',
    hints: ['Sort the array first.', 'Fix one element and use two pointers for the remaining.', 'Skip duplicates to avoid duplicate triplets.'],
    editorial: '## Sort + Two Pointers\n\nSort, then for each i, use two pointers on [i+1, n-1] to find pairs summing to -nums[i].\n\n**Time:** O(n²), **Space:** O(1) extra'
  },
  {
    problemNumber: 8,
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    description: 'Given an array of intervals where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    difficulty: 'Medium',
    topic: 'Arrays',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Uber', 'Atlassian'],
    tags: ['Array', 'Sorting'],
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= starti <= endi <= 10^4'],
    inputFormat: 'A 2D array of intervals.',
    outputFormat: 'A 2D array of merged intervals.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: '[1,3] and [2,6] overlap, merge to [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]', explanation: 'Intervals [1,4] and [4,5] are considered overlapping.' }
    ],
    functionSignature: { javascript: 'function merge(intervals)', python: 'def merge(self, intervals: List[List[int]]) -> List[List[int]]:', cpp: 'vector<vector<int>> merge(vector<vector<int>>& intervals)', java: 'public int[][] merge(int[][] intervals)', c: 'int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes)' },
    starterCode: { javascript: 'function merge(intervals) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(JSON.stringify(merge(JSON.parse(input))));', python: 'import json, sys\ndef merge(intervals):\n    pass\ndata = sys.stdin.read().strip()\nprint(json.dumps(merge(json.loads(data))))', cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nvector<vector<int>> merge(vector<vector<int>>& intervals) { return {}; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int[][] merge(int[][] intervals) { return new int[][]{}; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint main() { return 0; }' },
    testCases: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]', isHidden: false },
      { input: '[[1,4],[4,5]]', expectedOutput: '[[1,5]]', isHidden: false },
      { input: '[[1,4],[0,4]]', expectedOutput: '[[0,4]]', isHidden: true }
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    hints: ['Sort by start time.', 'Compare current interval\'s start with the last merged interval\'s end.'],
    editorial: '## Sort and Merge\n\nSort intervals by start. Iterate and merge overlapping ones.\n\n**Time:** O(n log n), **Space:** O(n)'
  },
  {
    problemNumber: 9,
    title: 'Rotate Array',
    slug: 'rotate-array',
    description: 'Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.',
    difficulty: 'Medium',
    topic: 'Arrays',
    companies: ['Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Capgemini'],
    tags: ['Array', 'Math'],
    constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1', '0 <= k <= 10^5'],
    inputFormat: 'An array of integers and an integer k.',
    outputFormat: 'The rotated array.',
    examples: [
      { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]', explanation: 'Rotate right by 3 steps.' },
      { input: 'nums = [-1,-100,3,99], k = 2', output: '[3,99,-1,-100]', explanation: 'Rotate right by 2 steps.' }
    ],
    functionSignature: { javascript: 'function rotate(nums, k)', python: 'def rotate(self, nums: List[int], k: int) -> None:', cpp: 'void rotate(vector<int>& nums, int k)', java: 'public void rotate(int[] nums, int k)', c: 'void rotate(int* nums, int numsSize, int k)' },
    starterCode: { javascript: 'function rotate(nums, k) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconst nums = JSON.parse(input[0]);\nconst k = parseInt(input[1]);\nrotate(nums, k);\nconsole.log(JSON.stringify(nums));', python: 'import json, sys\ndef rotate(nums, k):\n    pass\ndata = sys.stdin.read().strip().split("\\n")\nnums = json.loads(data[0])\nk = int(data[1])\nrotate(nums, k)\nprint(json.dumps(nums))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nvoid rotate(vector<int>& nums, int k) {}\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static void rotate(int[] nums, int k) {}\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nvoid rotate(int* nums, int numsSize, int k) {}\nint main() { return 0; }' },
    testCases: [
      { input: '[1,2,3,4,5,6,7]\n3', expectedOutput: '[5,6,7,1,2,3,4]', isHidden: false },
      { input: '[-1,-100,3,99]\n2', expectedOutput: '[3,99,-1,-100]', isHidden: false },
      { input: '[1,2]\n3', expectedOutput: '[2,1]', isHidden: true }
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Use the reverse trick: reverse whole, reverse first k, reverse rest.'],
    editorial: '## Reverse Approach\n\nReverse entire array, then reverse first k elements, then reverse remaining.\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 10,
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-in-rotated-sorted-array',
    description: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array `nums` of unique elements, return the minimum element.',
    difficulty: 'Medium',
    topic: 'Arrays',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    tags: ['Array', 'Binary Search'],
    constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All values are unique.'],
    inputFormat: 'A rotated sorted array of unique integers.',
    outputFormat: 'The minimum element.',
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'Original sorted [1,2,3,4,5] rotated 3 times.' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0', explanation: 'Minimum is 0.' },
      { input: 'nums = [11,13,15,17]', output: '11', explanation: 'Not rotated, minimum is first element.' }
    ],
    functionSignature: { javascript: 'function findMin(nums)', python: 'def findMin(self, nums: List[int]) -> int:', cpp: 'int findMin(vector<int>& nums)', java: 'public int findMin(int[] nums)', c: 'int findMin(int* nums, int numsSize)' },
    starterCode: { javascript: 'function findMin(nums) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(findMin(JSON.parse(input)));', python: 'import json, sys\ndef findMin(nums):\n    pass\ndata = sys.stdin.read().strip()\nprint(findMin(json.loads(data)))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint findMin(vector<int>& nums) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int findMin(int[] nums) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint findMin(int* nums, int numsSize) { return 0; }\nint main() { return 0; }' },
    testCases: [
      { input: '[3,4,5,1,2]', expectedOutput: '1', isHidden: false },
      { input: '[4,5,6,7,0,1,2]', expectedOutput: '0', isHidden: false },
      { input: '[11,13,15,17]', expectedOutput: '11', isHidden: true },
      { input: '[2,1]', expectedOutput: '1', isHidden: true }
    ],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    hints: ['Use binary search.', 'Compare mid with right to determine which half is sorted.'],
    editorial: '## Binary Search\n\nCompare `nums[mid]` with `nums[right]`. If `nums[mid] > nums[right]`, min is in right half.\n\n**Time:** O(log n), **Space:** O(1)'
  },
  {
    problemNumber: 11,
    title: 'Move Zeroes',
    slug: 'move-zeroes',
    description: 'Given an integer array `nums`, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements. Do this in-place.',
    difficulty: 'Easy',
    topic: 'Arrays',
    companies: ['Meta', 'Amazon', 'Apple', 'TCS', 'Wipro', 'Capgemini'],
    tags: ['Array', 'Two Pointers'],
    constraints: ['1 <= nums.length <= 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
    inputFormat: 'An array of integers.', outputFormat: 'The modified array with zeroes moved to end.',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]', explanation: 'Non-zero elements maintain order.' },
      { input: 'nums = [0]', output: '[0]', explanation: 'Single zero stays.' }
    ],
    functionSignature: { javascript: 'function moveZeroes(nums)', python: 'def moveZeroes(self, nums: List[int]) -> None:', cpp: 'void moveZeroes(vector<int>& nums)', java: 'public void moveZeroes(int[] nums)', c: 'void moveZeroes(int* nums, int numsSize)' },
    starterCode: { javascript: 'function moveZeroes(nums) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconst nums = JSON.parse(input);\nmoveZeroes(nums);\nconsole.log(JSON.stringify(nums));', python: 'import json, sys\ndef moveZeroes(nums):\n    pass\ndata = sys.stdin.read().strip()\nnums = json.loads(data)\nmoveZeroes(nums)\nprint(json.dumps(nums))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nvoid moveZeroes(vector<int>& nums) {}\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static void moveZeroes(int[] nums) {}\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nvoid moveZeroes(int* nums, int numsSize) {}\nint main() { return 0; }' },
    testCases: [ { input: '[0,1,0,3,12]', expectedOutput: '[1,3,12,0,0]', isHidden: false }, { input: '[0]', expectedOutput: '[0]', isHidden: false }, { input: '[1,0,0,0,5]', expectedOutput: '[1,5,0,0,0]', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    hints: ['Use two pointers — one for iterating, one for placing non-zero elements.'],
    editorial: '## Two Pointers\n\nPlace all non-zero elements at the front, fill remaining with zeros.\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 12,
    title: 'Sort Colors',
    slug: 'sort-colors',
    description: 'Given an array `nums` with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. Use integers 0, 1, and 2 to represent red, white, and blue.',
    difficulty: 'Medium',
    topic: 'Arrays',
    companies: ['Amazon', 'Microsoft', 'Adobe', 'TCS', 'Infosys'],
    tags: ['Array', 'Two Pointers', 'Sorting'],
    constraints: ['n == nums.length', '1 <= n <= 300', 'nums[i] is 0, 1, or 2.'],
    inputFormat: 'An array of 0s, 1s, and 2s.', outputFormat: 'Sorted array.',
    examples: [
      { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]', explanation: 'Dutch National Flag sort.' },
      { input: 'nums = [2,0,1]', output: '[0,1,2]', explanation: 'One of each color.' }
    ],
    functionSignature: { javascript: 'function sortColors(nums)', python: 'def sortColors(self, nums: List[int]) -> None:', cpp: 'void sortColors(vector<int>& nums)', java: 'public void sortColors(int[] nums)', c: 'void sortColors(int* nums, int numsSize)' },
    starterCode: { javascript: 'function sortColors(nums) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconst nums = JSON.parse(input);\nsortColors(nums);\nconsole.log(JSON.stringify(nums));', python: 'import json, sys\ndef sortColors(nums):\n    pass\ndata = sys.stdin.read().strip()\nnums = json.loads(data)\nsortColors(nums)\nprint(json.dumps(nums))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nvoid sortColors(vector<int>& nums) {}\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static void sortColors(int[] nums) {}\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nvoid sortColors(int* nums, int numsSize) {}\nint main() { return 0; }' },
    testCases: [ { input: '[2,0,2,1,1,0]', expectedOutput: '[0,0,1,1,2,2]', isHidden: false }, { input: '[2,0,1]', expectedOutput: '[0,1,2]', isHidden: false }, { input: '[0]', expectedOutput: '[0]', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    hints: ['Dutch National Flag algorithm uses three pointers.'],
    editorial: '## Dutch National Flag\n\nThree pointers: low, mid, high. Swap elements based on value.\n\n**Time:** O(n), **Space:** O(1)'
  },

  // ============================================================
  // STRINGS (10 problems)
  // ============================================================
  {
    problemNumber: 13,
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    description: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.',
    difficulty: 'Easy', topic: 'Strings',
    companies: ['Amazon', 'Google', 'Microsoft', 'TCS', 'Infosys'],
    tags: ['Hash Table', 'String', 'Sorting'],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    inputFormat: 'Two strings s and t.', outputFormat: 'true or false.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Both have same characters.' },
      { input: 's = "rat", t = "car"', output: 'false', explanation: 'Different character frequencies.' }
    ],
    functionSignature: { javascript: 'function isAnagram(s, t)', python: 'def isAnagram(self, s: str, t: str) -> bool:', cpp: 'bool isAnagram(string s, string t)', java: 'public boolean isAnagram(String s, String t)', c: 'bool isAnagram(char* s, char* t)' },
    starterCode: { javascript: 'function isAnagram(s, t) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconsole.log(isAnagram(input[0], input[1]));', python: 'import sys\ndef isAnagram(s, t):\n    pass\ndata = sys.stdin.read().strip().split("\\n")\nprint(str(isAnagram(data[0], data[1])).lower())', cpp: '#include <iostream>\n#include <string>\nusing namespace std;\nbool isAnagram(string s, string t) { return false; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static boolean isAnagram(String s, String t) { return false; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\n#include <stdbool.h>\nbool isAnagram(char* s, char* t) { return false; }\nint main() { return 0; }' },
    testCases: [ { input: 'anagram\nnagaram', expectedOutput: 'true', isHidden: false }, { input: 'rat\ncar', expectedOutput: 'false', isHidden: false }, { input: 'a\na', expectedOutput: 'true', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    hints: ['Count character frequencies in both strings.'],
    editorial: '## Frequency Count\n\nUse a 26-element array to count characters. Compare counts.\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 14,
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium', topic: 'Strings',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Adobe', 'Netflix'],
    tags: ['Hash Table', 'String', 'Sliding Window'],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    inputFormat: 'A string s.', outputFormat: 'An integer.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with length 3.' }
    ],
    functionSignature: { javascript: 'function lengthOfLongestSubstring(s)', python: 'def lengthOfLongestSubstring(self, s: str) -> int:', cpp: 'int lengthOfLongestSubstring(string s)', java: 'public int lengthOfLongestSubstring(String s)', c: 'int lengthOfLongestSubstring(char* s)' },
    starterCode: { javascript: 'function lengthOfLongestSubstring(s) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(lengthOfLongestSubstring(input));', python: 'import sys\ndef lengthOfLongestSubstring(s):\n    pass\ndata = sys.stdin.read().strip()\nprint(lengthOfLongestSubstring(data))', cpp: '#include <iostream>\n#include <string>\n#include <unordered_map>\nusing namespace std;\nint lengthOfLongestSubstring(string s) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int lengthOfLongestSubstring(String s) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint lengthOfLongestSubstring(char* s) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: 'abcabcbb', expectedOutput: '3', isHidden: false }, { input: 'bbbbb', expectedOutput: '1', isHidden: false }, { input: 'pwwkew', expectedOutput: '3', isHidden: false }, { input: '', expectedOutput: '0', isHidden: true }, { input: ' ', expectedOutput: '1', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(min(m, n))',
    hints: ['Use sliding window with a set or map.', 'Expand right, shrink left when duplicate found.'],
    editorial: '## Sliding Window\n\nUse a set to track characters in current window. Expand right, remove left on duplicate.\n\n**Time:** O(n), **Space:** O(min(m, n))'
  },
  {
    problemNumber: 15, title: 'Valid Palindrome', slug: 'valid-palindrome',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    difficulty: 'Easy', topic: 'Strings', companies: ['Meta', 'Microsoft', 'TCS', 'Wipro'], tags: ['Two Pointers', 'String'],
    constraints: ['1 <= s.length <= 2 * 10^5'], inputFormat: 'A string.', outputFormat: 'true or false.',
    examples: [ { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: 'After cleaning: "amanaplanacanalpanama" is a palindrome.' }, { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' } ],
    functionSignature: { javascript: 'function isPalindrome(s)', python: 'def isPalindrome(self, s: str) -> bool:', cpp: 'bool isPalindrome(string s)', java: 'public boolean isPalindrome(String s)', c: 'bool isPalindrome(char* s)' },
    starterCode: { javascript: 'function isPalindrome(s) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(isPalindrome(input));', python: 'import sys\ndef isPalindrome(s):\n    pass\ndata = sys.stdin.read().strip()\nprint(str(isPalindrome(data)).lower())', cpp: '#include <iostream>\n#include <string>\nusing namespace std;\nbool isPalindrome(string s) { return false; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static boolean isPalindrome(String s) { return false; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\n#include <stdbool.h>\nbool isPalindrome(char* s) { return false; }\nint main() { return 0; }' },
    testCases: [ { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true', isHidden: false }, { input: 'race a car', expectedOutput: 'false', isHidden: false }, { input: ' ', expectedOutput: 'true', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['Use two pointers from both ends, skip non-alphanumeric.'], editorial: '## Two Pointers\n\nSkip non-alphanumeric, compare characters from both ends.\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 16, title: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring',
    description: 'Given a string `s`, return the longest palindromic substring in `s`.',
    difficulty: 'Medium', topic: 'Strings', companies: ['Amazon', 'Google', 'Microsoft', 'Adobe'], tags: ['String', 'Dynamic Programming'],
    constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters.'], inputFormat: 'A string.', outputFormat: 'The longest palindromic substring.',
    examples: [ { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' }, { input: 's = "cbbd"', output: '"bb"', explanation: 'Longest palindrome is "bb".' } ],
    functionSignature: { javascript: 'function longestPalindrome(s)', python: 'def longestPalindrome(self, s: str) -> str:', cpp: 'string longestPalindrome(string s)', java: 'public String longestPalindrome(String s)', c: 'char* longestPalindrome(char* s)' },
    starterCode: { javascript: 'function longestPalindrome(s) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(longestPalindrome(input));', python: 'import sys\ndef longestPalindrome(s):\n    pass\ndata = sys.stdin.read().strip()\nprint(longestPalindrome(data))', cpp: '#include <iostream>\n#include <string>\nusing namespace std;\nstring longestPalindrome(string s) { return ""; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static String longestPalindrome(String s) { return ""; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nchar* longestPalindrome(char* s) { return s; }\nint main() { return 0; }' },
    testCases: [ { input: 'babad', expectedOutput: 'bab', isHidden: false }, { input: 'cbbd', expectedOutput: 'bb', isHidden: false }, { input: 'a', expectedOutput: 'a', isHidden: true } ],
    timeComplexity: 'O(n²)', spaceComplexity: 'O(1)', hints: ['Expand around center for each character.', 'Check both odd and even length palindromes.'],
    editorial: '## Expand Around Center\n\nFor each index, expand outward checking both odd and even palindromes.\n\n**Time:** O(n²), **Space:** O(1)'
  },
  {
    problemNumber: 17, title: 'Group Anagrams', slug: 'group-anagrams',
    description: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.',
    difficulty: 'Medium', topic: 'Strings', companies: ['Amazon', 'Google', 'Meta', 'Uber'], tags: ['Hash Table', 'String', 'Sorting'],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'], inputFormat: 'An array of strings.', outputFormat: 'A 2D array of grouped anagrams.',
    examples: [ { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: 'Groups of anagrams.' }, { input: 'strs = [""]', output: '[[""]]', explanation: 'Single empty string.' } ],
    functionSignature: { javascript: 'function groupAnagrams(strs)', python: 'def groupAnagrams(self, strs: List[str]) -> List[List[str]]:', cpp: 'vector<vector<string>> groupAnagrams(vector<string>& strs)', java: 'public List<List<String>> groupAnagrams(String[] strs)', c: 'char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes)' },
    starterCode: { javascript: 'function groupAnagrams(strs) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(JSON.stringify(groupAnagrams(JSON.parse(input))));', python: 'import json, sys\ndef groupAnagrams(strs):\n    pass\ndata = sys.stdin.read().strip()\nprint(json.dumps(groupAnagrams(json.loads(data))))', cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nvector<vector<string>> groupAnagrams(vector<string>& strs) { return {}; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static List<List<String>> groupAnagrams(String[] strs) { return new ArrayList<>(); }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint main() { return 0; }' },
    testCases: [ { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]', isHidden: false }, { input: '[""]', expectedOutput: '[[""]]', isHidden: false }, { input: '["a"]', expectedOutput: '[["a"]]', isHidden: true } ],
    timeComplexity: 'O(n * k log k)', spaceComplexity: 'O(n * k)', hints: ['Sort each string and use as key in a hash map.'],
    editorial: '## Sort + Hash Map\n\nSort each string as key, group by key.\n\n**Time:** O(n * k log k), **Space:** O(n * k)'
  },
  {
    problemNumber: 18, title: 'String to Integer (atoi)', slug: 'string-to-integer-atoi',
    description: 'Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.',
    difficulty: 'Medium', topic: 'Strings', companies: ['Amazon', 'Microsoft', 'Apple', 'TCS'], tags: ['String'],
    constraints: ['0 <= s.length <= 200', 's consists of English letters, digits, spaces, +, -, .'], inputFormat: 'A string.', outputFormat: 'A 32-bit signed integer.',
    examples: [ { input: 's = "42"', output: '42', explanation: 'Straightforward conversion.' }, { input: 's = "   -42"', output: '-42', explanation: 'Leading whitespace ignored, negative sign.' }, { input: 's = "4193 with words"', output: '4193', explanation: 'Reading stops at non-digit.' } ],
    functionSignature: { javascript: 'function myAtoi(s)', python: 'def myAtoi(self, s: str) -> int:', cpp: 'int myAtoi(string s)', java: 'public int myAtoi(String s)', c: 'int myAtoi(char* s)' },
    starterCode: { javascript: 'function myAtoi(s) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(myAtoi(input));', python: 'import sys\ndef myAtoi(s):\n    pass\ndata = sys.stdin.read().strip()\nprint(myAtoi(data))', cpp: '#include <iostream>\n#include <string>\nusing namespace std;\nint myAtoi(string s) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int myAtoi(String s) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint myAtoi(char* s) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '42', expectedOutput: '42', isHidden: false }, { input: '   -42', expectedOutput: '-42', isHidden: false }, { input: '4193 with words', expectedOutput: '4193', isHidden: false }, { input: 'words and 987', expectedOutput: '0', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['Handle whitespace, sign, digits, overflow.'],
    editorial: '## Step by Step\n\nSkip whitespace → check sign → read digits → clamp to INT range.\n\n**Time:** O(n), **Space:** O(1)'
  },

  // ============================================================
  // HASHMAP (8 problems)
  // ============================================================
  {
    problemNumber: 19, title: 'Subarray Sum Equals K', slug: 'subarray-sum-equals-k',
    description: 'Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.',
    difficulty: 'Medium', topic: 'HashMap', companies: ['Google', 'Meta', 'Amazon', 'Microsoft'], tags: ['Array', 'Hash Table', 'Prefix Sum'],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'], inputFormat: 'An array and target k.', outputFormat: 'Number of subarrays.',
    examples: [ { input: 'nums = [1,1,1], k = 2', output: '2', explanation: 'Subarrays [1,1] at index 0-1 and 1-2.' }, { input: 'nums = [1,2,3], k = 3', output: '2', explanation: '[1,2] and [3].' } ],
    functionSignature: { javascript: 'function subarraySum(nums, k)', python: 'def subarraySum(self, nums: List[int], k: int) -> int:', cpp: 'int subarraySum(vector<int>& nums, int k)', java: 'public int subarraySum(int[] nums, int k)', c: 'int subarraySum(int* nums, int numsSize, int k)' },
    starterCode: { javascript: 'function subarraySum(nums, k) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconsole.log(subarraySum(JSON.parse(input[0]), parseInt(input[1])));', python: 'import json, sys\ndef subarraySum(nums, k):\n    pass\ndata = sys.stdin.read().strip().split("\\n")\nprint(subarraySum(json.loads(data[0]), int(data[1])))', cpp: '#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\nint subarraySum(vector<int>& nums, int k) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int subarraySum(int[] nums, int k) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint subarraySum(int* nums, int numsSize, int k) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '[1,1,1]\n2', expectedOutput: '2', isHidden: false }, { input: '[1,2,3]\n3', expectedOutput: '2', isHidden: false }, { input: '[1,-1,0]\n0', expectedOutput: '3', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)', hints: ['Use prefix sum with hash map.', 'Track count of each prefix sum seen.'],
    editorial: '## Prefix Sum + Hash Map\n\nStore prefix sum frequencies. For each element, check if (prefixSum - k) exists.\n\n**Time:** O(n), **Space:** O(n)'
  },
  {
    problemNumber: 20, title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements',
    description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
    difficulty: 'Medium', topic: 'HashMap', companies: ['Amazon', 'Google', 'Meta', 'Apple'], tags: ['Array', 'Hash Table', 'Heap', 'Bucket Sort'],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in the range [1, number of unique elements]'], inputFormat: 'Array and integer k.', outputFormat: 'Array of k most frequent elements.',
    examples: [ { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]', explanation: '1 appears 3 times, 2 appears 2 times.' }, { input: 'nums = [1], k = 1', output: '[1]', explanation: 'Only one element.' } ],
    functionSignature: { javascript: 'function topKFrequent(nums, k)', python: 'def topKFrequent(self, nums: List[int], k: int) -> List[int]:', cpp: 'vector<int> topKFrequent(vector<int>& nums, int k)', java: 'public int[] topKFrequent(int[] nums, int k)', c: 'int* topKFrequent(int* nums, int numsSize, int k, int* returnSize)' },
    starterCode: { javascript: 'function topKFrequent(nums, k) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconsole.log(JSON.stringify(topKFrequent(JSON.parse(input[0]), parseInt(input[1]))));', python: 'import json, sys\ndef topKFrequent(nums, k):\n    pass\ndata = sys.stdin.read().strip().split("\\n")\nprint(json.dumps(topKFrequent(json.loads(data[0]), int(data[1]))))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nvector<int> topKFrequent(vector<int>& nums, int k) { return {}; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int[] topKFrequent(int[] nums, int k) { return new int[]{}; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint main() { return 0; }' },
    testCases: [ { input: '[1,1,1,2,2,3]\n2', expectedOutput: '[1,2]', isHidden: false }, { input: '[1]\n1', expectedOutput: '[1]', isHidden: false }, { input: '[4,1,-1,2,-1,2,3]\n2', expectedOutput: '[-1,2]', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)', hints: ['Use a frequency map then bucket sort.'],
    editorial: '## Bucket Sort\n\nCount frequencies, create buckets by frequency, collect top k.\n\n**Time:** O(n), **Space:** O(n)'
  },

  // ============================================================
  // LINKED LIST (8 problems)
  // ============================================================
  {
    problemNumber: 21, title: 'Reverse Linked List', slug: 'reverse-linked-list',
    description: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'Easy', topic: 'Linked List', companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Apple', 'TCS', 'Infosys', 'Wipro'],
    tags: ['Linked List', 'Recursion'], constraints: ['0 <= Number of nodes <= 5000', '-5000 <= Node.val <= 5000'],
    inputFormat: 'Head of linked list.', outputFormat: 'Head of reversed list.',
    examples: [ { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: 'Reversed order.' }, { input: 'head = [1,2]', output: '[2,1]', explanation: 'Two nodes reversed.' } ],
    functionSignature: { javascript: 'function reverseList(head)', python: 'def reverseList(self, head):', cpp: 'ListNode* reverseList(ListNode* head)', java: 'public ListNode reverseList(ListNode head)', c: 'struct ListNode* reverseList(struct ListNode* head)' },
    starterCode: { javascript: '// Definition: function ListNode(val, next) { this.val = val; this.next = next || null; }\nfunction reverseList(head) {\n    // Write your solution here\n}\n// I/O handled by judge', python: '# Definition: class ListNode:\n#     def __init__(self, val=0, next=None): self.val = val; self.next = next\ndef reverseList(head):\n    pass', cpp: '// struct ListNode { int val; ListNode *next; };\nListNode* reverseList(ListNode* head) {\n    return nullptr;\n}', java: '// class ListNode { int val; ListNode next; }\npublic ListNode reverseList(ListNode head) {\n    return null;\n}', c: '// struct ListNode { int val; struct ListNode *next; };\nstruct ListNode* reverseList(struct ListNode* head) {\n    return NULL;\n}' },
    testCases: [ { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]', isHidden: false }, { input: '[1,2]', expectedOutput: '[2,1]', isHidden: false }, { input: '[]', expectedOutput: '[]', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['Use three pointers: prev, current, next.'],
    editorial: '## Iterative\n\nTraverse with prev=null, curr=head. At each step, save next, reverse pointer, advance.\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 22, title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists',
    description: 'Merge two sorted linked lists and return it as a sorted list.',
    difficulty: 'Easy', topic: 'Linked List', companies: ['Amazon', 'Microsoft', 'Apple', 'TCS', 'Infosys'], tags: ['Linked List', 'Recursion'],
    constraints: ['0 <= list length <= 50', '-100 <= Node.val <= 100'], inputFormat: 'Two sorted linked lists.', outputFormat: 'Merged sorted list.',
    examples: [ { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: 'Merged in sorted order.' }, { input: 'list1 = [], list2 = []', output: '[]', explanation: 'Both empty.' } ],
    functionSignature: { javascript: 'function mergeTwoLists(list1, list2)', python: 'def mergeTwoLists(self, list1, list2):', cpp: 'ListNode* mergeTwoLists(ListNode* list1, ListNode* list2)', java: 'public ListNode mergeTwoLists(ListNode list1, ListNode list2)', c: 'struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2)' },
    starterCode: { javascript: 'function mergeTwoLists(list1, list2) {\n    // Write your solution here\n}', python: 'def mergeTwoLists(list1, list2):\n    pass', cpp: 'ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) { return nullptr; }', java: 'public ListNode mergeTwoLists(ListNode l1, ListNode l2) { return null; }', c: 'struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2) { return NULL; }' },
    testCases: [ { input: '[1,2,4]\n[1,3,4]', expectedOutput: '[1,1,2,3,4,4]', isHidden: false }, { input: '[]\n[]', expectedOutput: '[]', isHidden: false }, { input: '[]\n[0]', expectedOutput: '[0]', isHidden: true } ],
    timeComplexity: 'O(n+m)', spaceComplexity: 'O(1)', hints: ['Use a dummy head and compare nodes.'],
    editorial: '## Iterative Merge\n\nDummy head, compare and attach smaller node.\n\n**Time:** O(n+m), **Space:** O(1)'
  },
  {
    problemNumber: 23, title: 'Linked List Cycle', slug: 'linked-list-cycle',
    description: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it.',
    difficulty: 'Easy', topic: 'Linked List', companies: ['Amazon', 'Microsoft', 'TCS', 'Infosys'], tags: ['Hash Table', 'Linked List', 'Two Pointers'],
    constraints: ['0 <= Number of nodes <= 10^4'], inputFormat: 'Head of linked list.', outputFormat: 'true or false.',
    examples: [ { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'Tail connects to node index 1.' }, { input: 'head = [1], pos = -1', output: 'false', explanation: 'No cycle.' } ],
    functionSignature: { javascript: 'function hasCycle(head)', python: 'def hasCycle(self, head):', cpp: 'bool hasCycle(ListNode *head)', java: 'public boolean hasCycle(ListNode head)', c: 'bool hasCycle(struct ListNode *head)' },
    starterCode: { javascript: 'function hasCycle(head) {\n    // Write your solution here\n}', python: 'def hasCycle(head):\n    pass', cpp: 'bool hasCycle(ListNode *head) { return false; }', java: 'public boolean hasCycle(ListNode head) { return false; }', c: '#include <stdbool.h>\nbool hasCycle(struct ListNode *head) { return false; }' },
    testCases: [ { input: '[3,2,0,-4]\n1', expectedOutput: 'true', isHidden: false }, { input: '[1]\n-1', expectedOutput: 'false', isHidden: false } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['Floyd\'s Tortoise and Hare algorithm.'],
    editorial: '## Floyd\'s Cycle Detection\n\nSlow pointer moves 1 step, fast moves 2 steps. If they meet, cycle exists.\n\n**Time:** O(n), **Space:** O(1)'
  },

  // ============================================================
  // STACK & QUEUE (8 problems)
  // ============================================================
  {
    problemNumber: 24, title: 'Valid Parentheses', slug: 'valid-parentheses',
    description: 'Given a string `s` containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    difficulty: 'Easy', topic: 'Stack', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'TCS', 'Wipro', 'Infosys', 'Accenture'],
    tags: ['String', 'Stack'], constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only.'],
    inputFormat: 'A string of brackets.', outputFormat: 'true or false.',
    examples: [ { input: 's = "()"', output: 'true', explanation: 'Simple valid pair.' }, { input: 's = "()[]{}"', output: 'true', explanation: 'All pairs valid.' }, { input: 's = "(]"', output: 'false', explanation: 'Mismatched brackets.' } ],
    functionSignature: { javascript: 'function isValid(s)', python: 'def isValid(self, s: str) -> bool:', cpp: 'bool isValid(string s)', java: 'public boolean isValid(String s)', c: 'bool isValid(char* s)' },
    starterCode: { javascript: 'function isValid(s) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(isValid(input));', python: 'import sys\ndef isValid(s):\n    pass\ndata = sys.stdin.read().strip()\nprint(str(isValid(data)).lower())', cpp: '#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\nbool isValid(string s) { return false; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static boolean isValid(String s) { return false; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\n#include <stdbool.h>\nbool isValid(char* s) { return false; }\nint main() { return 0; }' },
    testCases: [ { input: '()', expectedOutput: 'true', isHidden: false }, { input: '()[]{}', expectedOutput: 'true', isHidden: false }, { input: '(]', expectedOutput: 'false', isHidden: false }, { input: '([)]', expectedOutput: 'false', isHidden: true }, { input: '{[]}', expectedOutput: 'true', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)', hints: ['Use a stack. Push opening brackets, pop and compare for closing.'],
    editorial: '## Stack\n\nPush opening brackets. For closing, pop and check match.\n\n**Time:** O(n), **Space:** O(n)'
  },
  {
    problemNumber: 25, title: 'Min Stack', slug: 'min-stack',
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    difficulty: 'Medium', topic: 'Stack', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['Stack', 'Design'],
    constraints: ['-2^31 <= val <= 2^31 - 1', 'Methods pop, top and getMin will always be called on non-empty stacks.'],
    inputFormat: 'Operations on the stack.', outputFormat: 'Results of operations.',
    examples: [ { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: '[null,null,null,null,-3,null,0,-2]', explanation: 'Stack operations with min tracking.' } ],
    functionSignature: { javascript: 'class MinStack { push(val) {} pop() {} top() {} getMin() {} }', python: 'class MinStack:\n    def push(self, val): pass\n    def pop(self): pass\n    def top(self): pass\n    def getMin(self): pass', cpp: 'class MinStack { public: void push(int val); void pop(); int top(); int getMin(); };', java: 'class MinStack { public void push(int val) {} public void pop() {} public int top() { return 0; } public int getMin() { return 0; } }', c: '// Implement using struct' },
    starterCode: { javascript: 'class MinStack {\n    constructor() {\n        // Initialize\n    }\n    push(val) {\n        // Write your solution here\n    }\n    pop() {\n        // Write your solution here\n    }\n    top() {\n        // Write your solution here\n    }\n    getMin() {\n        // Write your solution here\n    }\n}', python: 'class MinStack:\n    def __init__(self):\n        pass\n    def push(self, val: int) -> None:\n        pass\n    def pop(self) -> None:\n        pass\n    def top(self) -> int:\n        pass\n    def getMin(self) -> int:\n        pass', cpp: 'class MinStack {\npublic:\n    MinStack() {}\n    void push(int val) {}\n    void pop() {}\n    int top() { return 0; }\n    int getMin() { return 0; }\n};', java: 'class MinStack {\n    public MinStack() {}\n    public void push(int val) {}\n    public void pop() {}\n    public int top() { return 0; }\n    public int getMin() { return 0; }\n}', c: '// struct MinStack implementation' },
    testCases: [ { input: 'push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin', expectedOutput: '-3\n0\n-2', isHidden: false } ],
    timeComplexity: 'O(1) per operation', spaceComplexity: 'O(n)', hints: ['Use two stacks: one for values, one for minimums.'],
    editorial: '## Two Stack Approach\n\nMaintain a parallel min stack that tracks the minimum at each level.\n\n**Time:** O(1) per operation, **Space:** O(n)'
  },
  {
    problemNumber: 26, title: 'Implement Queue using Stacks', slug: 'implement-queue-using-stacks',
    description: 'Implement a first in first out (FIFO) queue using only two stacks.',
    difficulty: 'Easy', topic: 'Queue', companies: ['Amazon', 'Microsoft', 'TCS', 'Infosys'], tags: ['Stack', 'Design', 'Queue'],
    constraints: ['1 <= x <= 9', 'At most 100 calls.'], inputFormat: 'Queue operations.', outputFormat: 'Results of operations.',
    examples: [ { input: 'push(1), push(2), peek(), pop(), empty()', output: '1, 1, false', explanation: 'FIFO order.' } ],
    functionSignature: { javascript: 'class MyQueue { push(x) {} pop() {} peek() {} empty() {} }', python: 'class MyQueue:\n    def push(self, x): pass\n    def pop(self): pass\n    def peek(self): pass\n    def empty(self): pass', cpp: 'class MyQueue { public: void push(int x); int pop(); int peek(); bool empty(); };', java: 'class MyQueue { public void push(int x) {} public int pop() { return 0; } public int peek() { return 0; } public boolean empty() { return true; } }', c: '// Implement using struct' },
    starterCode: { javascript: 'class MyQueue {\n    constructor() {}\n    push(x) {}\n    pop() {}\n    peek() {}\n    empty() {}\n}', python: 'class MyQueue:\n    def __init__(self):\n        pass\n    def push(self, x):\n        pass\n    def pop(self):\n        pass\n    def peek(self):\n        pass\n    def empty(self):\n        pass', cpp: 'class MyQueue {\npublic:\n    MyQueue() {}\n    void push(int x) {}\n    int pop() { return 0; }\n    int peek() { return 0; }\n    bool empty() { return true; }\n};', java: 'class MyQueue {\n    public MyQueue() {}\n    public void push(int x) {}\n    public int pop() { return 0; }\n    public int peek() { return 0; }\n    public boolean empty() { return true; }\n}', c: '// Implement using struct' },
    testCases: [ { input: 'push 1\npush 2\npeek\npop\nempty', expectedOutput: '1\n1\nfalse', isHidden: false } ],
    timeComplexity: 'O(1) amortized', spaceComplexity: 'O(n)', hints: ['Use two stacks: input and output.'],
    editorial: '## Two Stacks\n\nPush to input stack. For pop/peek, transfer to output stack if empty.\n\n**Time:** O(1) amortized, **Space:** O(n)'
  },

  // ============================================================
  // TREES / BST (12 problems)
  // ============================================================
  {
    problemNumber: 27, title: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree',
    description: 'Given the `root` of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from root to farthest leaf.',
    difficulty: 'Easy', topic: 'Trees', companies: ['Amazon', 'Google', 'Microsoft', 'TCS', 'Infosys'], tags: ['Tree', 'DFS', 'BFS', 'Binary Tree'],
    constraints: ['0 <= Number of nodes <= 10^4'], inputFormat: 'Root of binary tree.', outputFormat: 'An integer.',
    examples: [ { input: 'root = [3,9,20,null,null,15,7]', output: '3', explanation: 'Three levels deep.' }, { input: 'root = [1,null,2]', output: '2', explanation: 'Two levels.' } ],
    functionSignature: { javascript: 'function maxDepth(root)', python: 'def maxDepth(self, root) -> int:', cpp: 'int maxDepth(TreeNode* root)', java: 'public int maxDepth(TreeNode root)', c: 'int maxDepth(struct TreeNode* root)' },
    starterCode: { javascript: 'function maxDepth(root) {\n    // Write your solution here\n}', python: 'def maxDepth(root):\n    pass', cpp: 'int maxDepth(TreeNode* root) { return 0; }', java: 'public int maxDepth(TreeNode root) { return 0; }', c: 'int maxDepth(struct TreeNode* root) { return 0; }' },
    testCases: [ { input: '[3,9,20,null,null,15,7]', expectedOutput: '3', isHidden: false }, { input: '[1,null,2]', expectedOutput: '2', isHidden: false }, { input: '[]', expectedOutput: '0', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(h)', hints: ['Use recursion: 1 + max(left depth, right depth).'],
    editorial: '## DFS Recursion\n\n```javascript\nfunction maxDepth(root) {\n    if (!root) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}\n```\n\n**Time:** O(n), **Space:** O(h)'
  },
  {
    problemNumber: 28, title: 'Invert Binary Tree', slug: 'invert-binary-tree',
    description: 'Given the `root` of a binary tree, invert the tree, and return its root.',
    difficulty: 'Easy', topic: 'Trees', companies: ['Google', 'Amazon', 'Microsoft', 'TCS'], tags: ['Tree', 'DFS', 'BFS'],
    constraints: ['0 <= Number of nodes <= 100'], inputFormat: 'Root of binary tree.', outputFormat: 'Root of inverted tree.',
    examples: [ { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]', explanation: 'Mirror image of the tree.' }, { input: 'root = [2,1,3]', output: '[2,3,1]', explanation: 'Swap children.' } ],
    functionSignature: { javascript: 'function invertTree(root)', python: 'def invertTree(self, root):', cpp: 'TreeNode* invertTree(TreeNode* root)', java: 'public TreeNode invertTree(TreeNode root)', c: 'struct TreeNode* invertTree(struct TreeNode* root)' },
    starterCode: { javascript: 'function invertTree(root) {\n    // Write your solution here\n}', python: 'def invertTree(root):\n    pass', cpp: 'TreeNode* invertTree(TreeNode* root) { return nullptr; }', java: 'public TreeNode invertTree(TreeNode root) { return null; }', c: 'struct TreeNode* invertTree(struct TreeNode* root) { return NULL; }' },
    testCases: [ { input: '[4,2,7,1,3,6,9]', expectedOutput: '[4,7,2,9,6,3,1]', isHidden: false }, { input: '[2,1,3]', expectedOutput: '[2,3,1]', isHidden: false }, { input: '[]', expectedOutput: '[]', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(h)', hints: ['Recursively swap left and right children.'],
    editorial: '## DFS\n\nSwap left and right, then recurse.\n\n**Time:** O(n), **Space:** O(h)'
  },
  {
    problemNumber: 29, title: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal',
    description: 'Given the `root` of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
    difficulty: 'Medium', topic: 'Trees', companies: ['Amazon', 'Google', 'Meta', 'Microsoft'], tags: ['Tree', 'BFS'],
    constraints: ['0 <= Number of nodes <= 2000'], inputFormat: 'Root of binary tree.', outputFormat: '2D array of level values.',
    examples: [ { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]', explanation: 'Level by level.' }, { input: 'root = [1]', output: '[[1]]', explanation: 'Single node.' } ],
    functionSignature: { javascript: 'function levelOrder(root)', python: 'def levelOrder(self, root):', cpp: 'vector<vector<int>> levelOrder(TreeNode* root)', java: 'public List<List<Integer>> levelOrder(TreeNode root)', c: 'int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes)' },
    starterCode: { javascript: 'function levelOrder(root) {\n    // Write your solution here\n}', python: 'def levelOrder(root):\n    pass', cpp: 'vector<vector<int>> levelOrder(TreeNode* root) { return {}; }', java: 'public List<List<Integer>> levelOrder(TreeNode root) { return new ArrayList<>(); }', c: 'int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) { return NULL; }' },
    testCases: [ { input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]', isHidden: false }, { input: '[1]', expectedOutput: '[[1]]', isHidden: false }, { input: '[]', expectedOutput: '[]', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)', hints: ['Use a queue for BFS.'],
    editorial: '## BFS with Queue\n\nProcess nodes level by level using a queue.\n\n**Time:** O(n), **Space:** O(n)'
  },
  {
    problemNumber: 30, title: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree',
    description: 'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).',
    difficulty: 'Medium', topic: 'BST', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'], tags: ['Tree', 'DFS', 'BST'],
    constraints: ['1 <= Number of nodes <= 10^4'], inputFormat: 'Root of binary tree.', outputFormat: 'true or false.',
    examples: [ { input: 'root = [2,1,3]', output: 'true', explanation: 'Valid BST.' }, { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'Right child 4 < root 5.' } ],
    functionSignature: { javascript: 'function isValidBST(root)', python: 'def isValidBST(self, root):', cpp: 'bool isValidBST(TreeNode* root)', java: 'public boolean isValidBST(TreeNode root)', c: 'bool isValidBST(struct TreeNode* root)' },
    starterCode: { javascript: 'function isValidBST(root) {\n    // Write your solution here\n}', python: 'def isValidBST(root):\n    pass', cpp: 'bool isValidBST(TreeNode* root) { return false; }', java: 'public boolean isValidBST(TreeNode root) { return false; }', c: '#include <stdbool.h>\nbool isValidBST(struct TreeNode* root) { return false; }' },
    testCases: [ { input: '[2,1,3]', expectedOutput: 'true', isHidden: false }, { input: '[5,1,4,null,null,3,6]', expectedOutput: 'false', isHidden: false }, { input: '[1]', expectedOutput: 'true', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)', hints: ['Pass min and max bounds down recursively.', 'Or use in-order traversal — values should be strictly increasing.'],
    editorial: '## Recursive with Bounds\n\nCheck each node against valid range [min, max].\n\n**Time:** O(n), **Space:** O(n)'
  },
  {
    problemNumber: 31, title: 'Lowest Common Ancestor of a BST', slug: 'lowest-common-ancestor-of-bst',
    description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes.',
    difficulty: 'Medium', topic: 'BST', companies: ['Amazon', 'Google', 'Meta'], tags: ['Tree', 'DFS', 'BST'],
    constraints: ['All values are unique.', 'p != q', 'p and q exist in BST.'], inputFormat: 'BST root, two nodes p and q.', outputFormat: 'LCA node value.',
    examples: [ { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6', explanation: 'LCA of 2 and 8 is 6.' }, { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2', explanation: 'LCA of 2 and 4 is 2.' } ],
    functionSignature: { javascript: 'function lowestCommonAncestor(root, p, q)', python: 'def lowestCommonAncestor(self, root, p, q):', cpp: 'TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q)', java: 'public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q)', c: 'struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q)' },
    starterCode: { javascript: 'function lowestCommonAncestor(root, p, q) {\n    // Write your solution here\n}', python: 'def lowestCommonAncestor(root, p, q):\n    pass', cpp: 'TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) { return nullptr; }', java: 'public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) { return null; }', c: 'struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) { return NULL; }' },
    testCases: [ { input: '[6,2,8,0,4,7,9,null,null,3,5]\n2\n8', expectedOutput: '6', isHidden: false }, { input: '[6,2,8,0,4,7,9,null,null,3,5]\n2\n4', expectedOutput: '2', isHidden: false } ],
    timeComplexity: 'O(h)', spaceComplexity: 'O(1)', hints: ['Use BST property: if both p and q are less than root, go left; if both greater, go right; otherwise root is LCA.'],
    editorial: '## BST Property\n\nIf both values < root → go left. Both > root → go right. Else → root is LCA.\n\n**Time:** O(h), **Space:** O(1)'
  },
  {
    problemNumber: 32, title: 'Same Tree', slug: 'same-tree',
    description: 'Given the roots of two binary trees `p` and `q`, check if they are the same or not.',
    difficulty: 'Easy', topic: 'Trees', companies: ['Amazon', 'Microsoft', 'TCS'], tags: ['Tree', 'DFS'],
    constraints: ['0 <= Number of nodes <= 100'], inputFormat: 'Two tree roots.', outputFormat: 'true or false.',
    examples: [ { input: 'p = [1,2,3], q = [1,2,3]', output: 'true', explanation: 'Identical trees.' }, { input: 'p = [1,2], q = [1,null,2]', output: 'false', explanation: 'Different structure.' } ],
    functionSignature: { javascript: 'function isSameTree(p, q)', python: 'def isSameTree(self, p, q):', cpp: 'bool isSameTree(TreeNode* p, TreeNode* q)', java: 'public boolean isSameTree(TreeNode p, TreeNode q)', c: 'bool isSameTree(struct TreeNode* p, struct TreeNode* q)' },
    starterCode: { javascript: 'function isSameTree(p, q) {\n    // Write your solution here\n}', python: 'def isSameTree(p, q):\n    pass', cpp: 'bool isSameTree(TreeNode* p, TreeNode* q) { return false; }', java: 'public boolean isSameTree(TreeNode p, TreeNode q) { return false; }', c: '#include <stdbool.h>\nbool isSameTree(struct TreeNode* p, struct TreeNode* q) { return false; }' },
    testCases: [ { input: '[1,2,3]\n[1,2,3]', expectedOutput: 'true', isHidden: false }, { input: '[1,2]\n[1,null,2]', expectedOutput: 'false', isHidden: false } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)', hints: ['Compare nodes recursively.'],
    editorial: '## DFS\n\nCompare values and recurse on left/right.\n\n**Time:** O(n), **Space:** O(n)'
  },

  // ============================================================
  // HEAP (5 problems)
  // ============================================================
  {
    problemNumber: 33, title: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-array',
    description: 'Given an integer array `nums` and an integer `k`, return the kth largest element in the array.',
    difficulty: 'Medium', topic: 'Heap', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'], tags: ['Array', 'Divide and Conquer', 'Sorting', 'Heap'],
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'], inputFormat: 'Array and integer k.', outputFormat: 'The kth largest element.',
    examples: [ { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5', explanation: 'Sorted: [6,5,4,3,2,1], 2nd largest is 5.' }, { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4', explanation: '4th largest is 4.' } ],
    functionSignature: { javascript: 'function findKthLargest(nums, k)', python: 'def findKthLargest(self, nums: List[int], k: int) -> int:', cpp: 'int findKthLargest(vector<int>& nums, int k)', java: 'public int findKthLargest(int[] nums, int k)', c: 'int findKthLargest(int* nums, int numsSize, int k)' },
    starterCode: { javascript: 'function findKthLargest(nums, k) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconsole.log(findKthLargest(JSON.parse(input[0]), parseInt(input[1])));', python: 'import json, sys\ndef findKthLargest(nums, k):\n    pass\ndata = sys.stdin.read().strip().split("\\n")\nprint(findKthLargest(json.loads(data[0]), int(data[1])))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint findKthLargest(vector<int>& nums, int k) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int findKthLargest(int[] nums, int k) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint findKthLargest(int* nums, int numsSize, int k) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '[3,2,1,5,6,4]\n2', expectedOutput: '5', isHidden: false }, { input: '[3,2,3,1,2,4,5,5,6]\n4', expectedOutput: '4', isHidden: false } ],
    timeComplexity: 'O(n) average (Quickselect)', spaceComplexity: 'O(1)', hints: ['Use min-heap of size k or Quickselect.'],
    editorial: '## Min-Heap / Quickselect\n\nMaintain min-heap of k elements. Or use Quickselect for average O(n).\n\n**Time:** O(n) avg, **Space:** O(1)'
  },
  {
    problemNumber: 34, title: 'Merge K Sorted Lists', slug: 'merge-k-sorted-lists',
    description: 'You are given an array of `k` linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    difficulty: 'Hard', topic: 'Heap', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Uber'], tags: ['Linked List', 'Divide and Conquer', 'Heap', 'Merge Sort'],
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500'], inputFormat: 'Array of sorted linked lists.', outputFormat: 'Single merged sorted linked list.',
    examples: [ { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]', explanation: 'Merged all lists.' }, { input: 'lists = []', output: '[]', explanation: 'Empty input.' } ],
    functionSignature: { javascript: 'function mergeKLists(lists)', python: 'def mergeKLists(self, lists):', cpp: 'ListNode* mergeKLists(vector<ListNode*>& lists)', java: 'public ListNode mergeKLists(ListNode[] lists)', c: 'struct ListNode* mergeKLists(struct ListNode** lists, int listsSize)' },
    starterCode: { javascript: 'function mergeKLists(lists) {\n    // Write your solution here\n}', python: 'def mergeKLists(lists):\n    pass', cpp: 'ListNode* mergeKLists(vector<ListNode*>& lists) { return nullptr; }', java: 'public ListNode mergeKLists(ListNode[] lists) { return null; }', c: 'struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) { return NULL; }' },
    testCases: [ { input: '[[1,4,5],[1,3,4],[2,6]]', expectedOutput: '[1,1,2,3,4,4,5,6]', isHidden: false }, { input: '[]', expectedOutput: '[]', isHidden: false } ],
    timeComplexity: 'O(N log k)', spaceComplexity: 'O(k)', hints: ['Use a min-heap to always pick the smallest head.'],
    editorial: '## Min-Heap\n\nAdd all list heads to min-heap. Pop smallest, add its next.\n\n**Time:** O(N log k), **Space:** O(k)'
  },

  // ============================================================
  // GRAPH / DFS / BFS (10 problems)
  // ============================================================
  {
    problemNumber: 35, title: 'Number of Islands', slug: 'number-of-islands',
    description: 'Given an m x n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.',
    difficulty: 'Medium', topic: 'Graph', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Uber'], tags: ['Array', 'DFS', 'BFS', 'Union Find'],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300'], inputFormat: '2D grid of 0s and 1s.', outputFormat: 'Number of islands.',
    examples: [ { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1', explanation: 'One connected island.' }, { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3', explanation: 'Three separate islands.' } ],
    functionSignature: { javascript: 'function numIslands(grid)', python: 'def numIslands(self, grid):', cpp: 'int numIslands(vector<vector<char>>& grid)', java: 'public int numIslands(char[][] grid)', c: 'int numIslands(char** grid, int gridSize, int* gridColSize)' },
    starterCode: { javascript: 'function numIslands(grid) {\n    // Write your solution here\n}', python: 'def numIslands(grid):\n    pass', cpp: 'int numIslands(vector<vector<char>>& grid) { return 0; }', java: 'public int numIslands(char[][] grid) { return 0; }', c: 'int numIslands(char** grid, int gridSize, int* gridColSize) { return 0; }' },
    testCases: [ { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expectedOutput: '1', isHidden: false }, { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expectedOutput: '3', isHidden: false } ],
    timeComplexity: 'O(m*n)', spaceComplexity: 'O(m*n)', hints: ['DFS/BFS from each unvisited land cell, mark all connected land as visited.'],
    editorial: '## DFS\n\nIterate grid. When land found, DFS to mark entire island, increment count.\n\n**Time:** O(m*n), **Space:** O(m*n)'
  },
  {
    problemNumber: 36, title: 'Clone Graph', slug: 'clone-graph',
    description: 'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.',
    difficulty: 'Medium', topic: 'Graph', companies: ['Amazon', 'Google', 'Meta'], tags: ['Hash Table', 'DFS', 'BFS', 'Graph'],
    constraints: ['1 <= Number of nodes <= 100'], inputFormat: 'Adjacency list representation.', outputFormat: 'Cloned graph.',
    examples: [ { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', explanation: 'Deep copy of graph.' } ],
    functionSignature: { javascript: 'function cloneGraph(node)', python: 'def cloneGraph(self, node):', cpp: 'Node* cloneGraph(Node* node)', java: 'public Node cloneGraph(Node node)', c: '// Not applicable' },
    starterCode: { javascript: 'function cloneGraph(node) {\n    // Write your solution here\n}', python: 'def cloneGraph(node):\n    pass', cpp: 'Node* cloneGraph(Node* node) { return nullptr; }', java: 'public Node cloneGraph(Node node) { return null; }', c: '// Not applicable' },
    testCases: [ { input: '[[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]', isHidden: false } ],
    timeComplexity: 'O(N+E)', spaceComplexity: 'O(N)', hints: ['Use hash map to track cloned nodes.'],
    editorial: '## DFS with Hash Map\n\nMap original → clone. DFS to clone neighbors.\n\n**Time:** O(N+E), **Space:** O(N)'
  },
  {
    problemNumber: 37, title: 'Course Schedule', slug: 'course-schedule',
    description: 'There are `numCourses` courses. Some have prerequisites. Determine if you can finish all courses (detect cycle in directed graph).',
    difficulty: 'Medium', topic: 'Graph', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'], tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000'], inputFormat: 'Number of courses and prerequisites list.', outputFormat: 'true or false.',
    examples: [ { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'Take course 0 then 1.' }, { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Cycle exists.' } ],
    functionSignature: { javascript: 'function canFinish(numCourses, prerequisites)', python: 'def canFinish(self, numCourses, prerequisites):', cpp: 'bool canFinish(int numCourses, vector<vector<int>>& prerequisites)', java: 'public boolean canFinish(int numCourses, int[][] prerequisites)', c: 'bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize)' },
    starterCode: { javascript: 'function canFinish(numCourses, prerequisites) {\n    // Write your solution here\n}', python: 'def canFinish(numCourses, prerequisites):\n    pass', cpp: 'bool canFinish(int numCourses, vector<vector<int>>& prerequisites) { return false; }', java: 'public boolean canFinish(int numCourses, int[][] prerequisites) { return false; }', c: '#include <stdbool.h>\nbool canFinish(int numCourses, int** p, int pSize, int* pColSize) { return false; }' },
    testCases: [ { input: '2\n[[1,0]]', expectedOutput: 'true', isHidden: false }, { input: '2\n[[1,0],[0,1]]', expectedOutput: 'false', isHidden: false } ],
    timeComplexity: 'O(V+E)', spaceComplexity: 'O(V+E)', hints: ['Topological sort using BFS (Kahn\'s) or DFS cycle detection.'],
    editorial: '## Topological Sort (BFS)\n\nBuild in-degree map. Process nodes with in-degree 0.\n\n**Time:** O(V+E), **Space:** O(V+E)'
  },
  {
    problemNumber: 38, title: 'Word Search', slug: 'word-search',
    description: 'Given an m x n grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells.',
    difficulty: 'Medium', topic: 'DFS', companies: ['Amazon', 'Google', 'Microsoft', 'Adobe'], tags: ['Array', 'Backtracking', 'Matrix'],
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15'], inputFormat: 'Character board and word.', outputFormat: 'true or false.',
    examples: [ { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true', explanation: 'Path exists.' }, { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: 'true', explanation: 'Path exists.' } ],
    functionSignature: { javascript: 'function exist(board, word)', python: 'def exist(self, board, word):', cpp: 'bool exist(vector<vector<char>>& board, string word)', java: 'public boolean exist(char[][] board, String word)', c: 'bool exist(char** board, int boardSize, int* boardColSize, char* word)' },
    starterCode: { javascript: 'function exist(board, word) {\n    // Write your solution here\n}', python: 'def exist(board, word):\n    pass', cpp: 'bool exist(vector<vector<char>>& board, string word) { return false; }', java: 'public boolean exist(char[][] board, String word) { return false; }', c: '#include <stdbool.h>\nbool exist(char** board, int boardSize, int* boardColSize, char* word) { return false; }' },
    testCases: [ { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nABCCED', expectedOutput: 'true', isHidden: false }, { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nSEE', expectedOutput: 'true', isHidden: false }, { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nABCB', expectedOutput: 'false', isHidden: true } ],
    timeComplexity: 'O(m*n*4^L)', spaceComplexity: 'O(L)', hints: ['DFS with backtracking from each cell.'],
    editorial: '## DFS Backtracking\n\nFor each cell, try to match word using DFS. Mark visited cells.\n\n**Time:** O(m*n*4^L), **Space:** O(L)'
  },

  // ============================================================
  // DYNAMIC PROGRAMMING (15 problems)
  // ============================================================
  {
    problemNumber: 39, title: 'Climbing Stairs', slug: 'climbing-stairs',
    description: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?',
    difficulty: 'Easy', topic: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'TCS', 'Infosys', 'Wipro'],
    tags: ['Math', 'Dynamic Programming', 'Memoization'], constraints: ['1 <= n <= 45'],
    inputFormat: 'An integer n.', outputFormat: 'Number of distinct ways.',
    examples: [ { input: 'n = 2', output: '2', explanation: '1+1 or 2.' }, { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1.' } ],
    functionSignature: { javascript: 'function climbStairs(n)', python: 'def climbStairs(self, n: int) -> int:', cpp: 'int climbStairs(int n)', java: 'public int climbStairs(int n)', c: 'int climbStairs(int n)' },
    starterCode: { javascript: 'function climbStairs(n) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(climbStairs(parseInt(input)));', python: 'import sys\ndef climbStairs(n):\n    pass\ndata = sys.stdin.read().strip()\nprint(climbStairs(int(data)))', cpp: '#include <iostream>\nusing namespace std;\nint climbStairs(int n) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int climbStairs(int n) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint climbStairs(int n) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '2', expectedOutput: '2', isHidden: false }, { input: '3', expectedOutput: '3', isHidden: false }, { input: '5', expectedOutput: '8', isHidden: true }, { input: '1', expectedOutput: '1', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['This is essentially Fibonacci.', 'dp[i] = dp[i-1] + dp[i-2]'],
    editorial: '## DP (Fibonacci)\n\n```javascript\nfunction climbStairs(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) [a, b] = [b, a + b];\n    return b;\n}\n```\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 40, title: 'Coin Change', slug: 'coin-change',
    description: 'Given coins of different denominations and a total amount, return the fewest number of coins needed. Return -1 if impossible.',
    difficulty: 'Medium', topic: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Uber'], tags: ['Array', 'Dynamic Programming', 'BFS'],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'], inputFormat: 'Coins array and amount.', outputFormat: 'Minimum coins or -1.',
    examples: [ { input: 'coins = [1,5,10], amount = 12', output: '3', explanation: '10 + 1 + 1 = 12.' }, { input: 'coins = [2], amount = 3', output: '-1', explanation: 'Not possible.' }, { input: 'coins = [1], amount = 0', output: '0', explanation: 'No coins needed.' } ],
    functionSignature: { javascript: 'function coinChange(coins, amount)', python: 'def coinChange(self, coins: List[int], amount: int) -> int:', cpp: 'int coinChange(vector<int>& coins, int amount)', java: 'public int coinChange(int[] coins, int amount)', c: 'int coinChange(int* coins, int coinsSize, int amount)' },
    starterCode: { javascript: 'function coinChange(coins, amount) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconsole.log(coinChange(JSON.parse(input[0]), parseInt(input[1])));', python: 'import json, sys\ndef coinChange(coins, amount):\n    pass\ndata = sys.stdin.read().strip().split("\\n")\nprint(coinChange(json.loads(data[0]), int(data[1])))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint coinChange(vector<int>& coins, int amount) { return -1; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int coinChange(int[] coins, int amount) { return -1; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint coinChange(int* coins, int coinsSize, int amount) { return -1; }\nint main() { return 0; }' },
    testCases: [ { input: '[1,5,10]\n12', expectedOutput: '3', isHidden: false }, { input: '[2]\n3', expectedOutput: '-1', isHidden: false }, { input: '[1]\n0', expectedOutput: '0', isHidden: false }, { input: '[1,2,5]\n11', expectedOutput: '3', isHidden: true } ],
    timeComplexity: 'O(amount * n)', spaceComplexity: 'O(amount)', hints: ['Bottom-up DP. dp[i] = min coins to make amount i.', 'For each coin, dp[i] = min(dp[i], dp[i-coin] + 1).'],
    editorial: '## Bottom-Up DP\n\n```javascript\nfunction coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (let i = 1; i <= amount; i++) {\n        for (const coin of coins) {\n            if (i - coin >= 0) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n        }\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}\n```\n\n**Time:** O(amount * n), **Space:** O(amount)'
  },
  {
    problemNumber: 41, title: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence',
    description: 'Given an integer array `nums`, return the length of the longest strictly increasing subsequence.',
    difficulty: 'Medium', topic: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft', 'Apple'], tags: ['Array', 'Binary Search', 'Dynamic Programming'],
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'], inputFormat: 'Array of integers.', outputFormat: 'Length of LIS.',
    examples: [ { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'LIS is [2,3,7,101].' }, { input: 'nums = [0,1,0,3,2,3]', output: '4', explanation: 'LIS is [0,1,2,3].' } ],
    functionSignature: { javascript: 'function lengthOfLIS(nums)', python: 'def lengthOfLIS(self, nums: List[int]) -> int:', cpp: 'int lengthOfLIS(vector<int>& nums)', java: 'public int lengthOfLIS(int[] nums)', c: 'int lengthOfLIS(int* nums, int numsSize)' },
    starterCode: { javascript: 'function lengthOfLIS(nums) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(lengthOfLIS(JSON.parse(input)));', python: 'import json, sys\ndef lengthOfLIS(nums):\n    pass\ndata = sys.stdin.read().strip()\nprint(lengthOfLIS(json.loads(data)))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint lengthOfLIS(vector<int>& nums) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int lengthOfLIS(int[] nums) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint lengthOfLIS(int* nums, int numsSize) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '[10,9,2,5,3,7,101,18]', expectedOutput: '4', isHidden: false }, { input: '[0,1,0,3,2,3]', expectedOutput: '4', isHidden: false }, { input: '[7,7,7,7,7]', expectedOutput: '1', isHidden: true } ],
    timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', hints: ['Binary search on tails array for O(n log n).', 'Or DP in O(n²): dp[i] = length of LIS ending at i.'],
    editorial: '## Binary Search on Tails\n\nMaintain a tails array. Binary search for position of each element.\n\n**Time:** O(n log n), **Space:** O(n)'
  },
  {
    problemNumber: 42, title: 'House Robber', slug: 'house-robber',
    description: 'Given an array representing money at each house, return the maximum amount you can rob tonight without robbing two adjacent houses.',
    difficulty: 'Medium', topic: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft', 'TCS'], tags: ['Array', 'Dynamic Programming'],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'], inputFormat: 'Array of non-negative integers.', outputFormat: 'Maximum amount.',
    examples: [ { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 and 3: 1+3=4.' }, { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1, 3, 5: 2+9+1=12.' } ],
    functionSignature: { javascript: 'function rob(nums)', python: 'def rob(self, nums: List[int]) -> int:', cpp: 'int rob(vector<int>& nums)', java: 'public int rob(int[] nums)', c: 'int rob(int* nums, int numsSize)' },
    starterCode: { javascript: 'function rob(nums) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(rob(JSON.parse(input)));', python: 'import json, sys\ndef rob(nums):\n    pass\ndata = sys.stdin.read().strip()\nprint(rob(json.loads(data)))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint rob(vector<int>& nums) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int rob(int[] nums) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint rob(int* nums, int numsSize) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '[1,2,3,1]', expectedOutput: '4', isHidden: false }, { input: '[2,7,9,3,1]', expectedOutput: '12', isHidden: false }, { input: '[0]', expectedOutput: '0', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['dp[i] = max(dp[i-1], dp[i-2] + nums[i])'],
    editorial: '## DP\n\nAt each house, decide: skip or rob. dp[i] = max(dp[i-1], dp[i-2] + nums[i]).\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 43, title: 'Unique Paths', slug: 'unique-paths',
    description: 'A robot is on an m x n grid. It can only move right or down. How many unique paths are there from top-left to bottom-right?',
    difficulty: 'Medium', topic: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['Math', 'Dynamic Programming', 'Combinatorics'],
    constraints: ['1 <= m, n <= 100'], inputFormat: 'Two integers m and n.', outputFormat: 'Number of unique paths.',
    examples: [ { input: 'm = 3, n = 7', output: '28', explanation: 'Combinatorial result.' }, { input: 'm = 3, n = 2', output: '3', explanation: 'Right-Down, Down-Right, combinations.' } ],
    functionSignature: { javascript: 'function uniquePaths(m, n)', python: 'def uniquePaths(self, m: int, n: int) -> int:', cpp: 'int uniquePaths(int m, int n)', java: 'public int uniquePaths(int m, int n)', c: 'int uniquePaths(int m, int n)' },
    starterCode: { javascript: 'function uniquePaths(m, n) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconsole.log(uniquePaths(parseInt(input[0]), parseInt(input[1])));', python: 'import sys\ndef uniquePaths(m, n):\n    pass\ndata = sys.stdin.read().strip().split("\\n")\nprint(uniquePaths(int(data[0]), int(data[1])))', cpp: '#include <iostream>\nusing namespace std;\nint uniquePaths(int m, int n) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int uniquePaths(int m, int n) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint uniquePaths(int m, int n) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '3\n7', expectedOutput: '28', isHidden: false }, { input: '3\n2', expectedOutput: '3', isHidden: false }, { input: '1\n1', expectedOutput: '1', isHidden: true } ],
    timeComplexity: 'O(m*n)', spaceComplexity: 'O(n)', hints: ['dp[i][j] = dp[i-1][j] + dp[i][j-1]'],
    editorial: '## DP\n\n2D grid, each cell = sum of cell above + cell left.\n\n**Time:** O(m*n), **Space:** O(n)'
  },
  {
    problemNumber: 44, title: 'Word Break', slug: 'word-break',
    description: 'Given a string `s` and a dictionary `wordDict`, return `true` if `s` can be segmented into space-separated sequence of dictionary words.',
    difficulty: 'Medium', topic: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'], tags: ['Hash Table', 'String', 'Dynamic Programming', 'Trie', 'Memoization'],
    constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000'], inputFormat: 'String and word dictionary.', outputFormat: 'true or false.',
    examples: [ { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true', explanation: '"leet" + "code".' }, { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true', explanation: '"apple" + "pen" + "apple".' } ],
    functionSignature: { javascript: 'function wordBreak(s, wordDict)', python: 'def wordBreak(self, s: str, wordDict: List[str]) -> bool:', cpp: 'bool wordBreak(string s, vector<string>& wordDict)', java: 'public boolean wordBreak(String s, List<String> wordDict)', c: 'bool wordBreak(char* s, char** wordDict, int wordDictSize)' },
    starterCode: { javascript: 'function wordBreak(s, wordDict) {\n    // Write your solution here\n}', python: 'def wordBreak(s, wordDict):\n    pass', cpp: 'bool wordBreak(string s, vector<string>& wordDict) { return false; }', java: 'public boolean wordBreak(String s, List<String> wordDict) { return false; }', c: '#include <stdbool.h>\nbool wordBreak(char* s, char** wordDict, int wordDictSize) { return false; }' },
    testCases: [ { input: 'leetcode\n["leet","code"]', expectedOutput: 'true', isHidden: false }, { input: 'applepenapple\n["apple","pen"]', expectedOutput: 'true', isHidden: false }, { input: 'catsandog\n["cats","dog","sand","and","cat"]', expectedOutput: 'false', isHidden: true } ],
    timeComplexity: 'O(n²)', spaceComplexity: 'O(n)', hints: ['dp[i] = true if s[0..i] can be segmented.'],
    editorial: '## DP\n\ndp[i] = true if s[0..i-1] can be segmented. Check all j < i where dp[j] && s[j..i] in dict.\n\n**Time:** O(n²), **Space:** O(n)'
  },
  {
    problemNumber: 45, title: 'Edit Distance', slug: 'edit-distance',
    description: 'Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) to convert word1 to word2.',
    difficulty: 'Medium', topic: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['String', 'Dynamic Programming'],
    constraints: ['0 <= word1.length, word2.length <= 500'], inputFormat: 'Two strings.', outputFormat: 'Minimum edit distance.',
    examples: [ { input: 'word1 = "horse", word2 = "ros"', output: '3', explanation: 'horse → rorse → rose → ros.' }, { input: 'word1 = "intention", word2 = "execution"', output: '5', explanation: '5 operations needed.' } ],
    functionSignature: { javascript: 'function minDistance(word1, word2)', python: 'def minDistance(self, word1: str, word2: str) -> int:', cpp: 'int minDistance(string word1, string word2)', java: 'public int minDistance(String word1, String word2)', c: 'int minDistance(char* word1, char* word2)' },
    starterCode: { javascript: 'function minDistance(word1, word2) {\n    // Write your solution here\n}', python: 'def minDistance(word1, word2):\n    pass', cpp: 'int minDistance(string word1, string word2) { return 0; }', java: 'public int minDistance(String word1, String word2) { return 0; }', c: 'int minDistance(char* word1, char* word2) { return 0; }' },
    testCases: [ { input: 'horse\nros', expectedOutput: '3', isHidden: false }, { input: 'intention\nexecution', expectedOutput: '5', isHidden: false } ],
    timeComplexity: 'O(m*n)', spaceComplexity: 'O(m*n)', hints: ['Classic 2D DP problem.', 'dp[i][j] = min ops to convert word1[0..i] to word2[0..j].'],
    editorial: '## 2D DP\n\nBuild m×n table. If chars match, dp[i][j] = dp[i-1][j-1]. Else min of insert, delete, replace.\n\n**Time:** O(m*n), **Space:** O(m*n)'
  },

  // ============================================================
  // GREEDY (5 problems)
  // ============================================================
  {
    problemNumber: 46, title: 'Jump Game', slug: 'jump-game',
    description: 'Given array `nums` where each element is max jump length from that position, determine if you can reach the last index.',
    difficulty: 'Medium', topic: 'Greedy', companies: ['Amazon', 'Google', 'Microsoft', 'Apple'], tags: ['Array', 'Dynamic Programming', 'Greedy'],
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'], inputFormat: 'Array of non-negative integers.', outputFormat: 'true or false.',
    examples: [ { input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1→2→end.' }, { input: 'nums = [3,2,1,0,4]', output: 'false', explanation: 'Always stuck at index 3.' } ],
    functionSignature: { javascript: 'function canJump(nums)', python: 'def canJump(self, nums: List[int]) -> bool:', cpp: 'bool canJump(vector<int>& nums)', java: 'public boolean canJump(int[] nums)', c: 'bool canJump(int* nums, int numsSize)' },
    starterCode: { javascript: 'function canJump(nums) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(canJump(JSON.parse(input)));', python: 'import json, sys\ndef canJump(nums):\n    pass\ndata = sys.stdin.read().strip()\nprint(str(canJump(json.loads(data))).lower())', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nbool canJump(vector<int>& nums) { return false; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static boolean canJump(int[] nums) { return false; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\n#include <stdbool.h>\nbool canJump(int* nums, int numsSize) { return false; }\nint main() { return 0; }' },
    testCases: [ { input: '[2,3,1,1,4]', expectedOutput: 'true', isHidden: false }, { input: '[3,2,1,0,4]', expectedOutput: 'false', isHidden: false }, { input: '[0]', expectedOutput: 'true', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['Track the farthest reachable index.'],
    editorial: '## Greedy\n\nTrack maxReach. If current index > maxReach, return false.\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 47, title: 'Gas Station', slug: 'gas-station',
    description: 'There are n gas stations along a circular route. Return starting station index if you can travel around the circuit once, otherwise return -1.',
    difficulty: 'Medium', topic: 'Greedy', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['Array', 'Greedy'],
    constraints: ['1 <= n <= 10^5'], inputFormat: 'Gas and cost arrays.', outputFormat: 'Starting index or -1.',
    examples: [ { input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', output: '3', explanation: 'Start at station 3.' }, { input: 'gas = [2,3,4], cost = [3,4,3]', output: '-1', explanation: 'Not possible.' } ],
    functionSignature: { javascript: 'function canCompleteCircuit(gas, cost)', python: 'def canCompleteCircuit(self, gas, cost):', cpp: 'int canCompleteCircuit(vector<int>& gas, vector<int>& cost)', java: 'public int canCompleteCircuit(int[] gas, int[] cost)', c: 'int canCompleteCircuit(int* gas, int gasSize, int* cost, int costSize)' },
    starterCode: { javascript: 'function canCompleteCircuit(gas, cost) {\n    // Write your solution here\n}', python: 'def canCompleteCircuit(gas, cost):\n    pass', cpp: 'int canCompleteCircuit(vector<int>& gas, vector<int>& cost) { return -1; }', java: 'public int canCompleteCircuit(int[] gas, int[] cost) { return -1; }', c: 'int canCompleteCircuit(int* gas, int gasSize, int* cost, int costSize) { return -1; }' },
    testCases: [ { input: '[1,2,3,4,5]\n[3,4,5,1,2]', expectedOutput: '3', isHidden: false }, { input: '[2,3,4]\n[3,4,3]', expectedOutput: '-1', isHidden: false } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['If total gas >= total cost, solution exists.', 'Track current tank and starting point.'],
    editorial: '## Greedy\n\nIf total gas < total cost, impossible. Otherwise track running tank, reset start when tank < 0.\n\n**Time:** O(n), **Space:** O(1)'
  },

  // ============================================================
  // BACKTRACKING (5 problems)
  // ============================================================
  {
    problemNumber: 48, title: 'Permutations', slug: 'permutations',
    description: 'Given an array `nums` of distinct integers, return all possible permutations.',
    difficulty: 'Medium', topic: 'Backtracking', companies: ['Amazon', 'Google', 'Meta', 'Microsoft'], tags: ['Array', 'Backtracking'],
    constraints: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All integers are unique.'], inputFormat: 'Array of distinct integers.', outputFormat: '2D array of permutations.',
    examples: [ { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', explanation: 'All 6 permutations.' }, { input: 'nums = [0,1]', output: '[[0,1],[1,0]]', explanation: 'Two permutations.' } ],
    functionSignature: { javascript: 'function permute(nums)', python: 'def permute(self, nums: List[int]) -> List[List[int]]:', cpp: 'vector<vector<int>> permute(vector<int>& nums)', java: 'public List<List<Integer>> permute(int[] nums)', c: 'int** permute(int* nums, int numsSize, int* returnSize, int** returnColumnSizes)' },
    starterCode: { javascript: 'function permute(nums) {\n    // Write your solution here\n}', python: 'def permute(nums):\n    pass', cpp: 'vector<vector<int>> permute(vector<int>& nums) { return {}; }', java: 'public List<List<Integer>> permute(int[] nums) { return new ArrayList<>(); }', c: 'int** permute(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) { return NULL; }' },
    testCases: [ { input: '[1,2,3]', expectedOutput: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', isHidden: false }, { input: '[0,1]', expectedOutput: '[[0,1],[1,0]]', isHidden: false }, { input: '[1]', expectedOutput: '[[1]]', isHidden: true } ],
    timeComplexity: 'O(n!)', spaceComplexity: 'O(n)', hints: ['Use backtracking. Swap elements to generate permutations.'],
    editorial: '## Backtracking\n\nSwap current element with each remaining, recurse, swap back.\n\n**Time:** O(n!), **Space:** O(n)'
  },
  {
    problemNumber: 49, title: 'Subsets', slug: 'subsets',
    description: 'Given an integer array `nums` of unique elements, return all possible subsets (the power set).',
    difficulty: 'Medium', topic: 'Backtracking', companies: ['Amazon', 'Google', 'Meta', 'Microsoft'], tags: ['Array', 'Backtracking', 'Bit Manipulation'],
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All elements are unique.'], inputFormat: 'Array of unique integers.', outputFormat: '2D array of subsets.',
    examples: [ { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', explanation: 'All 8 subsets.' }, { input: 'nums = [0]', output: '[[],[0]]', explanation: 'Two subsets.' } ],
    functionSignature: { javascript: 'function subsets(nums)', python: 'def subsets(self, nums: List[int]) -> List[List[int]]:', cpp: 'vector<vector<int>> subsets(vector<int>& nums)', java: 'public List<List<Integer>> subsets(int[] nums)', c: 'int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes)' },
    starterCode: { javascript: 'function subsets(nums) {\n    // Write your solution here\n}', python: 'def subsets(nums):\n    pass', cpp: 'vector<vector<int>> subsets(vector<int>& nums) { return {}; }', java: 'public List<List<Integer>> subsets(int[] nums) { return new ArrayList<>(); }', c: 'int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) { return NULL; }' },
    testCases: [ { input: '[1,2,3]', expectedOutput: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', isHidden: false }, { input: '[0]', expectedOutput: '[[],[0]]', isHidden: false } ],
    timeComplexity: 'O(n * 2^n)', spaceComplexity: 'O(n)', hints: ['Include or exclude each element.'],
    editorial: '## Backtracking\n\nAt each index, include or exclude the element.\n\n**Time:** O(n * 2^n), **Space:** O(n)'
  },
  {
    problemNumber: 50, title: 'N-Queens', slug: 'n-queens',
    description: 'Place n queens on an n×n chessboard such that no two queens threaten each other. Return all distinct solutions.',
    difficulty: 'Hard', topic: 'Backtracking', companies: ['Amazon', 'Google', 'Microsoft', 'Apple'], tags: ['Array', 'Backtracking'],
    constraints: ['1 <= n <= 9'], inputFormat: 'Integer n.', outputFormat: 'All valid board configurations.',
    examples: [ { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', explanation: 'Two solutions for 4-queens.' }, { input: 'n = 1', output: '[["Q"]]', explanation: 'Single queen on 1x1 board.' } ],
    functionSignature: { javascript: 'function solveNQueens(n)', python: 'def solveNQueens(self, n: int) -> List[List[str]]:', cpp: 'vector<vector<string>> solveNQueens(int n)', java: 'public List<List<String>> solveNQueens(int n)', c: 'char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes)' },
    starterCode: { javascript: 'function solveNQueens(n) {\n    // Write your solution here\n}', python: 'def solveNQueens(n):\n    pass', cpp: 'vector<vector<string>> solveNQueens(int n) { return {}; }', java: 'public List<List<String>> solveNQueens(int n) { return new ArrayList<>(); }', c: 'char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) { return NULL; }' },
    testCases: [ { input: '4', expectedOutput: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', isHidden: false }, { input: '1', expectedOutput: '[["Q"]]', isHidden: false } ],
    timeComplexity: 'O(n!)', spaceComplexity: 'O(n²)', hints: ['Place queens row by row, check column and diagonal conflicts.'],
    editorial: '## Backtracking\n\nPlace queen in each row, track used columns and diagonals.\n\n**Time:** O(n!), **Space:** O(n²)'
  },

  // ============================================================
  // SLIDING WINDOW / TWO POINTERS (8 problems)
  // ============================================================
  {
    problemNumber: 51, title: 'Minimum Window Substring', slug: 'minimum-window-substring',
    description: 'Given strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` is included in the window.',
    difficulty: 'Hard', topic: 'Sliding Window', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Uber'], tags: ['Hash Table', 'String', 'Sliding Window'],
    constraints: ['1 <= s.length, t.length <= 10^5'], inputFormat: 'Two strings.', outputFormat: 'Minimum window substring or empty string.',
    examples: [ { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'Minimum window containing A, B, C.' }, { input: 's = "a", t = "a"', output: '"a"', explanation: 'Exact match.' } ],
    functionSignature: { javascript: 'function minWindow(s, t)', python: 'def minWindow(self, s: str, t: str) -> str:', cpp: 'string minWindow(string s, string t)', java: 'public String minWindow(String s, String t)', c: 'char* minWindow(char* s, char* t)' },
    starterCode: { javascript: 'function minWindow(s, t) {\n    // Write your solution here\n}', python: 'def minWindow(s, t):\n    pass', cpp: 'string minWindow(string s, string t) { return ""; }', java: 'public String minWindow(String s, String t) { return ""; }', c: 'char* minWindow(char* s, char* t) { return ""; }' },
    testCases: [ { input: 'ADOBECODEBANC\nABC', expectedOutput: 'BANC', isHidden: false }, { input: 'a\na', expectedOutput: 'a', isHidden: false }, { input: 'a\naa', expectedOutput: '', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(k)', hints: ['Expand right to include all chars of t, then shrink left.'],
    editorial: '## Sliding Window\n\nExpand right until all t chars covered, shrink left to minimize.\n\n**Time:** O(n), **Space:** O(k)'
  },
  {
    problemNumber: 52, title: 'Trapping Rain Water', slug: 'trapping-rain-water',
    description: 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.',
    difficulty: 'Hard', topic: 'Two Pointers', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Goldman Sachs'], tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack'],
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'], inputFormat: 'Array of non-negative integers.', outputFormat: 'Total trapped water.',
    examples: [ { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: '6 units of water trapped.' }, { input: 'height = [4,2,0,3,2,5]', output: '9', explanation: '9 units trapped.' } ],
    functionSignature: { javascript: 'function trap(height)', python: 'def trap(self, height: List[int]) -> int:', cpp: 'int trap(vector<int>& height)', java: 'public int trap(int[] height)', c: 'int trap(int* height, int heightSize)' },
    starterCode: { javascript: 'function trap(height) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(trap(JSON.parse(input)));', python: 'import json, sys\ndef trap(height):\n    pass\ndata = sys.stdin.read().strip()\nprint(trap(json.loads(data)))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint trap(vector<int>& height) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int trap(int[] height) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint trap(int* height, int heightSize) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6', isHidden: false }, { input: '[4,2,0,3,2,5]', expectedOutput: '9', isHidden: false }, { input: '[1]', expectedOutput: '0', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['Two pointers from both ends. Water at each position = min(maxLeft, maxRight) - height.'],
    editorial: '## Two Pointers\n\nTrack maxLeft and maxRight. Process from the side with smaller max.\n\n**Time:** O(n), **Space:** O(1)'
  },

  // ============================================================
  // BINARY SEARCH (5 problems)
  // ============================================================
  {
    problemNumber: 53, title: 'Binary Search', slug: 'binary-search',
    description: 'Given a sorted array of integers `nums` and an integer `target`, return the index of `target` or -1 if not found.',
    difficulty: 'Easy', topic: 'Binary Search', companies: ['Amazon', 'Google', 'Microsoft', 'TCS', 'Infosys', 'Wipro'], tags: ['Array', 'Binary Search'],
    constraints: ['1 <= nums.length <= 10^4', 'nums is sorted in ascending order.'], inputFormat: 'Sorted array and target.', outputFormat: 'Index or -1.',
    examples: [ { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists at index 4.' }, { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 not found.' } ],
    functionSignature: { javascript: 'function search(nums, target)', python: 'def search(self, nums: List[int], target: int) -> int:', cpp: 'int search(vector<int>& nums, int target)', java: 'public int search(int[] nums, int target)', c: 'int search(int* nums, int numsSize, int target)' },
    starterCode: { javascript: 'function search(nums, target) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconsole.log(search(JSON.parse(input[0]), parseInt(input[1])));', python: 'import json, sys\ndef search(nums, target):\n    pass\ndata = sys.stdin.read().strip().split("\\n")\nprint(search(json.loads(data[0]), int(data[1])))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint search(vector<int>& nums, int target) { return -1; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int search(int[] nums, int target) { return -1; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint search(int* nums, int numsSize, int target) { return -1; }\nint main() { return 0; }' },
    testCases: [ { input: '[-1,0,3,5,9,12]\n9', expectedOutput: '4', isHidden: false }, { input: '[-1,0,3,5,9,12]\n2', expectedOutput: '-1', isHidden: false } ],
    timeComplexity: 'O(log n)', spaceComplexity: 'O(1)', hints: ['Standard binary search with left and right pointers.'],
    editorial: '## Standard Binary Search\n\nMid = (left + right) / 2. Compare and narrow.\n\n**Time:** O(log n), **Space:** O(1)'
  },
  {
    problemNumber: 54, title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array',
    description: 'Given a rotated sorted array `nums` and a `target`, return the index of target or -1 if not found. Algorithm must be O(log n).',
    difficulty: 'Medium', topic: 'Binary Search', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Uber'], tags: ['Array', 'Binary Search'],
    constraints: ['1 <= nums.length <= 5000', 'All values are unique.'], inputFormat: 'Rotated sorted array and target.', outputFormat: 'Index or -1.',
    examples: [ { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4', explanation: '0 is at index 4.' }, { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1', explanation: '3 not in array.' } ],
    functionSignature: { javascript: 'function search(nums, target)', python: 'def search(self, nums: List[int], target: int) -> int:', cpp: 'int search(vector<int>& nums, int target)', java: 'public int search(int[] nums, int target)', c: 'int search(int* nums, int numsSize, int target)' },
    starterCode: { javascript: 'function search(nums, target) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconsole.log(search(JSON.parse(input[0]), parseInt(input[1])));', python: 'import json, sys\ndef search(nums, target):\n    pass\ndata = sys.stdin.read().strip().split("\\n")\nprint(search(json.loads(data[0]), int(data[1])))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint search(vector<int>& nums, int target) { return -1; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int search(int[] nums, int target) { return -1; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint search(int* nums, int numsSize, int target) { return -1; }\nint main() { return 0; }' },
    testCases: [ { input: '[4,5,6,7,0,1,2]\n0', expectedOutput: '4', isHidden: false }, { input: '[4,5,6,7,0,1,2]\n3', expectedOutput: '-1', isHidden: false }, { input: '[1]\n0', expectedOutput: '-1', isHidden: true } ],
    timeComplexity: 'O(log n)', spaceComplexity: 'O(1)', hints: ['Modified binary search: determine which half is sorted.'],
    editorial: '## Modified Binary Search\n\nDetermine sorted half, check if target is in that half.\n\n**Time:** O(log n), **Space:** O(1)'
  },
  {
    problemNumber: 55, title: 'Median of Two Sorted Arrays', slug: 'median-of-two-sorted-arrays',
    description: 'Given two sorted arrays `nums1` and `nums2`, return the median of the two sorted arrays. Overall run time complexity should be O(log(m+n)).',
    difficulty: 'Hard', topic: 'Binary Search', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Goldman Sachs'], tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    constraints: ['0 <= m, n <= 1000', '1 <= m + n <= 2000'], inputFormat: 'Two sorted arrays.', outputFormat: 'Median value (float).',
    examples: [ { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0', explanation: 'Merged: [1,2,3], median = 2.0.' }, { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5', explanation: 'Merged: [1,2,3,4], median = (2+3)/2 = 2.5.' } ],
    functionSignature: { javascript: 'function findMedianSortedArrays(nums1, nums2)', python: 'def findMedianSortedArrays(self, nums1, nums2):', cpp: 'double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2)', java: 'public double findMedianSortedArrays(int[] nums1, int[] nums2)', c: 'double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size)' },
    starterCode: { javascript: 'function findMedianSortedArrays(nums1, nums2) {\n    // Write your solution here\n}', python: 'def findMedianSortedArrays(nums1, nums2):\n    pass', cpp: 'double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) { return 0.0; }', java: 'public double findMedianSortedArrays(int[] nums1, int[] nums2) { return 0.0; }', c: 'double findMedianSortedArrays(int* n1, int n1Size, int* n2, int n2Size) { return 0.0; }' },
    testCases: [ { input: '[1,3]\n[2]', expectedOutput: '2.0', isHidden: false }, { input: '[1,2]\n[3,4]', expectedOutput: '2.5', isHidden: false } ],
    timeComplexity: 'O(log(min(m,n)))', spaceComplexity: 'O(1)', hints: ['Binary search on the shorter array for the partition point.'],
    editorial: '## Binary Search on Partition\n\nBinary search the shorter array for correct partition.\n\n**Time:** O(log(min(m,n))), **Space:** O(1)'
  },

  // ============================================================
  // RECURSION (3 problems)
  // ============================================================
  {
    problemNumber: 56, title: 'Pow(x, n)', slug: 'pow-x-n',
    description: 'Implement `pow(x, n)`, which calculates `x` raised to the power `n`.',
    difficulty: 'Medium', topic: 'Recursion', companies: ['Amazon', 'Google', 'Meta', 'Microsoft'], tags: ['Math', 'Recursion'],
    constraints: ['-100.0 < x < 100.0', '-2^31 <= n <= 2^31 - 1', 'Result fits in double.'], inputFormat: 'Float x and integer n.', outputFormat: 'x raised to power n.',
    examples: [ { input: 'x = 2.0, n = 10', output: '1024.0', explanation: '2^10 = 1024.' }, { input: 'x = 2.1, n = 3', output: '9.261', explanation: '2.1^3 ≈ 9.261.' } ],
    functionSignature: { javascript: 'function myPow(x, n)', python: 'def myPow(self, x: float, n: int) -> float:', cpp: 'double myPow(double x, int n)', java: 'public double myPow(double x, int n)', c: 'double myPow(double x, int n)' },
    starterCode: { javascript: 'function myPow(x, n) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("\\n");\nconsole.log(myPow(parseFloat(input[0]), parseInt(input[1])));', python: 'import sys\ndef myPow(x, n):\n    pass\ndata = sys.stdin.read().strip().split("\\n")\nprint(myPow(float(data[0]), int(data[1])))', cpp: '#include <iostream>\nusing namespace std;\ndouble myPow(double x, int n) { return 0.0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static double myPow(double x, int n) { return 0.0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\ndouble myPow(double x, int n) { return 0.0; }\nint main() { return 0; }' },
    testCases: [ { input: '2.0\n10', expectedOutput: '1024.0', isHidden: false }, { input: '2.0\n-2', expectedOutput: '0.25', isHidden: false } ],
    timeComplexity: 'O(log n)', spaceComplexity: 'O(log n)', hints: ['Use fast exponentiation: x^n = (x^(n/2))^2.'],
    editorial: '## Fast Exponentiation\n\nRecursively compute x^(n/2), square it. Handle negative n.\n\n**Time:** O(log n), **Space:** O(log n)'
  },
  {
    problemNumber: 57, title: 'Fibonacci Number', slug: 'fibonacci-number',
    description: 'Given `n`, calculate F(n), where F(n) is the nth Fibonacci number. F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2).',
    difficulty: 'Easy', topic: 'Recursion', companies: ['Amazon', 'Microsoft', 'TCS', 'Infosys', 'Wipro'], tags: ['Math', 'Dynamic Programming', 'Recursion', 'Memoization'],
    constraints: ['0 <= n <= 30'], inputFormat: 'An integer n.', outputFormat: 'F(n).',
    examples: [ { input: 'n = 2', output: '1', explanation: 'F(2) = F(1) + F(0) = 1.' }, { input: 'n = 4', output: '3', explanation: 'F(4) = 3.' } ],
    functionSignature: { javascript: 'function fib(n)', python: 'def fib(self, n: int) -> int:', cpp: 'int fib(int n)', java: 'public int fib(int n)', c: 'int fib(int n)' },
    starterCode: { javascript: 'function fib(n) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(fib(parseInt(input)));', python: 'import sys\ndef fib(n):\n    pass\ndata = sys.stdin.read().strip()\nprint(fib(int(data)))', cpp: '#include <iostream>\nusing namespace std;\nint fib(int n) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int fib(int n) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint fib(int n) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '2', expectedOutput: '1', isHidden: false }, { input: '4', expectedOutput: '3', isHidden: false }, { input: '0', expectedOutput: '0', isHidden: true }, { input: '10', expectedOutput: '55', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['Iterative approach with two variables.'],
    editorial: '## Iterative\n\nTrack two previous values, compute next.\n\n**Time:** O(n), **Space:** O(1)'
  },

  // ============================================================
  // MATH / BIT MANIPULATION (5 problems)
  // ============================================================
  {
    problemNumber: 58, title: 'Single Number', slug: 'single-number',
    description: 'Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. Must run in O(n) time and O(1) space.',
    difficulty: 'Easy', topic: 'Bit Manipulation', companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'TCS', 'Infosys'], tags: ['Array', 'Bit Manipulation'],
    constraints: ['1 <= nums.length <= 3 * 10^4', 'Each element appears twice except one.'], inputFormat: 'Array of integers.', outputFormat: 'The single number.',
    examples: [ { input: 'nums = [2,2,1]', output: '1', explanation: '1 is the only element appearing once.' }, { input: 'nums = [4,1,2,1,2]', output: '4', explanation: '4 appears once.' } ],
    functionSignature: { javascript: 'function singleNumber(nums)', python: 'def singleNumber(self, nums: List[int]) -> int:', cpp: 'int singleNumber(vector<int>& nums)', java: 'public int singleNumber(int[] nums)', c: 'int singleNumber(int* nums, int numsSize)' },
    starterCode: { javascript: 'function singleNumber(nums) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(singleNumber(JSON.parse(input)));', python: 'import json, sys\ndef singleNumber(nums):\n    pass\ndata = sys.stdin.read().strip()\nprint(singleNumber(json.loads(data)))', cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint singleNumber(vector<int>& nums) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int singleNumber(int[] nums) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint singleNumber(int* nums, int numsSize) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '[2,2,1]', expectedOutput: '1', isHidden: false }, { input: '[4,1,2,1,2]', expectedOutput: '4', isHidden: false }, { input: '[1]', expectedOutput: '1', isHidden: true } ],
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)', hints: ['XOR all elements. a ^ a = 0, a ^ 0 = a.'],
    editorial: '## XOR\n\nXOR all elements. Pairs cancel out, leaving the single number.\n\n```javascript\nfunction singleNumber(nums) {\n    return nums.reduce((a, b) => a ^ b, 0);\n}\n```\n\n**Time:** O(n), **Space:** O(1)'
  },
  {
    problemNumber: 59, title: 'Number of 1 Bits', slug: 'number-of-1-bits',
    description: 'Given a positive integer `n`, return the number of set bits (1 bits) in its binary representation (Hamming weight).',
    difficulty: 'Easy', topic: 'Bit Manipulation', companies: ['Microsoft', 'Apple', 'TCS'], tags: ['Divide and Conquer', 'Bit Manipulation'],
    constraints: ['1 <= n <= 2^31 - 1'], inputFormat: 'A positive integer.', outputFormat: 'Number of 1 bits.',
    examples: [ { input: 'n = 11', output: '3', explanation: '11 in binary is 1011, three 1-bits.' }, { input: 'n = 128', output: '1', explanation: '128 = 10000000, one 1-bit.' } ],
    functionSignature: { javascript: 'function hammingWeight(n)', python: 'def hammingWeight(self, n: int) -> int:', cpp: 'int hammingWeight(uint32_t n)', java: 'public int hammingWeight(int n)', c: 'int hammingWeight(uint32_t n)' },
    starterCode: { javascript: 'function hammingWeight(n) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(hammingWeight(parseInt(input)));', python: 'import sys\ndef hammingWeight(n):\n    pass\ndata = sys.stdin.read().strip()\nprint(hammingWeight(int(data)))', cpp: '#include <iostream>\nusing namespace std;\nint hammingWeight(uint32_t n) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int hammingWeight(int n) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\n#include <stdint.h>\nint hammingWeight(uint32_t n) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '11', expectedOutput: '3', isHidden: false }, { input: '128', expectedOutput: '1', isHidden: false }, { input: '2147483645', expectedOutput: '30', isHidden: true } ],
    timeComplexity: 'O(1)', spaceComplexity: 'O(1)', hints: ['Use n & (n-1) to clear the lowest set bit.'],
    editorial: '## Brian Kernighan\'s Algorithm\n\nRepeatedly clear lowest set bit: n = n & (n-1). Count iterations.\n\n**Time:** O(1), **Space:** O(1)'
  },
  {
    problemNumber: 60, title: 'Reverse Integer', slug: 'reverse-integer',
    description: 'Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing causes overflow, return 0.',
    difficulty: 'Medium', topic: 'Math', companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'TCS', 'Infosys'], tags: ['Math'],
    constraints: ['-2^31 <= x <= 2^31 - 1'], inputFormat: 'A 32-bit signed integer.', outputFormat: 'Reversed integer or 0.',
    examples: [ { input: 'x = 123', output: '321', explanation: 'Reversed digits.' }, { input: 'x = -123', output: '-321', explanation: 'Sign preserved.' }, { input: 'x = 120', output: '21', explanation: 'Leading zeros dropped.' } ],
    functionSignature: { javascript: 'function reverse(x)', python: 'def reverse(self, x: int) -> int:', cpp: 'int reverse(int x)', java: 'public int reverse(int x)', c: 'int reverse(int x)' },
    starterCode: { javascript: 'function reverse(x) {\n    // Write your solution here\n}\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(reverse(parseInt(input)));', python: 'import sys\ndef reverse(x):\n    pass\ndata = sys.stdin.read().strip()\nprint(reverse(int(data)))', cpp: '#include <iostream>\nusing namespace std;\nint reverse(int x) { return 0; }\nint main() { return 0; }', java: 'import java.util.*;\npublic class Main {\n    public static int reverse(int x) { return 0; }\n    public static void main(String[] args) {}\n}', c: '#include <stdio.h>\nint reverse(int x) { return 0; }\nint main() { return 0; }' },
    testCases: [ { input: '123', expectedOutput: '321', isHidden: false }, { input: '-123', expectedOutput: '-321', isHidden: false }, { input: '120', expectedOutput: '21', isHidden: false }, { input: '0', expectedOutput: '0', isHidden: true } ],
    timeComplexity: 'O(log x)', spaceComplexity: 'O(1)', hints: ['Pop digits with mod 10, push to result. Check overflow before pushing.'],
    editorial: '## Digit by Digit\n\nPop last digit, push to result. Check 32-bit overflow at each step.\n\n**Time:** O(log x), **Space:** O(1)'
  }
];

module.exports = problems;
