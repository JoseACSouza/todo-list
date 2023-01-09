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
    list.appendChild(listItem);
    const selectedItem = document.getElementsByTagName('li');
    for (let index = 0; index < selectedItem.length; index+=1) {
        selectedItem[index].addEventListener('click', (target)=>{
        target.path[0].style.backgroundColor = 'gray';
    }
    )}
    inputItem.value = '';
})