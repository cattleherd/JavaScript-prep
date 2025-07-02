function primeFactors(n) {
  const factors = [];
  let sqrtLimit = Math.floor(Math.sqrt(n));

  for(let i = 2; i <= sqrtLimit; i++){
    if(n % i === 0 && isPrime(i)){
        factors.push(i)
    }
  }

  function isPrime(n){
    if(n === 1){
        return false;
    }else if( n === 2){
        return true;
    }
    let sqrtLimit = Math.floor(Math.sqrt(n));
    for( let i = 3; i <= sqrtLimit; i+=2){
        if(n % i === 0){
            return false;
        }
    }
    return true;

  }

  return factors
}

console.log(primeFactors(392))
