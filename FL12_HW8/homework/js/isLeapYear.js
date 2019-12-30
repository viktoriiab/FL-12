function isLeapYear(str){
    let d = new Date(str);
    let isLeap = false;
    let message = '';
    if( isNaN(d) ){
        message = 'Invalid Date';
    }else {
        let year = d.getFullYear();
        if( year >= 1600 && year <= 2400 ){
            if (year % 4 === 0){
                isLeap = true;
                if( year % 100 === 0 ){
                    isLeap = false;
                }
                if( year % 400 === 0 ){
                    isLeap = true;
                }
            }
            isLeap ? message = '"' + year + '"' + ' is a leap year' 
            : message = '"' + year + '"' + ' is not a leap year';
        }else{
            message = 'Only years from 1600 to 2400'
        }
        
    }
    return message;
}
isLeapYear('2020-01-01 00:00:39');