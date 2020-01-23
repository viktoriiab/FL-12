const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');

let state = {
  open : false,
  visible : true
}
function isEmpty(){
  const string = 'Folder is empty';
  let empty = document.createElement('span');
  empty.innerHTML = string;
  return empty;
}


function isFolder(element){
  let _class = '';
  element['folder'] ? _class = 'folder' : _class = 'insert_drive_file';
  return _class;
}
function isOpen(element){
  let _class = '';
  element.open ? _class += 'open' : _class += 'close';
  return _class;
}
function isVisible(element){
  let _class = '';
  element.visible ? _class += 'visible' : _class += 'hidden';
  return _class;
}
function trigger() {
  document.addEventListener('click', function(event) {
    let node = event.toElement.parentNode.classList;
    console.log(node);
    if( node.contains('folder') ){
      if( node.contains('close') ){
        event.target.firstElementChild.innerText = 'folder_open';
        node.remove('close');
        node.add('open');
      }else{
        event.target.firstElementChild.innerText = 'folder';
        node.remove('open');
        node.add('close');
      }
    }
  });
}



function render(container,_obj){
    
    _obj.forEach(el => {
      let node = document.createElement('div');
      let icon = document.createElement('i');
      let p = document.createElement('p');
      icon.innerHTML += `${isFolder(el)}`;
      icon.classList.add('material-icons');
      
      p.appendChild(icon);
      p.innerHTML += `${el['title']}`;
      
      
      node.appendChild(p);
      node.classList.add(isFolder(el), isOpen(el), isVisible(el));
      container.appendChild(node);
      
      if( !el['children'] ){
        if(el['children'] === null || el['children'] === false){
          node.appendChild(isEmpty());
        }
      }else{
          render(node,el['children']);
      }

    });
    /*let node = node.innerHTML += `
    <div class = '${setClasses(_obj[i], state)}'>
    <i class='material-icons'>${setClasses(_obj[i])}</i>
    ${_obj[i]['title']}</div>
    `;
    console.log(node);*/

 /* for (let i = 0; i < _obj.length; i++){
    let node = document.createElement('div');
    container.innerHTML += `
    <div class = '${setClasses(_obj[i], state)}'>
    <i class='material-icons'>${setClasses(_obj[i])}</i>
    ${_obj[i]['title']}</div>
    `;
    container.appendChild(node);

    if( !_obj[i]['children'] ){
      if(_obj[i]['children'] === null || _obj[i]['children'] === false){
       container.appendChild(isEmpty());
      }
    }else{
      render(container.firstElementChild,_obj[i]['children'], state);
    }*/

    /*console.log(container.children.length);
    for(let j = 0; j < container.children.length; j++){

    console.log(container.children[j]);
    container.children[j].appendChild(isEmpty());
    }
      
    }*/
    
    
    

    /*if( !_obj[i]['children'] ){
      if(_obj[i]['children'] === null || _obj[i]['children'] === false){
        node.appendChild(isEmpty());
      }
    }else{
      if( node.parentNode.id === 'root'){
        let defaultFolder = node.firstChild.nextSibling.classList;
        defaultFolder.remove('hidden');
        defaultFolder.add('visible');
      }
      render(node,_obj[i]['children'], state);
    }*/
      
  
}

render(rootNode, structure);
trigger();

