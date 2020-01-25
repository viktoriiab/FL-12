const rootNode = document.getElementById('root');
const _null = 0;
let counterSet = localStorage.length;


rootNode.insertAdjacentHTML('afterbegin', '<button id="add" type="button" onclick= "addPage();">Add New</button>');
rootNode.insertAdjacentHTML('beforeend', `<div id='container' class='container'>
<h2 id="list_title"></h2><ul id='list'></ul></div>`);
rootNode.insertAdjacentHTML('afterbegin',`
        <div id='addpage' class='container hidden'>
        <h2>Add new term</h2>
        <div class='inputs_term'>
            <input type='text' id='termName' class='input_term' placeholder='Enter term'>
            <input type='text' id='definition' class='input_term' placeholder='Enter definition'>
        </div>
        <div class='add_buttons'>
            <button id="addTerm" type='button' onclick='addTerm();'>Add term</button>
            <button id="clear" type="button" onclick='clearInputs();'>Remove</button>
            <button id="cancel" type="button" onclick="home('addpage');">Cancel</button>
        </div>
        </div>
    `);
function checkbox(chk){
    if(chk){
        return 'checked=\'checked\'';
    }else{
        return '';
    }
}
function renderItem(id,name,val,chk){
    let htmlItem = `
    <li id='${id}'>
    <div class='term'>
      <h3>${name} : </h3>
      <p>${val}</p>
    </div>
    <input type='checkbox' name='${id}' ${checkbox(chk)} />
    <div><button name='${id}' onclick='editItem();'>Edit</button>
      <button name='${id}' onclick='deleteItem();'>Remove</button>
    </div>
    </li>
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
        term.id = key;
        term.name = JSON.parse( localStorage.getItem(key) ).name;
        term.value = JSON.parse( localStorage.getItem(key) ).val;
        term.chk = JSON.parse( localStorage.getItem(key) ).checkbox;
        terms.push(term);
        }
        for(let i = 0; i < terms.length; i++){
            if(terms[i].chk === false){
                document.getElementById('list').insertAdjacentHTML('afterbegin', 
                renderItem(terms[i].id, terms[i].name,terms[i].value,terms[i].chk));
            }else{
                document.getElementById('list').insertAdjacentHTML('beforeend', 
                renderItem(terms[i].id, terms[i].name,terms[i].value,terms[i].chk));
            }
        }
    } 
}
function loadPage(_location){
    location.hash = _location;
    loadList();
    
}
function home(page){
    location.hash = 'main';
    document.getElementById(page).classList.add('hidden');
    document.getElementById('container').classList.remove('hidden');
    document.getElementById('add').classList.remove('hidden');

}
function addTerm(){
    let termInfo = {};
    let valNull = true;
    let valName = document.getElementById('termName').value;
    if( valName !== '' ){
        termInfo.name = valName;
        valNull = false;
    }else{
        alert('Please, fill name of term!');
    }

    if(!valNull){
        console.log(counterSet);
        termInfo.id = counterSet;
        counterSet++;
        termInfo.val = document.getElementById('definition').value;
        localStorage.setItem(termInfo.id,JSON.stringify({name: termInfo.name, val: termInfo.val, checkbox: false}));
    
        let firstCheckbox = document.querySelector('input[checked]');
        if(firstCheckbox){
            document.getElementById(firstCheckbox.name).insertAdjacentHTML('beforebegin', 
            renderItem(termInfo.id, termInfo.name,termInfo.val,false));
        }else{
            document.getElementById('list').insertAdjacentHTML('afterbegin', 
            renderItem(termInfo.id, termInfo.name,termInfo.val,false));
        }
        home('addpage');
    }
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
    document.getElementById('addpage').classList.remove('hidden');
    clearInputs();
}
function saveItem(termId){
    let termInfo = {};
    let valNull = true;
    let valName = document.getElementById('termName').value;
    if( valName !== '' ){
        termInfo.name = valName;
        valNull = false;
    }else{
        alert('Please, fill name of term!');
    }
    if(!valNull){
        termInfo.val = document.getElementById('definition').value;
        let keys = Object.keys(localStorage);  
            for(let key of keys) {
                if(key === termId.toString()){
                  let args = localStorage.getItem(key);
                    args = args ? JSON.parse(args) : {};
                    args['name'] = termInfo.name;
                    args['val'] = termInfo.val;
                    localStorage.setItem(key, JSON.stringify(args));
                }
            }
            document.getElementById(termId.toString()).getElementsByTagName('h3')[_null].innerText = termInfo.name;
            document.getElementById(termId.toString()).getElementsByTagName('p')[_null].innerText = termInfo.val;
        home('editpage');
        document.getElementById('editpage').remove();
    } 
}
function editItem(){
    location.hash = 'modify/:item';
    let item = document.getElementById(event.target.name);
    document.getElementById('container').classList.add('hidden');
    document.getElementById('add').classList.add('hidden');
    rootNode.insertAdjacentHTML('afterbegin',`
    <div id='editpage' class='container'>
    <h2>Edit term</h2>
    <div class='inputs_term'>
      <input type='text' id='termName' class='input_term' value='${item.getElementsByTagName('h3')[_null].innerText}'>
      <input type='text' id='definition' class='input_term' value='${item.getElementsByTagName('p')[_null].innerText}'>
    </div>
    <div class='add_buttons'>
      <button id="addTerm" type='button' onclick='saveItem(${item.id});'>Save changes</button>
      <button id="cancel" type="button" onclick="home('editpage');">Cancel</button>
    </div>
    </div>
    `); 
}
function deleteItem(){
    let item = document.getElementById(event.target.name);
    item.remove();
    localStorage.removeItem(event.target.name);
    if(localStorage.length === _null){
        document.getElementById('list_title').innerText = 'Constructor of terms. List of terms is empty';
    }
}
document.addEventListener('change', function () {
    let chek = event.target;
    let item = document.getElementById(chek.name);
    if (chek.tagName === 'INPUT' && chek.type === 'checkbox' && chek.checked === true) {    
        document.getElementById('list').insertAdjacentElement('beforeend',item);
        let keys = Object.keys(localStorage);  
        for(let key of keys) {
            if(key === chek.name){
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
            if(key === chek.name){
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