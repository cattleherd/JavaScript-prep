## Object Operations

| Operation              | Method(s)                                                         | Time Complexity | Description                                               |
|------------------------|-------------------------------------------------------------------|-----------------|-----------------------------------------------------------|
| Iterate keys           | `Object.keys(obj)`                                                | O(n)            | Returns an array of all own enumerable property names.   |
| Iterate values         | `Object.values(obj)`                                              | O(n)            | Returns an array of all own enumerable property values.  |
| Iterate entries        | `Object.entries(obj)`                                             | O(n)            | Returns an array of `[key, value]` pairs.                |
| Find max value         | `Math.max(...Object.values(obj))`                                 | O(n)            | Scans all values to pick the largest.                    |
| Find key(s) with max   | `Object.entries(obj).filter(...).map(...)`                        | O(n)            | Filters entries for the max value, then extracts keys.   |
| Transform values       | `Object.fromEntries(Object.entries(obj).map(...))`                | O(n)            | Applies a function to each value, rebuilding the object. |
| Filter entries         | `Object.fromEntries(Object.entries(obj).filter(...))`             | O(n)            | Keeps only entries passing a predicate, rebuild object.  |
| Shallow clone          | `{ ...obj }`                                                      | O(n)            | Creates a new object with same top‑level properties.     |
| Merge objects          | `{ ...obj1, ...obj2, ... }`                                       | O(n)            | Combines multiple objects; later props overwrite earlier.|
| Count/grouping         | `array.reduce((acc, item) => { acc[key] = (acc[key]||0)+1; })`    | O(m)            | Builds a frequency map from an array of m items.         |



https://codesignal.com/blog/interview-prep/example-codesignal-questions/
https://github.com/Leader-board/OA-and-Interviews/blob/main/Online%20Assessments.md

### ✅ Master‑List for Your xAI CodeSignal Prep

---


#### 2 · Module‑1 Skills (“Basic Coding” — 5–10 LOC, < 10 min)

- Simple loops & conditionals
- Primitive arithmetic, modulo, integer division
- Basic string tricks (reverse, vowel/consonant tests)
- Basic array ops (iterate, sum neighbours, rotate *k* with `slice/concat`)
- Off‑by‑one sanity checks

---

#### 3 · Module‑2 Skills (“Data Manipulation” — 10–20 LOC, < 15 min)

- **Sliding‑window** patterns (fixed & variable)
- **Two‑pointer** patterns (inside‑out, outside‑in)
- **Hash‑map counts & look‑ups**
  - first repeating element, anagram groups, frequency compare
- String/array transforms: split, merge, deduplicate, rotate/shift
- Substring pattern checks: vowel/cons masks, longest common prefix/suffix
- Merge two sorted arrays (build new array)

---

#### 4 · Module‑3 Skills (“Implementation Efficiency” — 25–40 LOC, < 20 min)

- In‑place merge of **two** sorted arrays (two‑pointer from the end)
- Merge **k** sorted arrays with a **min‑heap / priority queue**
- 2‑D matrix traversal patterns
  - Row & column pointers (search in sorted matrix)
  - “Tetris‑drop” collision simulation
  - Count elements **< target** via shrinking pointer
- Hash‑map caching for `O(1)` inner‑loop look‑ups
- Break spec into helpers; clean function decomposition
- Custom numeric comparator when default `sort` is lexicographic

---

#### 5 · Module‑4 Skills (“Problem Solving” — 25–35 LOC, < 30 min)

| **Category**                     | **Patterns / Problems to drill**                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Greedy**                       | Merge intervals • non‑overlap meeting rooms • minimum boats/rafts • pick smallest coin piles • block placement (Tetris) |
| **Prefix‑sum / diff‑array**      | 1‑D & 2‑D range‑sum queries • sub‑array sum ≤ *k*                                                                       |
| **Bit tricks**                   | `isPowerOfTwo` • pair‑sum == power‑of‑two (`(1<<k)-x`) • count set / unset bits • swap odd/even bits                    |
| **Hash‑set complement look‑ups** | Two‑sum • k‑difference pairs • longest sub‑array with given sum                                                         |
| **Math utilities**               | Fast prime check ≤ √n • _n_‑th prime (odds only) • GCD / LCM basics                                                     |
| **Binary search** (nice‑to‑have) | First ≥ target • lower/upper bound                                                                                      |

> **Out‑of‑scope for this assessment:** graphs, trees, DFS/BFS, dynamic programming, KMP, rolling hash, Dijkstra, FFT, segment trees.

---

# Standard Math Algos

## nth prime

- You are given a number n. Your task is to write a function that will return the n-th prime number. The expected complexity is $O(n^n)$.

- For example, if n is 1, the function should return 2. If n is 3, the function should return the third prime number, which is 5.

```jsx
function nthPrime(n) {
  // TODO: implement the function
  if (n === 1) {
    return 2; //1st prime
  } else if (n === 2) {
    return 3; //2nd prime. initialize currentPrime to this.
  }

  let count = 2; //this is the nth primes found.
  let currentPrime = 3; // last known prime. Starts at 3 (2nd prime)

  while (count < n) {
    //while nth number of primes found < n
    currentPrime += 2; // check next odd, skipping even
    if (isPrime(currentPrime)) {
      count++; //increment the number of primes found until nth
    }
  }

  return currentPrime;

  function isPrime(n) {
    let sqrt = Math.floor(Math.sqrt(n)); //only need to check up to sqrt. since every number is divided by n * m where either n or m is at most sqrt(num)

    for (let i = 3; i <= sqrt; i += 2) {
      //only check odds
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
}
```

---

## Funding unique prime factors of n

1. O(n) solution

```jsx
function getPrimeFactors(n) {
  const factors = [];
  if (n === 2) {
    factors.push(2);
    return factors;
  }

  if (n === 3) {
    factors.push(3);
    return factors;
  }
  for (let i = 2; i <= n; i++) {
    if (n % i === 0 && isPrime(i)) {
      factors.push(i);
    }
  }

  function isPrime(n) {
    if (n === 1) {
      return false; //catch 1
    } else if (n === 2) {
      return true; //catch 1st prime
    } else if (n % 2 === 0) {
      return false; // catch all evens
    }
    let sqrtLimit = Math.floor(Math.sqrt(n));
    for (let i = 3; i <= sqrtLimit; i += 2) {
      //test all odds above 3
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  return factors;
}
```

2. O(sqrtn) version

```jsx
function getPrimeFactors(n) {
  const factors = [];

  // --- pull out 2’s once ---
  if (n % 2 === 0) {
    factors.push(2); // record the prime 2
    while (n % 2 === 0) n /= 2; // divide n by 2 until it’s odd
  }

  // --- test only odd p up to √n ---
  for (let p = 3; p * p <= n; p += 2) {
    if (n % p === 0) {
      factors.push(p); // record p once
      while (n % p === 0) n /= p; // strip all multiples of p
    }
  }

  // --- anything left >1 is a prime factor too ---
  if (n > 1) factors.push(n);

  return factors;
}
```

1. here we reduce n by each factor

- first we remove all 2s (2*2*2\*2) by first adding the factor 2, then repeatedly dividing by 2 until odd

2. then we test all odd p until sqrt(n) since relationship that n = m \* n where m and n are factors, and either m or n are guaranteed to be <= sqrt(n)

- everytime we find an odd p factor, we repeatedly divide n by p to remove it.

3. if the final n is > 1 its still a prime so we push it too.

---

# Arrays

## Problem

- You are given an array of n integers. Your task is to return the number of unique elements in the array — an element is unique if it appears only once in the array. You cannot use any built-in JavaScript functions to achieve this. **Do not** use any built-in JavaScript methods (like `Set`, `filter`, etc.).

- For example, countUniqueElements([1, 2, 3, 2, 4]) = 3, as there are three unique elements in the list - 1, 3, and 4.

---

```jsx
function countUniqueElements(arr) {
  // TODO: Implement the function that counts unique elements in the given array.

  let count = 0; //number of unique elements

  let found = {}; //track elements found

  for (let i = 0; i < arr.length; i++) {
    // if element already counted, its not unique so remove it from count
    if (found[arr[i]] && found[arr[i]] === "counted") {
      found[arr[i]] = "removed";
      count--;
    }
    //if a element is found to be unique (thus far), add it to the counted object
    // and increment the global counter
    if (!found[arr[i]]) {
      found[arr[i]] = "counted";
      count += 1;
    }
  }

  return count > 0 ? count : 0; //return count or 0 if no unique elements.
}
```

---

## Circular shift in arrays

### Problem

- Your task is to create a JavaScript function that should shift every element in the array to the right (for a positive shift) or to the left (for a negative shift) by shift positions. The shift should be circular — the last element should be moved to the start of the array if shift is positive, and vice versa

---

```jsx
function shiftArrayElements(arr, shift) {
  // Normalize shift into the range [0, arr.length - 1]
  if (shift >= 0) {
    // For positive shifts, just modulo by length
    shift = shift % arr.length;
  } else {
    // For negative shifts, bring into positive range:
    // e.g. shift = -2, length = 5 → (-2 % 5) = -2 → +5 = 3
    // which means shifting left by 2 is the same as shifting right by 3
    shift = (shift % arr.length) + arr.length;
  }

  const shifted = new Array(arr.length);

  // Move each element forward by `shift`, wrapping around via modulo
  for (let i = 0; i < arr.length; i++) {
    const newIndex = (i + shift) % arr.length;
    shifted[newIndex] = arr[i];
  }

  return shifted;
}

module.exports = { shiftArrayElements };
```

### Contiguous Subarrays (Sliding Window)

- You are provided with two arrays of integers, arrayA and arrayB. Your task is to determine if arrayB is a contiguous subarray of arrayA. You need to return true if arrayB is a contiguous subarray of arrayA, and false otherwise.

A subarray is defined as a subset of consecutive elements within an array. For instance, [2, 3] is a subarray of [1, 2, 3, 4] but not a subarray of [1, 3, 2, 4].

Note that you are not allowed to use any built-in JavaScript functions for this task except for accessing array length using length. All other operations should be executed with basic JavaScript programming constructs.

---

```jsx
// 0 1 2 3  <== outer i
//[2,3]
//  [2,3]   <== match found at i = 1
//[3,2,3,4]

//outer loop range is i = 0; i <= ArrayA.length - ArrayB.length
// inner loop compares corrosponding elements in ArrayA with ArrayB, shifted by

function isSubarray(arrayA, arrayB) {
  // If B is longer than A, it can't fit as a contiguous block
  if (arrayB.length > arrayA.length) {
    return false;
  }

  // An empty array is trivially a subarray
  if (arrayB.length === 0) {
    return true;
  }

  // Slide a window of length B.length across A:
  // i goes from 0 up to the last possible start index
  for (let i = 0; i <= arrayA.length - arrayB.length; i++) {
    let match = true; // assume match until a mismatch is found

    // Compare each element of B to the corresponding element in A
    for (let j = 0; j < arrayB.length; j++) {
      if (arrayB[j] !== arrayA[i + j]) {
        match = false; // found a mismatch in this window
        break; // stop checking this window early
      }
    }

    // If no mismatches, we've found B in A
    if (match === true) {
      return match;
    }
  }

  // If we've tried every window and never returned, B isn't in A
  return match; //or we can just return false, since it's implied it will be false
}
```

---

# Recursion

## Problem

- The task is to write a recursive function solution(n) that takes an integer n as an input and returns an array of integers from n to 1, inclusive, in decreasing order. Make sure to use recursion in this task.

For example, for n = 5, the output should be [5, 4, 3, 2, 1].

```jsx
function solution(n) {
  if (n === 1) {
    return [1];
  } else {
    return [n].concat(solution(n - 1));
  }
}
```

### Note:

- we use concat to join 2 arrays, and return the joined array
- we dont return [n].push(some_other_arr) because result of push is length of the new array

---

## Recursive Question 2

- Given a number n, such as 353, return 3^1 + 5^2 + 3^3

- must use Math.floor(n/10) to chop off the last digit each time.

```jsx
function solution(n, pos = 1) {
  // so 253 => 3^1 + 5^2 + 2^3
  // so you just chop off last digit, raise it to pos, then add pos, all recursively
  // to chop off last digit you to Math.floor(n/10)
  // ie: Math.floor(253/10) = 25, Math.floor(25/10) = 2, Math.floor(2/10) = 0
  // Math.floor(n/10) === 0 is base case, thats when you stop.
  // each step of recursive step you get right most digit (n%10) ** pos

  if (n === 0) {
    return 0; //if rest is 1 digit only, return 0
  } else {
    let digit = n % 10; //right most digit eg: 253 => 3
    let rest = Math.floor(n / 10); //shave off right most digit eg: 253 => 25
    return digit ** pos + solution(rest, pos + 1); // eg: 3^1 + solution(25, 2)
  }
}
```

---

## Recursive Function: Reverse a String

Here we use string slicing and recursion to reverse a string by peeling off one character at a time.

---

### How It Works

1. **Base Case**: If the string is empty or has a single character, it is already "reversed." Return it directly.
2. **Recursive Case**:
   - **Peel off** the **last character** using `s.slice(-1)` or `s[s.length - 1]`.
   - **Recurse** on the **remaining substring** (`s.slice(0, -1)`). ello + h => llo + e -> lo + l -> ...
   - **Concatenate** the peeled character **in front** of the reversed remainder.

---

### Code Example

```js
function reverseString(s) {
  //hello => o + hell => add the last character to the recursive slice
  // Base case: empty or single-character string
  if (s.length <= 1) {
    return s;
  }

  // Recursive step:
  // 1. Take the last character
  // 2. Reverse the rest
  // 3. Prepend the last character to the reversed remainder
  return s[s.length - 1] + reverseString(s.slice(0, -1));
}
```

---

## Memoization and recursion

### Why Memoization Improves Fibonacci

The naive recursive Fibonacci repeatedly recomputes the same values over and over:

```js
function fibNaive(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibNaive(n - 1) + fibNaive(n - 2);
}
```

1. Inefficient: fibNaive(5) calls fibNaive(3) and fibNaive(2) multiple times.

2. Exponential time: O(2ⁿ) calls in the recursion tree.

<b>Memoized Version</b>

```js
function fibonacci(n, memo = {}) {
  if (n in memo) {
    // if there is a cache hit return O(1)
    return memo[n];
  }
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    let result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    memo[n] = result; //store the result for later use
    return result; // once youve stored it, return it
  }
}
```

- If we’ve already computed fibonacci(n), return it immediately in O(1) time. That way we dont need to recompute intermediates more than once.

- Subsequent requests for the same n skip the recursive calls entirely.

## Benefits

- Time Complexity drops from O(2ⁿ) to O(n), since each value fib(0) through fib(n) is computed only once.

- Space Complexity is O(n) for the memo object plus the recursion stack.

- Scalable: Even fibonacci(50) or higher runs almost instantly, whereas the naive version would take prohibitively long.

## How It Works in Action

The first time you call fibonacci(5), it builds up memo like:

{2: 1, 3: 2, 4: 3, 5: 5}

- Every later call to any fib(k) just looks up memo[k], avoiding redundant work.

Memoization lets you reuse all previously computed values instead of re-computing them.

---

# Matrices

### isToeplitz

- the algo is to traverse starting from index 1 and row 1, comparing its top left neighbour
- you can traverse the opposite way as well, starting from the end of the row, and comparing
  the bottom right neighbours instead.

```jsx
function isToeplitz(matrix) {
  console.log(matrix);
  // TODO: implement
  //[
  //  [6 7 8]
  //  [4 6 7]
  //  [1 4 6]
  //]

  let rows = matrix.length;
  let cols = matrix[0].length;
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][j] !== matrix[i - 1][j - 1]) {
        return false;
      }
    }
  }
  return true;
}
```

---

## Number of elements less than target

[
[1, 2, 3, 4],
[2, 3, 4, 5],
[3, 4, 5, 6],
[4, 5, 6, 7]
]

### Inneficient method O(n \* m)

- this method traverses every cell

```jsx
function countLessThan(matrix, target) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  let count = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] < target) {
        count++;
      }
    }
  }
  return count;
}
```

### More Efficient Approach

- Since each row is sorted in ascending order, you don’t need to restart the column scan for every row.
- Maintain a single pointer `j` starting at the last column index (`cols - 1`).
- For each row `i`:
  1. **Move `j` left** (decrement) **while** `j >= 0` **and** `matrix[i][j] >= target`.  
     This finds the first element **< target** in that row.
  2. Once you stop, all columns `0…j` in row `i` are `< target`, so **add** `j + 1` to your `count`.
- Because `j` only moves left (from `cols-1` down to `0` at most once), the total work for the inner loop across **all** rows is **O(cols)**, plus **O(rows)** for the outer loop.

```js
function countLessThanOptimized(matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let count = 0;
  let j = cols - 1;

  for (let i = 0; i < rows; i++) {
    while (j >= 0 && matrix[i][j] >= target) {
      j--;
    }
    count += j + 1;
  }

  return count;
}
```

- my first more efficient method still restarted the column scan when searching at a new row, having pointer j really cuts down unecessary work

```js
function countLessThan(matrix, target) {
  console.log(matrix);
  console.log(target);
  let rows = matrix.length;
  let cols = matrix[0].length;
  let count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = cols - 1; j >= 0; j--) {
      if (matrix[i][j] < target) {
        count = count + (j + 1);
        break;
      }
    }
  }
  console.log(count);
  return count;
}
```

- worst case this is O(row\*col) still due to nested loops!

---

## Secondary Diagonal

- Given a square matrix grid of integers, your task is to find the minimum and maximum values at the secondary diagonal. The secondary diagonal starts at the top right corner and ends at the bottom left corner.

```jsx
function findMinMaxSecondaryDiagonal(grid) {
  //[1,2,3,8]
  //[4,5,6,9]
  //[7,8,9,6]
  //[2,3,5,6]
  //returns [3,7]

  //if no argument passed, or empty grid return null array
  if (!grid || grid.length === 0) {
    return [null, null];
  }

  let rows = grid.length;
  let cols = grid[0].length;
  let j = cols - 1; // pointer to the secondary diagonal element at each row
  let max = grid[0][cols - 1]; //initialize mas and min to be the first element
  let min = grid[0][cols - 1];

  // Iterate over each row along the secondary diagonal
  for (let i = 0; i < rows; i++) {
    while (j >= 0) {
      // Only one diagonal element per row, at column index j = cols - 1 - i
      if (grid[i][j] > max) {
        max = grid[i][j];
      }
      if (grid[i][j] < min) {
        min = grid[i][j];
      }
      j--; // move diagonal pointer
      break; // only checking diagonal element at each row, so break
      // that way you arent checking all elements
      // this makes it O(n) where n is num of rows, since checking a
      // single element at each row is O(1) operation
    }
  }
  return [min, max];
}
```

---

## Find target in sorted matrix

You are given a matrix of integers where every row and column are sorted in ascending order. Your task is to find the row that contains a specific target value.

It is guaranteed that the target exists in the given matrix

### O(n \* m) example with a pointer

```jsx
function findRowWithTarget(matrix, target) {
  let num_cols = matrix[0].length;

  let num_rows = matrix.length;

  let pointer = num_cols - 1;

  //[1,4, 7, 11]
  //[2,5,8, 12]
  //[3,6, 9, 16]

  for (let i = 0; i < num_rows; i++) {
    // skip the row if the last element less than target
    if (matrix[i][num_cols - 1] < target) {
      continue;
    }
    // move the pointer from last element in row to suspected candidate
    while (matrix[i][pointer] > target) {
      pointer--;
    }
    // if the candidate equals target return the row
    if (matrix[i][pointer] === target) {
      return i;
      // otherwise reset pointer to right most element in next row
    } else {
      pointer = num_cols - 1;
      continue;
    }
  }
}
```

## O(n + m) example

```jsx
function findRowWithTarget(matrix, target) {
  console.log(matrix);
  console.log(target);
  let num_cols = matrix[0].length;

  let num_rows = matrix.length;

  let start_col = num_cols - 1;
  let start_row = 0;

  //[1,4, 7, 11]
  //[2,5,8, 12]
  //[3,6, 9, 16]

  // null or empty matrix check
  if (matrix.length === 0 || matrix === undefined) {
    return null;
  }

  // if the top right element is target return first row
  if (matrix[start_row][start_col] === target) {
    return start_row;
  }

  // keep checking whether youve found target at each step
  // if the target is smaller than the cell you go left, if
  // the target is larger you move down.
  while (matrix[start_row][start_col] !== target) {
    matrix[start_row][start_col] > target ? start_col-- : start_row++;

    // after each movement check if you have found the target, otherwise make next move. Guaranteed to find the target so no need to return falsy
    if (matrix[start_row][start_col] === target) {
      return start_row;
    }
  }
}
```

- here at each step we are moving closer to the target.

---

# Advanced Array manipulations

## Slice and concat

1. array.slice(startIndex, endIndex)

- start index is inclusive
- endIndex is non inclusive
- If no endIndex, it goes to the end of array

```jsx
let arr = [1, 2, 3, 4, 5];
//         0  1  2  3  4  (indices)

arr.slice(1, 3); // [2, 3]
// Start at index 1 (which is 2)
// Stop before index 3 (so we get indices 1 and 2)

arr.slice(2); // [3, 4, 5]
// Start at index 2, go to end
```

## Negative Indexes

```jsx
let arr = [1, 2, 3, 4, 5];

// Get last element
arr.slice(-1); // [5]
// Same as arr.slice(4)

// Get last 2 elements
arr.slice(-2); // [4, 5]
// Same as arr.slice(3)

// Get last 3 elements
arr.slice(-3); // [3, 4, 5]
// Same as arr.slice(2)
```

## Rotating an array with concat and slice

Original: [Alice, Bob, Charlie, David, Eve]

Step 1: Take last 2 people (David, Eve)
Step 2: Move them to the front

Result: [David, Eve, Alice, Bob, Charlie]

this is a rotation by 2 positions.

## rotate by k positions coded up

```jsx
function rotateArray(nums, k) {
  k = k % nums.length;
  let rotated = nums.slice(-k).concat(nums.slice(0, -k));
  return rotated;
}
```

- however this doesn't rotate an array in place, since concat and slice both create arrays,
  which you add via concat()

---

## Reverse an array in place

- just use 2 pointers

```jsx
function solution(arr) {
  let right = arr.length - 1;

  let left = 0;

  while (right > left) {
    let temp = arr[right];
    arr[right] = arr[left];
    arr[left] = temp;
    left++;
    right--;
  }
  return arr;
}
```

---

## Rotate an array k positions in place (no new arrays creates)

- this solution doesnt do it in place, it creates intermediate arrays

```jsx
function antiRotateArray(nums, k) {
  //[1,2,3,4,5] by 2 places
  //[3,4,5,1,2]
  //slice first 2,  slice(0,2)
  //slice last 3,   slice(2)
  // add them
  // since rotating about the length keeps them in place, do modulo
  // instead of rotating about k => k % nums.length

  let rotation = k % nums.length; // removing unecessary rotations (nums.length)

  return nums.slice(rotation).concat(nums.slice(0, rotation));
}
```

## The in place method:

- must continuously take the first element append it to the end, k times

- can use a shift and a push.

```jsx
let arr = [1, 2, 3, 4];

// remove the front…
const removed = arr.shift(); // removed === 1
// arr is now [2, 3, 4]

// …and add it (or anything) to the back
arr.push(removed); // push returns new length (3)
```

## Solution in place

```jsx
function antiRotateArray(nums, k) {
  let rotation = k % nums.length; // number of times to shift element to end
  // remove redundant rotations (greater than length of array)

  for (let i = 0; i < rotation; i++) {
    nums.push(nums.shift()); //push the first element (nums.shift()) to the end
    // repeat k number of times (normalized by arr length)
  }
  return nums;
}
```

---

## Shuffle array at Kth position

- You are given an array of n integers and a number k. Your task is to shuffle the array in such a way that, starting from the first element, every k-th element moves to the end of the array.

- For instance, if nums = [1, 2, 3, 4, 5, 6, 7, 8] and k = 3, the output should be [1, 2, 4, 5, 7, 8, 3, 6]. Here, the 3rd element 3 and the 6th element 6 (every 3rd element starting from the first) are moved to the end of the array.

### Bad example

```jsx
function badShuffle(nums, k) {
  const appended = [];
  for (let i = 0; i < nums.length; i++) {
    // every k‑th position (1‑based)
    if ((i + 1) % k === 0) {
      // remove the element at i
      const [removed] = nums.splice(i, 1);
      appended.push(removed);
      // → now nums is shorter and everything after i has shifted left, so its not getting kth element from original array
    }
    console.log(`i=${i}, nums=[${nums}], appended=[${appended}]`);
  }
  return nums.concat(appended);
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log("result:", badShuffle(arr, 3));
//
```

<b>if you try to modify the array while you iterate over it, it messes with the indexing. So it is just best to rebuild the array at each step</b>

```jsx
function shuffleArray(nums, k) {
  // TODO: implement the function here
  //[1,2,3,4,5,6]
  //[1,2,4,5,3,6]
  let arr2 = []; // the original array without elements at kth position
  let appended = []; // the array of the elements selected at each kth position
  for (let i = 0; i < nums.length; i++) {
    // if an element is at kth position, add it to appended array
    if ((i + 1) % k === 0) {
      let removed = nums[i];
      appended.push(removed);
      // otherwise, build the original array again without elements at kth index
    } else {
      arr2.push(nums[i]);
    }
  }

  let result = arr2.concat(appended);
  return result;
}
```

---

## Reversing an Array in Fixed‑Size Chunks

**Goal:**  
Given an array `numbers` and chunk size `k`, reverse each consecutive block of up to `k` elements, leaving any leftover tail (size < k) intact.

- [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] with k = 3 becomes [3, 2, 1, 6, 5, 4, 9, 8, 7, 10]
- [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] with k = 4 becomes [4, 3, 2, 1, 8, 7, 6, 5, 10, 9]

### 1. Initial Setup

```js
function solution(numbers, k) {
  let left;
  let right;
  // iterate over each partition, starts at 0, next partition starts at k,
  for (let i = 0; i < numbers.length; i += k) {
    left = i; //left pointer is in multiples of k
    right = Math.min(i - 1 + k, numbers.length - 1); // if there is less than k elements in final part,
    // then right pointer is last element in array
    //simply reverse each array in partition
    while (left < right) {
      let temp = numbers[left];
      numbers[left] = numbers[right];
      numbers[right] = temp;
      left++;
      right--;
    }
  }

  return numbers;
}
```

---

## Shuffled Quarters

### Problem Description

You are given an array of `n` integers. Write a function that **rearranges the array in place** so that:

1. The **middle half** of the elements (after discarding the left and right quarters) move to the **beginning** of the array.
2. The **first** and **fourth** quarters move to the **end** of the array.
3. If `n` is not divisible by 4, any “extra” elements are treated as part of the middle half.

```jsx
function rearrangeArray(nums) {
  let quarter = Math.floor(nums.length / 4); //size of partition

  let first = nums.slice(0, quarter); //first partition
  let middle = nums.slice(quarter, nums.length - quarter); // middle partition
  let end = nums.slice(-quarter); // end partition
  let result = middle.concat(first).concat(end); //create the final array

  nums.splice(0, nums.length, ...result); //modify origina array in place

  return nums;
}
```

## here we use splice which modifies an array in place

```jsx
nums.splice(0, nums.length, ...result);
```

What it accepts:

1. start index
2. delete count
3. the elements to insert

---

## Repeated characters

You are given two strings, `string1` and `string2`. Your goal is to determine a new string, `string3`, that is formed by characters that occur in both `string1` and `string2` in the same order as they occur in `string1`.

- Characters in `string3` should maintain their original sequence order from `string1`.
- If a character is repeated in `string1` and `string2`, include that character in `string3` as many times as it occurs in both strings, but not more than that.
- Your algorithm should run in **O(`string1.length + string2.length`)** time.

### Example

```text
string1 = "apple"
string2 = "peach"
string3 = "ape"

```

## Explanation

### 1. Separating “what” from “where”

- **Phase 1 (Count Phase):**

  - Build a frequency map of `string2` in one pass.
  - You learn **what** characters are available and **how many** of each.
  - Runs in O(`string2.length`) time and O(k) extra space (k = number of distinct characters).

- **Phase 2 (Build Phase):**
  - Scan `string1` in order.
  - For each character `ch`, check `if (count[ch] > 0)`.
    - If yes, append `ch` to `string3` and decrement `count[ch]`.
  - Preserves the exact **order** of `string1` and respects the maximum occurrences from `string2`.

---

### 2. Why not a nested loop?

A naïve approach—“for each char in `string1`, search `string2`”—is O(n·m) in the worst case.  
By pre‑counting, each lookup becomes O(1), yielding O(n + m) overall instead of O(n·m).

```js
function solution(string1, string2) {
  let count = {};
  let string3 = "";

  for (let i = 0; i < string2.length; i++) {
    if (count[string2[i]]) {
      count[string2[i]] += 1;
    } else {
      count[string2[i]] = 1;
    }
  }
  for (let i = 0; i < string1.length; i++) {
    if (count[string1[i]] && count[string1[i]] > 0) {
      string3 += string1[i];
      count[string1[i]] -= 1;
    }
  }
  return string3;
}
```

---

## Longest common suffix

You are given an array of strings `strs`. Your goal is to find the **longest common suffix** (ending substring) shared by **all** strings in the array.

- If `strs` is `null`, empty, or contains no strings, return `""`.
- If `strs` contains exactly one string, return that string.
- Otherwise, return the longest string `suffix` such that every element of `strs` ends with `suffix`.

### Examples

- `["parking", "barking", "laking"]` → `"ing"`
- `["apple", "pineapple", "people"]` → `"ple"`
- `["foo", "bar", "baz"]` → `""` (no common ending)

---

### Framing the Solution

1. **Edge‑case handling**

   - **Null or empty array** → no suffix possible → return `""`.
   - **Single string** → it is its own suffix → return that string.

2. **Determine maximum possible suffix length**

   - The common suffix cannot be longer than the shortest string in `strs`.
   - Compute `minLen = Math.min(...strs.map(s => s.length))`.

3. **Incremental suffix testing**

   - For `i` from `1` to `minLen`:
     1. Extract the last `i` characters of the first string as a **candidate**.
     2. Check whether **every** other string in `strs` also ends with that candidate.
     3. If **all match**, record `suffix = candidate`.
     4. If **any** mismatch, stop searching further—no longer suffix can be common.

4. **Return the recorded suffix**
   - Because we only update `suffix` on success and break on the first failure, `suffix` ends up as the **longest** valid common ending.

---

### Implementation

```javascript
function longestCommonSuffix(strs) {
  // Return empty string if input is null or an empty array
  if (!strs || strs.length === 0) {
    return "";
    // Single string → it is its own suffix
  } else if (strs.length === 1) {
    return strs[0];
  }

  // Maximum possible suffix length = length of the shortest string
  const minLen = Math.min(...strs.map((s) => s.length));
  let suffix = "";

  // Outer loop to check the suffix at a given length
  for (let i = 1; i <= minLen; i++) {
    const candidate = strs[0].slice(-i); // last i characters of first string
    let allMatch = true; // assume a match every time, then disprove it

    // Exit inner loop if any of the strings does not share the same suffix at given i
    for (let j = 1; j < strs.length; j++) {
      if (strs[j].slice(-i) !== candidate) {
        allMatch = false;
        break;
      }
    }
    // override last suffix value if no mismatch at i
    if (allMatch) {
      suffix = candidate;
    } else {
      // exit the outer loop, do not check other suffix lengths since mismatch found at i
      // longest suffix becomes longest candidate (previous i)
      break;
    }
  }

  return suffix; // since suffix is continuously built and overridden until mismatch found
  // it becomes longest suffix
}
```

---

## Repeated Substring Pattern Checker

### Problem

You are given a string `s`. Your task is to determine whether `s` consists of one repeated substring pattern.

- **Return** the repeating substring if one exists.
- If there are multiple possible answers, **return the longest**.
- If no such pattern covers the entire string exactly, **return an empty string**.

**Examples**

- `"abababab"` → returns `"abab"` (also repeats `"ab"`, but `"abab"` is longer)
- `"abcabcab"` → returns `""` (the final `"ab"` is incomplete)

Your solution should run in **O(n²)** time, where _n_ = `s.length`.

## Solving process

- must realize that you need to repeatedly slice the string to substr (s.slice(0,i)), where i is no more
  than half of the original string

- must realize that you are only checking substrings where the original string is divisible by substr length

## Solution Code

```javascript
function repeatSubstring(s) {
  let currentLongest = "";

  // Only need to check candidate substrings up to half the length
  for (let i = 1; i <= s.length / 2; i++) {
    const substr = s.slice(0, i);

    // Only tile if total length is a multiple of candidate’s length
    if (s.length % substr.length === 0) {
      const repeated = substr.repeat(s.length / substr.length);
      console.log(repeated);

      // If tiling reconstructs s, record it
      if (repeated === s) {
        currentLongest = substr;
      }
    }
  }

  return currentLongest;
}
```

- this solution is O(n^2) since outer loop is O(n/2), and the if statement has a comparison
  ```js
  if (repeated === s) {
    currentLongest = substr;
  }
  ```
  it needs to do a comparison of n characters n times, its O(n). So O(n/2)\*O(n) = O(n^2)

---

## `largestCommonPrefix`

- same as longest suffix

```jsx
function largestCommonPrefix(words) {
  let maxPrefix = Math.min(...words.map((str) => str.length)); // O(m) + O(m) = O(m)
  let prefix = "";

  for (let i = 1; i <= maxPrefix + 1; i++) {
    //O(n)
    let allMatch = true;
    let candidate = words[0].slice(0, i);
    for (let j = 1; j < words.length; j++) {
      // O(m)
      if (words[j].slice(0, i) === candidate) {
        // O(i)
        continue;
      } else {
        allMatch = false;
        break;
      }
    }
    if (allMatch) {
      prefix = candidate;
    } else {
      break;
    }
  }
  return prefix;
}
```

## Time Complexity Analysis of largestCommonPrefix

## Variables Definition

- **`m`** = number of words in the array
- **`n`** = length of the shortest word
- **`L`** = average length of words (for some operations)

## Line-by-Line Breakdown

### 1. Finding Minimum Length

```javascript
let maxPrefix = Math.min(...words.map((str) => str.length));
```

- `words.map(str=>str.length)`: **O(m)** - iterates through all words
- `Math.min(...)` with spread operator: **O(m)** - processes all lengths
- **Combined**: O(m)

### 2. Outer Loop

```javascript
for(let i = 1; i <= maxPrefix+1; i++)
```

- Runs at most `n+1` times (where `n` is the shortest word length)
- **Time Complexity**: O(n)

### 3. Inside Outer Loop

#### Creating Candidate

```javascript
let candidate = words[0].slice(0, i);
```

- **Time Complexity**: O(i) - creates substring of length `i`

#### Inner Loop

```javascript
for(let j = 1; j < words.length; j++)
```

- Runs **O(m-1) ≈ O(m)** times

##### Inside Inner Loop

```javascript
if(words[j].slice(0,i) === candidate)
```

- `words[j].slice(0,i)`: **O(i)** - creates substring
- String comparison `===`: **O(i)** - compares `i` characters
- **Combined per iteration**: O(i)

**Total for inner loop**: O(m × i)

## Overall Time Complexity

### Calculation

- Initial setup: **O(m)**
- Main nested loops: **O(n × m × i)**

Since `i` varies from 1 to `n` in the worst case:

### **Worst Case Time Complexity: O(m × n²)**

> **Note**: The actual complexity depends on where the common prefix ends. If the common prefix is found early (say at position `k`), the complexity would be **O(m × k²)** rather than the full O(m × n²).

## Space Complexity

**O(n)** for:

- Storing the prefix string
- Temporary substrings created by `slice()`

---

## LargestCommonPrefix efficient version

- we can sort the array

- Suppose you have these strings:

```js
["carpet", "carpool", "car"];
```

After sorting:

```js
["car", "carpet", "carpool"];
```

- The first string is "car"
- The last string is "carpool"
- If you compare "car" and "carpool" character by character, you get "car" as the common prefix. Any string in between can’t have a longer common prefix than what’s shared by the first and last.

```js
function efficientLCP(strs) {
  if (!strs.length) return "";
  let sorted = strs.sort();
  let prefix = "";

  let maxPrefixLength = sorted[0].length;

  for (let i = 1; i <= maxPrefixLength + 1; i++) {
    let substr = sorted[0].slice(0, i);
    if (substr === sorted[sorted.length - 1].slice(0, i)) {
      prefix = substr;
    }
  }
  console.log(prefix);
  return prefix;
}

```

---

## `Most repeated substring`

You are given a string of characters. Your task is to write a function that will find and return the most common substring of a given length in the input string. If two or more substrings have the same maximum frequency, you should return the lexicographically smallest one.

For example, given the input string "bananabananaba" and a substring length of 5, your function should return "anaba", since it appears twice and is lexicographically smaller than other substrings that also appear twice (e.g., "banan").


```js
function findMostCommonSubstring(s, length) {
    // 1. Build a frequency map for every substring window in `s`
    let count = {}
    for(let i = 0; i <= s.length-length; i++){
        count[s.slice(i,i + length)] ? count[s.slice(i,i + length)] += 1 : count[s.slice(i,i + length)] = 1 ;
    }
    
    // find the most repeated strings in the frequency map, including
    // duplicates
    let max = Math.max(...Object.values(count))
    let candidates = Object.keys(count).filter((key)=>count[key] === max);
    
    //lexical sort then choose the first
    let sorted = candidates.sort();
    return sorted[0]
    
}


```


---

# Advanced Array manipulations

## Merging sorted array

- The expected algorithm for this task uses two pointers, one for each array, and compares the elements pointed to by these pointers, appending the smaller one to the result array. If one of the arrays is exhausted, it simply appends the remaining elements from the other array. This is a classic example of the Two-Pointer Technique, frequently employed in array manipulation problems.

```js
// Merge two sorted arrays
function mergeSortedLists(list1, list2) {
    const mergedList = [];
    let i = 0, j = 0;
    
    // Two-Pointer Technique
    while (i < list1.length && j < list2.length) {
        if (list1[i] < list2[j]) {
            mergedList.push(list1[i]);
            i += 1;
        } else {
            mergedList.push(list2[j]);
            j += 1;
        }
    }
    
    // Append remaining elements
    mergedList.push(...list1.slice(i));
    mergedList.push(...list2.slice(j));
    
    return mergedList;
}

// Example usage
const list1 = [1, 3, 5];
const list2 = [2, 4, 6];
console.log(mergeSortedLists(list1, list2)); // [1, 2, 3, 4, 5, 6]

```

--- 

## Merge 2 sorted arrays

- Instead of using just one pointer and doing continual shift() calls, we use two pointers. This is because each shift() is O(n) (it removes the first element and then re‑indexes the whole array), so doing it repeatedly in a loop would degrade the merge to O(n²). By keeping two index pointers and using constant‑time array access, we maintain an overall linear time complexity, O(arr1.length + arr2.length).

```js
function mergeSortedArrays(arr1, arr2) {
    // Initialize two pointers for each array
    let pointerA = 0;
    let pointerB = 0;
    // This will hold the merged, sorted values
    let result = [];
    
    // Loop until one array is fully consumed
    while (pointerA < arr1.length && pointerB < arr2.length) {
        // Compare current elements from both arrays
        if (arr1[pointerA] < arr2[pointerB]) {
            // If arr1’s element is smaller, append it and advance pointerA
            result.push(arr1[pointerA]);
            pointerA++;
        } else {
            // Otherwise, append arr2’s element and advance pointerB
            result.push(arr2[pointerB]);
            pointerB++;
        }
    }
    
    // At this point, one of the arrays is exhausted.
    // If arr2 is done, append any remaining elements from arr1:
    if (pointerB === arr2.length) {
        result.push(...arr1.slice(pointerA));
    } else {
        // Otherwise, append any remaining elements from arr2:
        result.push(...arr2.slice(pointerB));
    }
    
    // Return the fully merged array
    return result;
}

```

---