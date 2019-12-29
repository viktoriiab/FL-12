function getMin(){
    let minNumb = Infinity;
    var ArrayOfArgs = Array.from(arguments);
    ArrayOfArgs.forEach(arg => {
        if ( arg < minNumb ){
            minNumb = arg;
        }
    });
    return minNumb;
}
getMin(3,0,-3);