function nextPrime(n) {
    let next = n+1;

    while(!isPrime(next)){
        next++;
        continue;
    }
    
    function isPrime(n){
        if(n === 1){
            return false; //1 is not prime
        }else if(n ===2){
            return true; //2 is a prime
        }else if(n%2 === 0){
            return false; // if its even its not a prime
        }
        
        let sqrt = Math.floor(Math.sqrt(n)) // only check up to sqrt n

        for(let i = 3; i <= sqrt; i+=2){ //skip all even numbers
            if(n % i === 0){
                return false;
            }
        }
        return true;
    }

    return next;

}




module.exports = { nextPrime };
