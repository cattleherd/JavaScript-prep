function isPerfectSquare(n) {
    let mid = Math.floor(n / 2);

    if(n === 1){
        return true;
    }
    if( mid * mid > n){
        for(let i = 0; i < mid; i++){
            if(i * i === n){
                return true;
            }
        }
    }else{
        for(let i = mid; i < n; i++){
            if(i * i === n){
                return true;
            }
        }
    }
    return false;

}

    
console.log(isPerfectSquare(1));       // true
console.log(isPerfectSquare(4));       // true
console.log(isPerfectSquare(9));       // true
console.log(isPerfectSquare(16));      // true
console.log(isPerfectSquare(25));      // true
console.log(isPerfectSquare(18));      // false
console.log(isPerfectSquare(26));      // false
console.log(isPerfectSquare(100));     // true
console.log(isPerfectSquare(121));     // true
console.log(isPerfectSquare(1000000)); // true
console.log(isPerfectSquare(999999));  // f