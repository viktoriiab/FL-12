let correctInputes = true;

let a = prompt('Input first value "a" for a quadratic equation:');
let b = prompt('Input second value "b" for a quadratic equation:');
let c = prompt('Input third value "c" for a quadratic equation:');
a = Number(a);
b = Number(b);
c = Number(c);
if ( isNaN(a) || !isFinite(a) || Math.abs(a) === 0 ){
    correctInputes = false;
}else{
    if ( isNaN(b) || !isFinite(b) ) {
        correctInputes = false;
        console.log(typeof b);
    }else {
        if ( isNaN(c) || !isFinite(c) ){
            correctInputes = false;
        }
    }
}
    
console.log(correctInputes);


