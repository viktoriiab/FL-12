const actors = [
    { name: 'tommy', age: 36 },
    { name: 'lee', age: 28 }
];  
const YEAR = 2019;
const NUMB2 = 2;
const NUMB3 = 3;
const NUMB5 = 5;
const NUMB8 = 8;
const NUMB10 = 10;
const NUMB30 = 30;
const NUMB31 = 31;
const date = new Date(YEAR, 0, NUMB2);

function convert(...theArgs){
    let convertedValues = [];
    for ( let i = 0; i < theArgs.length; i++ ){
        if( typeof theArgs[i] === 'number' ){
            convertedValues[i] = theArgs[i].toString();
        }else{
            convertedValues[i] = parseInt(theArgs[i]);
        }
    }
    return convertedValues;
}
convert('1', NUMB2, NUMB3, '4');

function executeforEach (arr, callback){
    for ( let i = 0; i < arr.length; i++ ){
      callback(arr[i]);
    }
}
executeforEach([1,NUMB2,NUMB3], function(el){
    console.log(el * NUMB2);
});

function mapArray(arr, callback){
    let transformedArray = [];
    executeforEach(arr, function(el){
        transformedArray.push(callback(el));
    });
    return transformedArray;
}
mapArray([NUMB2, '5', NUMB8], function(el){
    if( typeof el !== 'number' ){ 
        return parseInt(el) + NUMB3;
    }
    return el + NUMB3;
});

function filterArray(arr,callback){
    let transformedArray = [];
    executeforEach(arr, function(el){
        if(callback(el)){
            transformedArray.push(el); 
        }
    });
    return transformedArray; 
}
filterArray([NUMB2, NUMB5, NUMB8], function(el){
    return el % NUMB2 === 0; 
});

function flipOver(str){
    let reverseStr = '';
    for ( let i = str.length - 1; i >= 0; i-- ){
        reverseStr += str[i];
    }
    return reverseStr;
}
flipOver('hey world');

function makeListFromRange(arr){
    let transformedArray = [];
    for ( let i = arr[0]; i <= arr[arr.length - 1]; i++ ){
        transformedArray.push(i);
    }
    return transformedArray;
}
makeListFromRange([NUMB2, NUMB8]);


function getArrayOfKeys(objName, key){
    let keysValues = [];
    executeforEach(objName, function(el){
        keysValues.push(el[key]);
    });
    return keysValues;
}
getArrayOfKeys(actors, 'name'); 

function substitute(arr){
    let transformedArray = mapArray(arr, function(el){ 
        if( el < NUMB30){ 
            return '*'
        }
        return el;
    });
    return transformedArray;
}
substitute([NUMB31, NUMB2, NUMB30, NUMB8]);

function getPastDay(date, num){
    let copiedDate = new Date(date.getTime());
    copiedDate.setDate(date.getDate() - num);
    return copiedDate.getDate();
}
getPastDay(date, NUMB2);

function formatDate(date){
    let zeroHours = (date.getHours() < NUMB10 ? '0' : '') + date.getHours();
    let zeroMinutes = (date.getMinutes() < NUMB10 ? '0' : '') + date.getMinutes();
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${zeroHours}:${zeroMinutes}`;
}
formatDate(new Date()); 
