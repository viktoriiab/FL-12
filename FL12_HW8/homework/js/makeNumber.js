function makeNumber(str){
    let numbers = '0123456789';
    return str.split('').filter(symbl => numbers.includes(symbl)).join('');
}
makeNumber('erer384jjjfd123');