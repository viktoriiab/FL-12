const rootNode = document.getElementById('root');



rootNode.insertAdjacentHTML('afterbegin', '<button id="add" type="button" onclick= "addPage();">Add New</button>');
//rootNode.insertAdjacentHTML('afterbegin', '<input type="text" id="t" size="40">');
//tNode.insertAdjacentHTML('beforeend', '<h1></h1>');
rootNode.insertAdjacentHTML('beforeend', `<div id='container' class='container'>
<h2 id="list_title"></h2><ul id='list'></ul></div>`);
//localStorage.setItem('Game of', 'Современные браузеры он более полнофункциональный,');
//localStorage.setItem('Name2', 'Современо менее поддерживаемый. Существуют');
//localStorage.clear();
//localStorage.removeItem('test');
//console.log(localStorage.getItem('Name'));
//console.log(localStorage.getItem('Name2'));

//localStorage.Name = JSON.stringify({name: 'Name', val: 'qqqsevdfvdqq', checkbox: false});
//localStorage.Name1 = JSON.stringify({name: 'Name1', val : 'qqSWDRGRDqqq', checkbox: false});
//localStorage.Name2 = JSON.stringify({name: 'Name2', val : 'qqSWDRGRDqqq', checkbox: false});
//localStorage.clear();
// немного позже
//let user = JSON.parse( localStorage.str );
//console.log(JSON.parse( localStorage.str ).name);
//console.log(user.def);
//Storage.removeItem(user);
//console.log(sessionStorage.length);
function checkbox(chk){
    if(chk){
        return 'checked=\'checked\'';
    }else{
        return '';
    }
}
function renderItem(key,val,chk){
    let htmlItem = `
    <li id='${key}'>
                <div class='term'><h3>${key} : </h3>
                <p>${val}</p></div>
                <input type='checkbox' name='${key}' ${checkbox(chk)}/>
                <div><button>Edit</button>
                <button name='${key}' onclick='deleteItem();'>Remove</button>
                </div></li>
    `;
    return htmlItem;
}

function loadList(){
    let terms = [];
    if(!localStorage.length){
        document.getElementById('list_title').innerText = 'Constructor of terms. List of terms is empty';
    }else{
        document.getElementById('list_title').innerText = 'Constructor of terms. List of terms:';
        let keys = Object.keys(localStorage);
        
        for(let key of keys) {
        let term = {};
        term.key = JSON.parse( localStorage.getItem(key) ).name;
        term.value = JSON.parse( localStorage.getItem(key) ).val;
        term.chk = JSON.parse( localStorage.getItem(key) ).checkbox;
        terms.push(term);
        }
        for(let i = 0; i < terms.length; i++){
            if(terms[i].chk === false){
                document.getElementById('list').insertAdjacentHTML('afterbegin', 
                renderItem(terms[i].key,terms[i].value,terms[i].chk));
            }else{
                document.getElementById('list').insertAdjacentHTML('beforeend', 
                renderItem(terms[i].key,terms[i].value,terms[i].chk));
            }
        }
    } 
}

function loadPage(_location){
    location.hash = _location;
    loadList();
}
function home(){
    location.hash = 'main';
    document.getElementById('AddPage').classList.add('hidden');
    document.getElementById('container').classList.remove('hidden');
    document.getElementById('add').classList.remove('hidden');

}
function addItem(){
    let termInfo = {};
  
    if( document.getElementById('termName').value !== '' ){
        termInfo.name = document.getElementById('termName').value;
    }else{
        alert('Please, fill name of term!');
    }
    console.log(document.getElementById('definition').value);
    termInfo.val = document.getElementById('definition').value;

    localStorage.setItem(termInfo.name,JSON.stringify({name: termInfo.name, val: termInfo.val, checkbox: false}));

    let firstCheckbox = document.querySelector('input[checked]');
    if(firstCheckbox){
        document.getElementById(firstCheckbox.name).insertAdjacentHTML('beforebegin', 
        renderItem(termInfo.name,termInfo.val,false));
    }else{
        document.getElementById('list').insertAdjacentHTML('afterbegin', 
        renderItem(termInfo.name,termInfo.val,false));
    }
    home();
}


function clearInputs(){
    let inputs = document.querySelectorAll('input.input_term');
    inputs.forEach(el => {
        el.value = '';
    });
}
function addPage(){
    location.hash = 'add';
    document.getElementById('container').classList.add('hidden');
    document.getElementById('add').classList.add('hidden');
    rootNode.insertAdjacentHTML('afterbegin',`
        <div id='AddPage' class='container'>
        <div class='inputs_term'>
        <input type='text' id='termName' class='input_term' placeholder='Enter term'>
        <input type='text' id='definition' class='input_term' placeholder='Enter definition'>
        </div>
        <div class='add_buttons'>
        <button id="addTerm" type='button' onclick='addItem();'>Add term</button>
        <button id="clear" type="button" onclick='clearInputs();'>Remove</button>
        <button id="cancel" type="button" onclick='home();'>Cancel</button>
        </div>
        </div>
    `);
}
function deleteItem(){
    let item = document.getElementById(event.target.name);
    item.remove();
    localStorage.removeItem(event.target.name);
}
document.addEventListener('change', function () {
    let chek = event.target;
    let item = document.getElementById(chek.name);
    if (chek.tagName === 'INPUT' && chek.type === 'checkbox' && chek.checked === true) {    
        document.getElementById('list').insertAdjacentElement('beforeend',item);
        let keys = Object.keys(localStorage);  
        for(let key of keys) {
            if(JSON.parse( localStorage.getItem(key) ).name === chek.name){
               let args = localStorage.getItem(key);
               args = args ? JSON.parse(args) : {};
               args['checkbox'] = true;
               localStorage.setItem(key, JSON.stringify(args));
            }
        }
        chek.setAttribute('checked','checked');
    }

    if(chek.tagName === 'INPUT' && chek.type === 'checkbox' && chek.checked === false){
        document.getElementById('list').insertAdjacentElement('afterbegin',item);
        let keys = Object.keys(localStorage);  
        for(let key of keys) {
            if(JSON.parse( localStorage.getItem(key) ).name === chek.name){
               let args = localStorage.getItem(key);
               args = args ? JSON.parse(args) : {};
               args['checkbox'] = false;
               localStorage.setItem(key, JSON.stringify(args));
            }
        }
        chek.removeAttribute('checked');
    }
  });

  addEventListener('load',loadPage('main'));