function areCoPrime(a, b) {
    if(gcd(a,b) === 1){
        return true;
    }else{
        return false;
    }
}


/*Euclidian recursive to find GCD */
function gcd(a, b) {
  if(b === 0){
    return a;
  }

  return gcd(b,a%b)
}

/* Euclidian non recursive to find GCD */
function gcd1(a,b){
    while(b !== 0){
        let temp = b;
        b = a% b;
        a = temp;
    }
    return a;
}



console.log(areCoPrime(8, 15));   // true  (8 and 15 share no common factors)
console.log(areCoPrime(6, 9));    // false (6 and 9 share factor 3)
console.log(areCoPrime(14, 25));  // true
console.log(areCoPrime(21, 28));  // false (common factor 7)
console.log(areCoPrime(17, 19));  // true (both primes)
console.log(areCoPrime(12, 13));  // true
console.log(areCoPrime(100, 10)); // false (common factor 10)
console.log(areCoPrime(1, 99));   // true (1 is coprime with any number)