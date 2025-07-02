/**
 * Circular Array Shift
 * --------------------
 * Shifts the elements of an array to the right by k positions, wrapping around.
 * Does not use built-in slice(), splice(), or shift() methods.
 *
 * @param {number[]} arr - The original array to shift.
 * @param {number} k - Number of positions to shift.
 * @returns {number[]} - The shifted array.
 *
 * Example:
 *   circularShift([1, 2, 3, 4, 5], 2) => [4, 5, 1, 2, 3]
 */
function circularShift(arr, k) {
  //[1,2,3,4,5]
  const result = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    result[(i + k) % arr.length] = arr[i];
  }

  return result;
}

// Example tests:
console.log(circularShift([1, 2, 3, 4, 5], 1)); // [5, 1, 2, 3, 4]
console.log(circularShift([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]
console.log(circularShift([1, 2, 3, 4, 5], 5)); // [1, 2, 3, 4,]()
