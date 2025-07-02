function firstOccurrence(arr, target) {
  for(let i = 0; i < arr.length; i++){
    if(arr[i] === target){
        return i;
    }
  }
  return -1
}

console.log(firstOccurrence([1, 2, 3, 4], 3)); // 2
console.log(firstOccurrence([5, 6, 7, 6, 8], 6)); // 1
console.log(firstOccurrence([1, 2, 3], 9)); // -1
console.log(firstOccurrence([], 4)); // -1
