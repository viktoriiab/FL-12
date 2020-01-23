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
  open :'false',
  visible : 'true'
}
function isEmpty(){
  const string = 'Folder is empty';
  let empty = document.createElement('p');
  empty.innerHTML = string;
  return empty;
}

function setClasses(element, state){
  let _class = 'insert_drive_file';
  if(element['folder']){
    _class = 'folder';
  }
  if(state !== undefined){
    if(state === true){
      _class += ' open';
    }else{
      _class += ' close';
    }
  }
  return _class;
}

function trigger() {
  document.addEventListener('click', function(event) {
    console.log(event.toElement);
    let node = event.toElement.classList;
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
function render(container,_obj, state){
  for (let i = 0; i < _obj.length; i++){

    let node = document.createElement('div');
    node.innerHTML = `
    <div class = '${setClasses(_obj[i], state.open)}'>
    <i class='material-icons'>${setClasses(_obj[i])}</i>
    ${_obj[i]['title']}</div>
    `;

    if( !_obj[i]['children'] ){
      if(_obj[i]['children'] === null || _obj[i]['children'] === false){
        node.appendChild(isEmpty());
      }
    }else{
      render(node,_obj[i]['children'], state);
    }
    container.appendChild(node);   
  }
}


render(rootNode, structure, state);
trigger();