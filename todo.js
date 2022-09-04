const dateEl = document.querySelector('.todo__date');
const dayEl = document.querySelector('.todo__day');
const today = new Date();
const todayName = today.toLocaleString('en-US', {  weekday: 'long' });
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
dateEl.innerHTML = `${day > 9 ? day : `0${day}`}-${month > 9 ? month : `0${month}`}-${year}`;
dayEl.innerHTML = `${todayName}`;

const todoList = document.querySelector('#todo__list');
const todoDone = document.querySelector('#todo__done');
/*
<div class="todo__item flex items-center justify-between">
    <div class="flex items-center gap-2">
        <input class="todo__checkbox icon-size" type="checkbox">
        <div class="common-font">Go shopping</div>
    </div>
    <img class="delete-icon icon-size" src="assets/images/delete.svg" alt="del">
</div>
*/

const createTodoItem = (parentEl, desc) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo__item', 'flex', 'items-center', 'justify-between');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('flex', 'items-center', 'gap-2');
    todoItem.appendChild(inputDiv);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo__checkbox', 'icon-size');
    inputDiv.appendChild(checkbox);

    const inputField = document.createElement('div');
    inputField.classList.add('common-font');
    inputField.innerHTML = desc;
    inputDiv.appendChild(inputField);

    const delIcon = document.createElement('img');
    delIcon.src = 'assets/images/delete.svg';
    delIcon.alt = 'del';
    delIcon.classList.add('delete-icon', 'icon-size');
    todoItem.appendChild(delIcon);

    parentEl.appendChild(todoItem);
};

createTodoItem(todoList, 'Go shopping');
createTodoItem(todoList, 'Do dishwashing');

createTodoItem(todoDone, 'Clean bathroom');
createTodoItem(todoDone, 'Check mails');

