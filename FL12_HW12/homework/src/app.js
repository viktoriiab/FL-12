const _null = 0;
let newTerm = {};
let modTerm = null;
let counterSet = localStorage.length;

function checkbox(chk){
    if(chk){
        return 'checked=\'checked\'';
    }else{
        return '';
    }
}
function getElement(node,id){
    let i;
    node.childNodes.forEach(child => {
        if(child.id === id){
            i = child;
        }
    });
    return i;
}
function renderTerm(id,name,val,chk){
    let htmlItem = `<li id='${id}'><div class='term'>
    <h3>${name}</h3><p>${val}</p></div>
    <input type='checkbox' name='${id}' ${checkbox(chk)} />
    <a href='#/modify/:item' class='edit'>Edit</a>
    <button name='${id}' onclick='deleteTerm();'>Remove</button>
    </li>
    `;
    return htmlItem;
}
function deleteTerm(){
    let item = document.getElementById(event.target.name);
    item.remove();
    localStorage.removeItem(event.target.name);
    if(localStorage.length === _null){
        document.getElementById('list_title').innerText = 'Constructor of terms. List of terms is empty';
    }
}

function getContent(pageId, callback){
    function main(){
        let terms = [];
        let node = document.createElement('div');
        node.setAttribute('id','container');
        node.setAttribute('class','container');
        node.insertAdjacentHTML('beforeend',`<a href='#add' id='addBtn'>Add new</a>
        <h2 id='list_title'></h2><ul id='list' class='list'></ul>`);

                if(!localStorage.length){
                    getElement(node,'list_title').textContent = 'Constructor of terms. List of terms is empty';
                }else{
                    getElement(node,'list_title').textContent = 'Constructor of terms. List of terms:';
                    let keys = Object.keys(localStorage);   
                    for(let key of keys) {
                        let term = {};
                        term.id = key;
                        term.name = JSON.parse( localStorage.getItem(key) ).name;
                        term.value = JSON.parse( localStorage.getItem(key) ).val;
                        term.chk = JSON.parse( localStorage.getItem(key) ).checkbox;
                        terms.push(term);
                    }

                }
                terms.forEach(term => {
                    if(term.chk === false){
                        getElement(node,'list').insertAdjacentHTML('afterbegin',
                        renderTerm(term.id, term.name,term.value,term.chk));
                    }else{
                        getElement(node,'list').insertAdjacentHTML('beforeend',
                        renderTerm(term.id, term.name,term.value,term.chk));
                    }
                });
                if(newTerm.isNew){
                    let firstCheckbox = node.querySelector('input[checked]');
                    if(!firstCheckbox){
                        node.querySelector('.list').insertAdjacentHTML('afterbegin',
                        renderTerm(newTerm.info.id, newTerm.info.name,newTerm.info.val,false));
                    }else{
                        console.log(node.querySelector('.list'));
                        getElement(getElement(node,'list'),firstCheckbox.name).insertAdjacentHTML('beforebegin', 
                        renderTerm(newTerm.info.id, newTerm.info.name,newTerm.info.val,false));
                    }
                    localStorage.setItem(newTerm.info.id,JSON
                    .stringify({name: newTerm.info.name, val: newTerm.info.val, checkbox: false}));
                    newTerm.isNew = false;
                }
        return node.outerHTML;
    }

    function add(){
        let node = document.createElement('div');
        node.setAttribute('addpage','container');
        node.setAttribute('class','container');
        node.insertAdjacentHTML('afterbegin',`       
        <h2>Add new term</h2>
        <form id='f'>
        <div class='inputs_term'>
            <input type='text' id='termName' class='input_term' placeholder='Enter term'>
            <input type='text' id='definition' class='input_term' placeholder='Enter definition'>
        </div>
        <div class='add_buttons'>
            <button id='addT' type='submit'>Add term</button>
            <button id="clear" type="reset">Remove</button>
            <a href='#main'>Cancel</a> 
        </div>
        </form>
        
    `);

        return node.outerHTML;
    }
    function modify(){
        let info = {};
        if(modTerm){
            info.name = modTerm.querySelector('h3').textContent;
            info.def = modTerm.querySelector('p').textContent;
        }
        let node = document.createElement('div');
        node.setAttribute('editpage','container');
        node.setAttribute('class','container');
        node.insertAdjacentHTML('afterbegin',`
        <h2>Edit term</h2>
        <form>
        <div class='inputs_term'>
            <input type='text' id='termName' class='input_term' value='${info.name}'>
            <input type='text' id='definition' class='input_term' value='${info.def}'>
        </div>

            <button type='button' id='save'>Save changes</button>
            <a href='#main'>Cancel</a>

        </form>
        `); 
        Location.host = 'item';
        return node.outerHTML;
    }

    let pages = {
    main: `${main()}`,
    add: `${add()}`,
    '/modify/:item': `${modify()}`
    };

    callback(pages[pageId]);
  }

function navigate(){
    let rootNode = document.getElementById('root'),
    pageId = location.hash.substr(1);
    getContent(pageId, function (content) {
        rootNode.innerHTML = content;
    });
  }

if(!location.hash) {
    location.hash = '#main';
}

navigate();

window.addEventListener('hashchange', navigate);
window.addEventListener('click', function (e) {
    if (e.target.className === 'edit') {
        modTerm = e.target.parentNode;
    }
    if (e.target.id === 'save') {
        let termInfo = {};

        termInfo.name = document.getElementById('termName').value;
        termInfo.val = document.getElementById('definition').value;
        let keys = Object.keys(localStorage);  
            for(let key of keys) {
                if(key === modTerm.id.toString()){
                  let args = localStorage.getItem(key);
                    args = args ? JSON.parse(args) : {};
                    args['name'] = termInfo.name;
                    args['val'] = termInfo.val;
                    localStorage.setItem(key, JSON.stringify(args));
                }
            }
        location.hash = 'main';
    }
});
window.addEventListener('submit', function(e){
    let _new = true;
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
        termInfo.id = counterSet;
        counterSet++;
        termInfo.val = document.getElementById('definition').value;
        newTerm.isNew = _new;
        newTerm.info = termInfo;
        location.hash = '#main';
    }
 });
window.addEventListener('change', function () {
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