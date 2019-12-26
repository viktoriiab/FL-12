const minDataLength = 5;

let data = {
    user : {
        userEmail : 'user@gmail.com',
        userPassword : 'UserPass'
    },
    admin : {
        adminEmail : 'admin@gmail.com',
        adminPassword : 'AdminPass'
    }
}
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

if( validPass ){
    if ( window.confirm('Do you want to change your password?') ){
        password = prompt('Please, enter again your current password.');
    if( password === null || password.length === 0 ){
        alert('Canceled.');
    }else{
        if( data.user.userPassword === password || data.admin.adminPassword === password ){
            let newPass1 = prompt('Please, enter new password.');
            if( newPass1 === null || newPass1.length === 0 ){
                alert('Canceled.');
            }else{
                if( newPass1.length >= minDataLength ){
                    let newPass2 = prompt('Please, enter new password again.');
                    if( newPass1 === null || newPass1.length === 0 ){
                        alert('Canceled.');
                    }else{
                        if( newPass1 === newPass2 ) {
                            alert('You have successfully changed your password.');
                        }else{
                            alert('You wrote the wrong password.');
                        }
                    }
                }else{
                    alert('It’s too short password. Sorry.');
                }
            }
        }else{
            alert('Wrong password!');
        }
    }
    }else{
        alert('You have failed the change.');
    }
}