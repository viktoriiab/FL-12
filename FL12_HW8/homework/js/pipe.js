function addOne(x) {
    return x + 1;
}  
function pipe(num,...args){
    const reducer = (accumulator, currentValue) => currentValue(accumulator);
    return [...args].reduce(reducer, num);
}
pipe(1,addOne,addOne);