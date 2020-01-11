const actors = [
    { name: 'tommy', age: 36 },
    { name: 'lee', age: 28 }
];  
const date = new Date(2019, 0, 2);

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
convert('1', 2, 3, '4');

function executeforEach (arr, callback){
    for ( let i = 0; i < arr.length; i++ ){
      callback(arr[i]);
    }
}
executeforEach([1,2,3], function(el){
    console.log(el * 2);
});

function mapArray(arr, callback){
    let transformedArray = [];
    executeforEach(arr, function(el){
        transformedArray.push(callback(el));
    });
    return transformedArray;
}
mapArray([2, '5', 8], function(el){
    if( typeof el !== 'number' ){ 
        return parseInt(el) + 3;
    }
    return el + 3;
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
filterArray([2, 5, 8], function(el){
    return el % 2 === 0; 
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
makeListFromRange([2, 7]);


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
        if( el < 30){ 
            return '*'
        }
        return el;
    });
    return transformedArray;
}
substitute([58, 14, 48, 2, 30, 29]);

function getPastDay(date, num){
    let copiedDate = new Date(date.getTime());
    copiedDate.setDate(date.getDate() - num);
    console.log(copiedDate.getDate());
}
getPastDay(date, 2);