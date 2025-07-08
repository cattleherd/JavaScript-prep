function isSubarray(arrayA, arrayB) {
    // TODO: implement solution
    // 1 2 3 4
    //[2,3]
    //  [2,3]   <== match found!
    //[3,2,3,4]
    
    //outer loop range is i = 0; i <= ArrayA.length - ArrayB.length
    // inner loop compares corrosponding elements in ArrayA with ArrayB, shifted by 
    
    if(arrayB.length > arrayA.length){
        return false;
    }
    
    if(arrayB.length === 0){
        return true;
    }
    
    for(let i = 0; i <= (arrayA.length - arrayB.length); i++){
        let match = true;
        for(let j = 0; j < arrayB.length; j++){
            if(arrayB[j] !== arrayA[i + j]){
                match = false;
                break;
            }
        }
        return match;
    }
    

}

module.exports = { isSubarray };