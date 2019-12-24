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

let email = prompt('Please, enter your email!');

if( email === null || email.length === 0 ){
    alert('Canceled.');
    validLen = false;
}else{
        while(email.length < minDataLength){
            alert('I don\'t know any emails having name length less than 5 symbols!');
            email = prompt('Please, enter your email!');

            if( email === null || email.length === 0 ){
                alert('Canceled.');
                validLen = false;
                break;
            }
        }      
}

if(validLen) {
     if (email === data.user.userEmail || email === data.admin.adminEmail) {
        validEmail = true;
     }else{
         alert('I don’t know you');
     }
}