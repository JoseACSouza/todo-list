let getItem;
let completeds;
let textList = [];
let bgList = [];
let classItem = [];
//selecionando as sections
const input = document.getElementsByTagName('section')[0];
const output = document.getElementsByTagName('section')[1];

//adicionando instruções
const notice = document.createElement('p');
notice.id = 'funcionamento';
notice.innerHTML = 'Clique duas vezes em um item para marcá-lo como completo';
input.appendChild(notice);

//criando input das tarefas
const inputItem = document.createElement('input');
inputItem.id = 'texto-tarefa';
input.appendChild(inputItem);

//cria a lista de saída
const list = document.createElement('ol');
list.id = 'lista-tarefas';
output.appendChild(list);

//botão de adicionar item
const button = document.createElement('button');
button.id = 'criar-tarefa';
button.innerHTML = 'Criar Tarefa';
input.appendChild(button);
button.addEventListener('click', ()=>{
    const listItem = document.createElement('li');
    listItem.innerHTML = inputItem.value;
    listItem.style.backgroundColor = 'white';
    list.appendChild(listItem);
    inputItem.value = '';
    attItem();
    for (let index = 0; index < getItem.length; index+=1) {
        getItem[index].addEventListener('click', selectItem);
    }
    for (let index = 0; index < getItem.length; index+=1) {
        getItem[index].addEventListener('dblclick', completed);
    }
  
});
const attItem = ()=>{
    getItem = document.getElementsByTagName('li');
}

//seleciona tarefa
const selectItem = (target)=>{
    let bgColor = target.target.style.backgroundColor;
    if(bgColor=='grey'){
        target.target.style.backgroundColor = 'white';
    }else if (bgColor == 'white'){
        for (let index = 0; index < getItem.length; index+=1) {
            getItem[index].style.backgroundColor='white';
        }
        target.target.style.backgroundColor='grey'};
}

//marca a tarefa como concluída
const completed = (target)=>{
    let classLength = target.target.classList.length;
    if(classLength==1){
        target.target.classList.remove('completed');
    }else if (classLength==0){
        target.target.classList.add('completed');
}
completeds = document.getElementsByClassName('completed');
}

//apaga tudo
const clearButton = document.createElement('button');
clearButton.id = 'apaga-tudo';
clearButton.innerHTML = 'Apagar Tudo';
input.appendChild(clearButton);
clearButton.addEventListener('click',()=>{
    attItem();
    for (let index = 0; index <= getItem.length+10; index+=1) {
        getItem[0].remove();
    }
});

//apaga os completos
const clearCompleted = document.createElement('button');
clearCompleted.id = 'remover-finalizados';
clearCompleted.innerHTML = 'Remover Finalizados';
input.appendChild(clearCompleted);
clearCompleted.addEventListener('click',()=>{
    completeds = document.getElementsByClassName('completed');
    for (let index = 0; index <= completeds.length+1; index+=1) {
        completeds[0].remove();
    }
});

//informações importantes da lista;
const infoList = ()=>{
    for (let index = 0; index < getItem.length; index+=1) {
        textList.push(getItem[index].innerHTML);
        bgList.push(getItem[index].style.backgroundColor);
        classItem.push(getItem[index].classList[0]);
    }
}




//botão de salvar a lista
const saveList = document.createElement('button');
saveList.id = 'salvar-tarefas';
saveList.innerHTML = 'Salvar Lista';
input.appendChild(saveList);
saveList.addEventListener('click',()=>{
    attItem();
    infoList();
    localStorage.setItem('textList', JSON.stringify(textList));
    localStorage.setItem('styleList', JSON.stringify(bgList));
    localStorage.setItem('classList', JSON.stringify(classItem));
});

//carregar lista ao recarregar a página

const savedText = JSON.parse(localStorage.getItem('textList'));
const savedStyle = JSON.parse(localStorage.getItem('styleList'));
const savedClass = JSON.parse(localStorage.getItem('classList'));
if(savedText){
for (let index = 0; index < savedText.length; index+=1) {
    const listItem = document.createElement('li');
    listItem.innerHTML = savedText[index];
    listItem.style.background = savedStyle[index];
    if (savedClass[index] != 'null') {
        listItem.className = savedClass[index];
    }
    list.appendChild(listItem);
    attItem();
    for (let index = 0; index < getItem.length; index+=1) {
        getItem[index].addEventListener('click', selectItem);
    }
    for (let index = 0; index < getItem.length; index+=1) {
        getItem[index].addEventListener('dblclick', completed);
    }
}
}