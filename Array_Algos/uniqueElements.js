function countUnique(arr) {
  let obj = {};

 if(arr.length === 0){
    return 0;
 }
 for(let i = 0; i < arr.length; i++){
    if(!obj[arr[i]]){
        obj[arr[i]] = 1;
    }
 }
 return Object.keys(obj).length

}

/*
console.log(countUnique([1, 2, 3, 4]));       // 4
console.log(countUnique([1, 2, 2, 3, 3, 3])); // 3
console.log(countUnique([]));                 // 0
console.log(countUnique([5, 5, 5, 5]));       // 1
*/

console.log(countUnique([1,2,2]))