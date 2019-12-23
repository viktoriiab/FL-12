const auxiliaryNumb2 = 2;
const auxiliaryNumb4 = 4;
let correctInputes = true;
let x1 = 0, x2 = 0;

let a = prompt('Input first value "a" for a quadratic equation:');
let b = prompt('Input second value "b" for a quadratic equation:');
let c = prompt('Input third value "c" for a quadratic equation:');

a = Number(a);
b = Number(b);
c = Number(c);

if ( isNaN(a) || !isFinite(a) || Math.abs(a) === 0 ){
    correctInputes = false;
}else{
    if ( isNaN(b) || !isFinite(b)) {
        correctInputes = false;
    }else {
        if ( isNaN(c) || !isFinite(c)){
            correctInputes = false;
        }
    }
}

if(!correctInputes){
    console.log('Invalid input data');
}else{
    let discriminant = Math.pow(b, auxiliaryNumb2) - auxiliaryNumb4 * a * c;

    if ( discriminant >= 0 ){
        if ( discriminant === 0 ){
            if(b === 0) {
                console.log('x = ', x1);
            }else{
                x1 = x2 = Math.round(- (b / (auxiliaryNumb2 * a) ) );
                console.log('x = ', x1);
            }
        }else{
            x1 = Math.round( (-b + Math.sqrt(discriminant) ) / (auxiliaryNumb2 * a) );
            x2 = Math.round( (-b - Math.sqrt(discriminant) ) / (auxiliaryNumb2 * a) );
            console.log('x1 = ',x1,'and x2 = ',x2);
        }
    }else{
        console.log('No solution');
    }
}
