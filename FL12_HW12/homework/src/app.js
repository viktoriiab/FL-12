const rootNode = document.getElementById('root');


let terms = [];
rootNode.insertAdjacentHTML('afterbegin', '<button id="add" type="button">Add New</button>');
//tNode.insertAdjacentHTML('beforeend', '<h1></h1>');
rootNode.insertAdjacentHTML('beforeend', `<main><h2 id="list_title"></h2><ul id='list'></ul></main>`);

localStorage.setItem('Game of', 'Современные браузеры он более полнофункциональный,');
localStorage.setItem('Name2', 'Современо менее поддерживаемый. Существуют');
//localStorage.clear();
//localStorage.removeItem('test');
//console.log(localStorage.getItem('Name'));
//console.log(localStorage.getItem('Name2'));

function renderList(list){
    for(let i = 0; i < list.length; i++){
        document.getElementById('list').insertAdjacentHTML('beforeend', `<li id='${list[i].key}'>
        <div class='term'><h3>${list[i].key} : </h3>
        <p>${list[i].value}</p></div><input type='checkbox' name='${list[i].key}'/>
        <div><button>Edit</button><button id='delete'>Remove</button></div></li>`);
    }
}
function loadList(){
    if(!localStorage.length){
        document.getElementById('list_title').innerText = 'Constructor of terms. List of terms is empty';
    }else{
        document.getElementById('list_title').innerText = 'Constructor of terms. List of terms:';
        let keys = Object.keys(localStorage);
        
        for(let key of keys) {
        let term = {};
        term.key = key;
        term.value = localStorage.getItem(key);
        //term.chek = false;
        terms.push(term);
        }
        renderList(terms);
    } 
}

function loadPage(_location) {
    location.hash = _location;
    loadList();
}
addEventListener('load',loadPage('main'));

document.addEventListener('change', function () {
    let chek = event.target; 
    if (chek.tagName === 'INPUT' && chek.type === 'checkbox') {
        let item = document.getElementById(chek.name);
        document.getElementById('list').insertAdjacentElement('beforeend',item);
    }
  });