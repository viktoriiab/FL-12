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