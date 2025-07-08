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

2) O(sqrtn) version

```jsx
function getPrimeFactors(n) {
  const factors = [];

  // --- pull out 2’s once ---
  if (n % 2 === 0) {
    factors.push(2);          // record the prime 2
    while (n % 2 === 0) n /= 2; // divide n by 2 until it’s odd
  }

  // --- test only odd p up to √n ---
  for (let p = 3; p * p <= n; p += 2) {
    if (n % p === 0) {
      factors.push(p);        // record p once
      while (n % p === 0) n /= p; // strip all multiples of p
    }
  }

  // --- anything left >1 is a prime factor too ---
  if (n > 1) factors.push(n);

  return factors;
}


```

1) here we reduce n by each factor
 - first we remove all 2s (2*2*2*2) by first adding the factor 2, then repeatedly dividing by 2 until odd

2) then we test all odd p until sqrt(n) since relationship that n = m * n where m and n are factors, and either m or n are guaranteed to be <= sqrt(n)
 
  - everytime we find an odd p factor, we repeatedly divide n by p to remove it.

3) if the final n is > 1 its still a prime so we push it too.


# Arrays

## Problem 

- You are given an array of n integers. Your task is to return the number of unique elements in the array — an element is unique if it appears only once in the array. You cannot use any built-in JavaScript functions to achieve this. **Do not** use any built-in JavaScript methods (like `Set`, `filter`, etc.).

- For example, countUniqueElements([1, 2, 3, 2, 4]) = 3, as there are three unique elements in the list - 1, 3, and 4.

---

```jsx
function countUniqueElements(arr) {
    // TODO: Implement the function that counts unique elements in the given array.
    
    let count = 0; //number of unique elements
    
    let found = {} //track elements found
    
    for(let i = 0; i < arr.length; i++){
        // if element already counted, its not unique so remove it from count
        if(found[arr[i]] && found[arr[i]] === 'counted'){
            found[arr[i]] = 'removed';
            count--;
        }
        //if a element is found to be unique (thus far), add it to the counted object
        // and increment the global counter
        if(!found[arr[i]]){
            found[arr[i]] = 'counted';
            count+=1;
        }
    }

    return count > 0 ? count : 0; //return count or 0 if no unique elements.
}

module.exports = { countUniqueElements };

```



## Circular shift in arrays

### Problem 

- Your task is to create a JavaScript function that should shift every element in the array to the right    (for a positive shift) or to the left (for a negative shift) by shift positions. The shift should be circular — the last element should be moved to the start of the array if shift is positive, and vice versa

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
