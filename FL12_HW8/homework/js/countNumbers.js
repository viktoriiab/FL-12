function countNumbers(str){
    let obj = {};
    let numbers = '0123456789';
    str.split('').filter(symbl => numbers.includes(symbl)).forEach(numb => {
        obj[numb] = obj[numb] + 1 || 1;
    });
    return obj;  
}
countNumbers('erer384jj4444666888jfd123');