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
const string = 'Folder is empty';

function render(container,_obj){

  let empty = document.createElement('p');
  empty.innerHTML = string;

  for (let i = 0; i < _obj.length; i++){
    let _class = 'insert_drive_file';
    let node = document.createElement('div');

    if(_obj[i]['folder']){
      _class = 'folder';
    }

    node.innerHTML = `
      <div class = ${_class}><i class='material-icons'>${_class}</i>${_obj[i]['title']}</div>
    `;

    if( !_obj[i]['children'] ){
      if(_obj[i]['children'] === null || _obj[i]['children'] === false){
        node.appendChild(empty);
      }
    }else{
      render(node,_obj[i]['children']);
    }

    container.appendChild(node);
  }
}
render(rootNode, structure);
