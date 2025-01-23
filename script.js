let getItem;
let completeds;
const textList = [];
const bgList = [];
const classItem = [];

// selecionando as sections
const input = document.getElementsByTagName('section')[0];
const output = document.getElementsByTagName('section')[1];
output.className = 'my-3';
const edit = document.getElementsByTagName('section')[2];

// adicionando instruções
const notice = document.createElement('p');
notice.id = 'funcionamento';
notice.innerHTML = 'Clique duas vezes em um item para marcá-lo como completo';
input.appendChild(notice);

// criando input das tarefas
const divInputItem = document.createElement('div');
divInputItem.classList.add('form-floating');
divInputItem.id = 'input';
divInputItem.style.marginBottom = '10px';
input.appendChild(divInputItem);

const labelInputItem = document.createElement('label');
labelInputItem.innerHTML = 'Digite sua tarefa aqui:';
labelInputItem.style.fontSize = '12px';
labelInputItem.style.margin = '0px';
divInputItem.appendChild(labelInputItem);

const inputItem = document.createElement('input');
inputItem.id = 'floatingInput';
inputItem.type = 'text';
inputItem.placeholder = 'Uma tarefa';
inputItem.className = 'form-control';
inputItem.style.width = '70%';
inputItem.style.height = '80px';
labelInputItem.htmlFor = inputItem.id;
divInputItem.appendChild(inputItem);

// cria a lista de saída
const list = document.createElement('ol');
list.id = 'lista-tarefas';
output.appendChild(list);

// func
const attItem = () => {
  getItem = document.getElementsByTagName('li');
};

// seleciona tarefa
const selectItem = (target) => {
  const bgColor = target.target.style.backgroundColor;
  if (bgColor === 'grey') {
    // eslint-disable-next-line no-param-reassign
    target.target.style.backgroundColor = 'white';
  } else if (bgColor === 'white') {
    for (let index = 0; index < getItem.length; index += 1) {
      getItem[index].style.backgroundColor = 'white';
    }
    // eslint-disable-next-line no-param-reassign
    target.target.style.backgroundColor = 'grey';
  }
};

// marca a tarefa como concluída
const completed = (target) => {
  const classLength = target.target.classList.length;
  if (classLength === 1) {
    target.target.classList.remove('completed');
  } else if (classLength === 0) {
    target.target.classList.add('completed');
  }
  completeds = document.getElementsByClassName('completed');
};

// botão de adicionar item
const button = document.createElement('button');
button.id = 'criar-tarefa';
button.innerHTML = 'Criar Tarefa';
button.classList.add('btn', 'btn-primary');
input.appendChild(button);
button.addEventListener('click', () => {
  const listItem = document.createElement('li');
  listItem.innerHTML = inputItem.value;
  listItem.style.backgroundColor = 'white';
  list.appendChild(listItem);
  inputItem.value = '';
  attItem();
  for (let index = 0; index < getItem.length; index += 1) {
    getItem[index].addEventListener('click', selectItem);
  }
  for (let index = 0; index < getItem.length; index += 1) {
    getItem[index].addEventListener('dblclick', completed);
  }
});

// apaga tudo
const clearButton = document.createElement('button');
clearButton.id = 'apaga-tudo';
clearButton.innerHTML = 'Apagar Tudo';
clearButton.classList.add('btn', 'btn-danger', 'mx-1');
edit.appendChild(clearButton);
clearButton.addEventListener('click', () => {
  attItem();
  for (let index = 0; index <= getItem.length + 1; index += 1) {
    getItem[0].remove();
  }
});

// apaga os completos
const clearCompleted = document.createElement('button');
clearCompleted.id = 'remover-finalizados';
clearCompleted.innerHTML = 'Remover Finalizados';
clearCompleted.classList.add('btn', 'btn-warning', 'mx-1');

edit.appendChild(clearCompleted);
clearCompleted.addEventListener('click', () => {
  completeds = document.getElementsByClassName('completed');
  for (let index = 0; index <= completeds.length + 1; index += 1) {
    completeds[0].remove();
  }
});

// informações importantes da lista;
const infoList = () => {
  for (let index = 0; index < getItem.length; index += 1) {
    textList.push(getItem[index].innerHTML);
    bgList.push(getItem[index].style.backgroundColor);
    classItem.push(getItem[index].classList[0]);
  }
};

// botão de salvar a lista
const saveList = document.createElement('button');
saveList.id = 'salvar-tarefas';
saveList.innerHTML = 'Salvar Lista';
saveList.classList.add('btn', 'btn-success', 'mx-1');
edit.appendChild(saveList);
saveList.addEventListener('click', () => {
  attItem();
  infoList();
  localStorage.setItem('textList', JSON.stringify(textList));
  localStorage.setItem('styleList', JSON.stringify(bgList));
  localStorage.setItem('classList', JSON.stringify(classItem));
});

// carregar lista ao recarregar a página

const savedText = JSON.parse(localStorage.getItem('textList'));
const savedStyle = JSON.parse(localStorage.getItem('styleList'));
const savedClass = JSON.parse(localStorage.getItem('classList'));
if (savedText) {
  for (let index = 0; index < savedText.length; index += 1) {
    const listItem = document.createElement('li');
    listItem.innerHTML = savedText[index];
    listItem.style.background = savedStyle[index];
    if (savedClass[index] !== 'null') {
      listItem.className = savedClass[index];
    }
    list.appendChild(listItem);
    attItem();
    // eslint-disable-next-line no-shadow
    for (let index = 0; index < getItem.length; index += 1) {
      getItem[index].addEventListener('click', selectItem);
    }
    // eslint-disable-next-line no-shadow
    for (let index = 0; index < getItem.length; index += 1) {
      getItem[index].addEventListener('dblclick', completed);
    }
  }
}

// botão de mover item selecionado
const moveUp = document.createElement('button');
moveUp.id = 'mover-cima';
moveUp.innerHTML = '^';
moveUp.classList.add('btn', 'btn-info', 'mx-1');

edit.appendChild(moveUp);
moveUp.addEventListener('click', () => {
  attItem();
  infoList();
  for (let index = 0; index < getItem.length; index += 1) {
    if (bgList[index] === 'grey') {
      // texto
      const holdText = getItem[index].innerHTML;
      getItem[index].innerHTML = getItem[index - 1].innerHTML;
      getItem[index - 1].innerHTML = holdText;
      // style
      const holdStyle = getItem[index].style.backgroundColor;
      getItem[index].style.backgroundColor = getItem[index - 1].style.backgroundColor;
      getItem[index - 1].style.backgroundColor = holdStyle;
      // class
      const holdClass = getItem[index].classList;
      getItem[index].classList = getItem[index - 1].classList;
      getItem[index - 1].classList = holdClass;
    }
  }
});

const moveDown = document.createElement('button');
moveDown.id = 'mover-baixo';
moveDown.innerHTML = 'v';
moveDown.classList.add('btn', 'btn-info', 'mx-1');

edit.appendChild(moveDown);

// botão que remove o selecionado
const selectedRemove = document.createElement('button');
selectedRemove.id = 'remover-selecionado';
selectedRemove.innerHTML = 'Remover Selecionado';
selectedRemove.classList.add('btn', 'btn-danger', 'mx-1');

edit.appendChild(selectedRemove);
selectedRemove.addEventListener('click', () => {
  attItem();
  infoList();
  for (let index = 0; index < getItem.length; index += 1) {
    if (bgList[index] === 'grey') {
      getItem[index].remove();
    }
  }
});
