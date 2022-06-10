const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todolist = document.getElementById('todo-list');

addButton.addEventListener('click', onClickAdd);
input.addEventListener('input', onTypeTodo);

function onTypeTodo() {
  addButton.disabled = input.value.length === 0;
}

function onClickAdd() {
  const li = createListItem(input.value);
  todolist.append(li);
  input.value = '';
  addButton.disabled = true;
}

function createListItem(name) {
  const li = document.createElement('li');

  const heading = document.createElement('h2');
  heading.textContent = name;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', onClickDelete);

  li.appendChild(heading);
  li.appendChild(deleteButton);
  return li;
}

function onClickDelete() {
  this.parentNode.remove();
}
