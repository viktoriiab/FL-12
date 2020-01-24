const rootNode = document.getElementById('root');



rootNode.insertAdjacentHTML('afterbegin', '<button id="add" type="button">Add New</button>');
//tNode.insertAdjacentHTML('beforeend', '<h1></h1>');
rootNode.insertAdjacentHTML('beforeend', `<main><h2 id="list_title"></h2><ul id='list'></ul></main>`);

localStorage.setItem('Name', 'Современные браузеры он более полнофункциональный,');
localStorage.setItem('Name2', 'Современо менее поддерживаемый. Существуют');
//localStorage.clear();
//localStorage.removeItem('test');
//console.log(localStorage.getItem('Name'));
//console.log(localStorage.getItem('Name2'));

function loadList(){
    if(!localStorage.length){
        document.getElementById('list_title').innerText = 'Constructor of terms. List of terms is empty';
    }else{
        document.getElementById('list_title').innerText = 'Constructor of terms. List of terms:';
        let keys = Object.keys(localStorage);
        for(let key of keys) {
        console.log(`${key}: ${localStorage.getItem(key)}`);
        document.getElementById('list').insertAdjacentHTML('beforeend', `<li><div class='term'><h3>${key} : </h3>
        <p>${localStorage.getItem(key)}</p></div><input type='checkbox' class='checkbox'/>
        <div><button>Edit</button><button>Romove</button></div></li>`);
        }
        
    } 
}
function loadPage(_location) {
    location.hash = _location;
    loadList();
}
addEventListener('load',loadPage('main'));