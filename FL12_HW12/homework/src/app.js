const rootNode = document.getElementById('root');



rootNode.insertAdjacentHTML('afterbegin', '<button id="add" type="button">Add New</button>');
//rootNode.insertAdjacentHTML('afterbegin', '<input type="text" id="t" size="40">');
//tNode.insertAdjacentHTML('beforeend', '<h1></h1>');
rootNode.insertAdjacentHTML('beforeend', `<main><h2 id="list_title"></h2><ul id='list'></ul></main>`);
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
function renderList(list){
    
    for(let i = 0; i < list.length; i++){
        if(list[i].chk === false){
            document.getElementById('list').insertAdjacentHTML('afterbegin', `
            <li id='${list[i].key}'>
            <div class='term'><h3>${list[i].key} : </h3>
            <p>${list[i].value}</p></div>
            <input type='checkbox' name='${list[i].key}' ${checkbox(list[i].chk)}/>
            <div><button>Edit</button>
            <button name='${list[i].key}' onclick='deleteItem();'>Remove</button>
            </div></li>`);
        }else{
            document.getElementById('list').insertAdjacentHTML('beforeend', `
            <li id='${list[i].key}'>
            <div class='term'><h3>${list[i].key} : </h3>
            <p>${list[i].value}</p></div>
            <input type='checkbox' name='${list[i].key}' ${checkbox(list[i].chk)}/>
            <div><button>Edit</button>
            <button name='${list[i].key}' onclick='deleteItem();'>Remove</button></div></li>`);
        }
        
    }
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
        console.log(terms);
        renderList(terms);
    } 
}

function loadPage(_location){
    location.hash = _location;
    loadList();
}
addEventListener('load',loadPage('main'));
function deleteItem(){
    let item = document.getElementById(event.target.name);
    item.remove();
    localStorage.removeItem(event.target.name);
}
document.addEventListener('change', function () {
    let chek = event.target; 
    console.log(event);
    if (chek.tagName === 'INPUT' && chek.type === 'checkbox' && chek.checked === true) {
        let item = document.getElementById(chek.name);
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
    }

    if(chek.tagName === 'INPUT' && chek.checked === false){
        let keys = Object.keys(localStorage);
        
        for(let key of keys) {
            if(JSON.parse( localStorage.getItem(key) ).name === chek.name){
               let args = localStorage.getItem(key);
               args = args ? JSON.parse(args) : {};
               args['checkbox'] = false;
               localStorage.setItem(key, JSON.stringify(args));
            }
        }
    }
  });