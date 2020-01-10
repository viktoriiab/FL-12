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
executeforEach([1,2,3], function(el) {console.log(el * 2)});

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