function reverseArray(arr) {
  let rev = []
  for(let i = arr.length-1; i >= 0; i--){
    rev.push(arr[i]);
  }
  return rev;
}

console.log(reverseArray([1, 2, 3, 4])); // [4, 3, 2, 1]
console.log(reverseArray([5, 6, 7]));    // [7, 6, 5]
console.log(reverseArray([]));           // []