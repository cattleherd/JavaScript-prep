/**
 * Checks if `sub` appears as a contiguous subarray inside `arr`.
 *
 * @param {number[]} arr - The main array.
 * @param {number[]} sub - The subarray to search for.
 * @returns {boolean} - True if `sub` is found contiguously in `arr`, otherwise false.
 */

function isContiguousSubarray(arr, sub) {
  let start = 0;                     // Start index for each window in arr
  let limit = arr.length - sub.length; // Last valid starting index

  while (start <= limit) {
    let match = true;                // Assume this window matches

    // Compare each element in sub to the corresponding element in arr
    for (let j = 0; j < sub.length; j++) {
      if (arr[start + j] !== sub[j]) {
        match = false;               // Mismatch found
        break;                       // Stop checking this window
      }
    }

    if (match) return true;          // Found a matching window, exit early

    start++;                         // Move to next window position (match false from mismatch)
  }

  return false;                      // Checked all windows, no match found
}

// Example test:
console.log(isContiguousSubarray([1, 2, 3, 4, 2, 3, 4, 3], [1, 2, 3, 4, 2, 1])); // false
