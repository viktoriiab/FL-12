let correctInputes = false;
let a = prompt('Input first value of side "a" for a triangle:');
let b = prompt('Input second value of side "b" for a triangle:');
let c = prompt('Input third value of side "c" for a triangle:');

if ( a.length < 1 || isNaN(a) || b.length < 1 || isNaN(b) || c.length < 1 || isNaN(c) ){
    console.log('input values should be ONLY numbers!');
}else{
    a = Number(a);
    b = Number(b);
    c = Number(c);

    if( !((a ^ 0) === a && a > 0) || !((b ^ 0) === b && b > 0) || !((c ^ 0) === c && c > 0) ){
        console.log('A triangle must have 3 sides with a positive definite length!');
    }else{
        correctInputes = true;
    }
}