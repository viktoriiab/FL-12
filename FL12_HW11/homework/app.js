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
  visible : false
}
function isEmpty(){
  const string = 'Folder is empty';
  let empty = document.createElement('span');
  empty.classList.add('hidden');
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
function opening(el){
  while (el) {
    if(el.nextSibling !== null){
      if(el.nextSibling.classList.contains('hidden')){
        el.nextSibling.classList.remove('hidden');
        el.nextSibling.classList.add('visible');
      }
    }
    el = el.nextSibling;
  }
}
function closing(el){
  while (el) {
    if(el.nextSibling !== null){
      if(el.nextSibling.classList.contains('visible')){
        el.nextSibling.classList.remove('visible');
        el.nextSibling.classList.add('hidden');
      }
    }
    el = el.nextSibling;
  }
}
function trigger() {
  document.addEventListener('click', function(event) {
    if(event.toElement.parentNode.classList !== undefined 
    && event.toElement.parentNode.classList !== null){
      let node = event.toElement.parentNode.classList;
      if( node.contains('folder') ){
        if( node.contains('close') ){
          event.target.firstElementChild.innerText = 'folder_open';
          node.remove('close');
          node.add('open');
          opening(event.target);
        }else{
          if(event.target.firstElementChild !== null){
            event.target.firstElementChild.innerText = 'folder';
            node.remove('open');
            node.add('close');
            closing(event.target);
          }
        }
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
      node.classList.add(isFolder(el), isOpen(el), isVisible(state));
      container.appendChild(node);
      if( !el['children'] ){
        if(el['children'] === null || el['children'] === false){
          node.appendChild(isEmpty());
        }
      }else{
          if(node.parentNode.id === 'root'){
            node.classList.remove('hidden');
            node.classList.add('visible');
          }
          render(node,el['children']);
      }

    });
}
render(rootNode, structure);
trigger();