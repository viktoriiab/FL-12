const data = {
    user : {
        userEmail : 'user@gmail.com',
        userPassword : 'UserPass'
    },
    admin : {
        adminEmail : 'admin@gmail.com',
        adminPassword : 'AdminPass'
    }
}
const minDataLength = 5;
let validEmail = false;
let validPass = false;
let validLen = true;
let password = '';
let email = prompt('Please, enter your email.');

if( email === null || email.length === 0 ){
    alert('Canceled.');
    validLen = false;
}else{
        while(email.length < minDataLength){
            alert('I don\'t know any emails having name length less than 5 symbols!');
            email = prompt('Please, enter your email.');

            if( email === null || email.length === 0 ){
                alert('Canceled.');
                validLen = false;
                break;
            }
        }      
}

if( validLen ) {
     if ( email === data.user.userEmail || email === data.admin.adminEmail ) {
        validEmail = true;
     }else{
         alert('I don’t know you');
     }
}

if( validEmail ){
    password = prompt('Please, enter your password.');
    if( password === null || password.length === 0 ){
        alert('Canceled.');
    }else{
        if( data.user.userPassword === password || data.admin.adminPassword === password ){
            validPass = true;
        }else{
            alert('Wrong password!');
        }
    }
}

/*if( validPass ){
    if ( window.confirm('Do you want to change your password?') ){

    }
}*/
   /* switch (email) {
        case data.user.userEmail :
            if( data.user.userPassword === password){
                console.log('+');
            }else{
                console.log('wrong');  
            }
            break;
        default:
            console.log('wrong');
    }*/