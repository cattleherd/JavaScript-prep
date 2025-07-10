https://codesignal.com/blog/interview-prep/example-codesignal-questions/

# Standard Math Algos

### nth prime

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

### Funding unique prime factors of n

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

module.exports = { getPrimeFactors };
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

module.exports = { countUniqueElements };
```

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

module.exports = { isSubarray };
```

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

module.exports = { solution };
```

### Note:

- we use concat to join 2 arrays, and return the joined array
- we dont return [n].push(some_other_arr) because result of push is length of the new array

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

### Recursive Function: Reverse a String

Here we use string slicing and recursion to reverse a string by peeling off one character at a time.

---

#### How It Works

1. **Base Case**: If the string is empty or has a single character, it is already "reversed." Return it directly.
2. **Recursive Case**:
   - **Peel off** the **last character** using `s.slice(-1)` or `s[s.length - 1]`.
   - **Recurse** on the **remaining substring** (`s.slice(0, -1)`). ello + h => llo + e -> lo + l -> ...
   - **Concatenate** the peeled character **in front** of the reversed remainder.

---

#### Code Example

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
    if(n in memo){ // if there is a cache hit return O(1)
        return memo[n]
    }
    if(n ===0){
        return 0;
    }else if(n === 1){
        return 1;
    }else{
        let result = fibonacci(n-1, memo) + fibonacci(n-2, memo)
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


# Matrices


### isToeplitz

- the algo is to traverse starting from index 1 and row 1, comparing its top left neighbour
- you can traverse the opposite way as well, starting from the end of the row, and comparing 
  the bottom right neighbours instead.

```jsx
function isToeplitz(matrix) {
    console.log(matrix)
    // TODO: implement
    //[
    //  [6 7 8]
    //  [4 6 7]
    //  [1 4 6]
    //]
    
    let rows = matrix.length;
    let cols = matrix[0].length;
    for(let i = 1; i < rows; i++){
        for(let j = 1; j < cols; j++){
            if(matrix[i][j]!== matrix[i-1][j-1]){
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

### Inneficient method O(n * m)

- this method traverses every cell

```jsx
function countLessThan(matrix, target) {
    let rows = matrix.length;
    let cols = matrix[0].length
    let count = 0;
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < cols; j++){
            if(matrix[i][j] < target){
                count++
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
    count += (j + 1);
  }

  return count;
}
```

- my first more efficient method still restarted the column scan when searching at a new row, having pointer j really cuts down unecessary work

```js
function countLessThan(matrix, target) {
    console.log(matrix);
    console.log(target)
    let rows = matrix.length;
    let cols = matrix[0].length
    let count = 0;
    for(let i = 0; i < rows; i++){
        for(let j = cols-1; j >= 0; j-- ){
            if(matrix[i][j] < target){
                count = count + (j+1)
                break;
            }
        }
    }
    console.log(count)
    return count;
}
```

- worst case this is O(row*col) still due to nested loops!

---