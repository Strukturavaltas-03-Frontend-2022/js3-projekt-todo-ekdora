const dateEl = document.querySelector('.todo__date');
const dayEl = document.querySelector('.todo__day');
const today = new Date();
const todayName = today.toLocaleString('en-US', { weekday: 'long' });
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
dateEl.innerHTML = `${day > 9 ? day : `0${day}`}-${month > 9 ? month : `0${month}`}-${year}`;
dayEl.innerHTML = `${todayName}`;

let todoMetaList = [];
let showCompleted = true;

const todoForm = document.querySelector('.todo__form');
const todoPending = document.querySelector('.todo__pending');
const todoList = document.querySelector('.todo__list');
const todoCompleted = document.querySelector('.todo__completed');
const todoDoneList = document.querySelector('.todo__done');
const todoBtns = document.querySelector('.todo__btns');
const todoChill = document.querySelector('.todo__chill');

// local storage handling starts here
const store = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
const retrieve = (key) => JSON.parse(localStorage.getItem(key));
const clear = (key) => localStorage.removeItem(key);
// local storage handling ends here

// counter handling starts here
const countPendingItems = () => {
    const pendingItems = todoMetaList.filter(todoMeta => !todoMeta.isDone);
    todoPending.innerHTML = `You have ${pendingItems.length} pending items`;
};
const countCompletedItems = () => {
    const completedItems = todoMetaList.filter(todoMeta => todoMeta.isDone);
    const completed = todoMetaList.length ? completedItems.length / todoMetaList.length * 100 : 0;
    todoCompleted.innerHTML = `Completed tasks: ${parseFloat(completed.toFixed(2))}%`;
};
const countItems = () => {
    countPendingItems();
    countCompletedItems();
    // saving list into local storage
    store('todoMetaList', todoMetaList);
};
// counter handling ends here

// creating html todo element
const createTodoItem = (parentEl, desc) => {
    const id = Math.random().toString(16).slice(2);
    const isDone = parentEl === todoDoneList;
    todoMetaList.push({ id, isDone, desc });
    if (todoMetaList.length === 1) {
        showListElements();
        todoChill.classList.add('hide-list-elements');
    }

    const todoItem = document.createElement('div');
    todoItem.classList.add('todo__item', 'flex', 'items-center', 'justify-between');
    todoItem.id = id;

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('flex', 'items-center', 'gap-2');
    todoItem.appendChild(inputDiv);

    if (isDone) {
        const doneIcon = document.createElement('img');
        doneIcon.src = 'assets/images/done.svg';
        doneIcon.alt = 'done';
        doneIcon.classList.add('done-icon', 'icon-size');
        inputDiv.appendChild(doneIcon);
    } else {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onclick = () => {
            removeTodoItem(id);
            createTodoItem(todoDoneList, desc);
        };
        checkbox.classList.add('todo__checkbox', 'icon-size');
        inputDiv.appendChild(checkbox);
    }

    const inputField = document.createElement('div');
    inputField.classList.add('common-font');
    inputField.innerHTML = desc;
    inputDiv.appendChild(inputField);

    const delIcon = document.createElement('img');
    delIcon.src = 'assets/images/delete.svg';
    delIcon.alt = 'del';
    delIcon.classList.add('delete-icon', 'icon-size');
    delIcon.onclick = () => removeTodoItem(id);
    todoItem.appendChild(delIcon);

    parentEl.appendChild(todoItem);

    countItems();
};

// removing html todo element
const removeTodoItem = (id) => {
    const element = document.getElementById(id);
    element.remove();
    const todoMetaIdx = todoMetaList.findIndex((todoMeta) => todoMeta.id === id);
    if (todoMetaIdx > -1) {
        todoMetaList.splice(todoMetaIdx, 1);
    }
    countItems();
    if (!todoMetaList.length) {
        hideListElements();
    };
};

const hideListElements = () => {
    hidePendingList();
    hideCompletedList();
    hideTodoBtns();
    todoChill.classList.remove('hide-list-elements');
};

const showListElements = () => {
    showPendingList();
    if (showCompleted) {
        showCompletedList();
    }
    showTodoBtns();
};

const hidePendingList = () => {
    todoPending.classList.add('hide-list-elements');
    todoList.classList.add('hide-list-elements');
};

const showPendingList = () => {
    todoPending.classList.remove('hide-list-elements');
    todoList.classList.remove('hide-list-elements');
};

const hideCompletedList = () => {
    todoCompleted.classList.add('hide-list-elements');
    todoDoneList.classList.add('hide-list-elements');
};

const showCompletedList = () => {
    todoCompleted.classList.remove('hide-list-elements');
    todoDoneList.classList.remove('hide-list-elements');
};

const hideTodoBtns = () => {
    todoBtns.classList.add('hide-list-elements');
};

const showTodoBtns = () => {
    todoBtns.classList.remove('hide-list-elements');
};

// IIFE init reads local storage and creating html todo elements
(function init() {
    const storedTodoMetaList = retrieve('todoMetaList');
    if (storedTodoMetaList) {
        clear('todoMetaList');
        storedTodoMetaList.forEach(todoMeta => {
            const parentEl = todoMeta.isDone ? todoDoneList : todoList;
            createTodoItem(parentEl, todoMeta.desc);
        });
    };
    if (!todoMetaList.length) {
        hideListElements();
    };
})();

// IIFE todo form creation
(function createTodoForm() {
    const todoInput = document.createElement('input');
    todoInput.type = 'text';
    todoInput.placeholder = 'Take the garbage out';
    todoInput.classList.add('todo__input', 'common-font');

    const todoAddBtn = document.createElement('button');
    todoAddBtn.innerHTML = '+';
    todoAddBtn.classList.add('todo__add', 'common-font');
    todoAddBtn.onclick = () => {
        if (todoInput.value) {
            createTodoItem(todoList, todoInput.value);
            todoInput.value = '';
        }
    }

    todoForm.appendChild(todoInput);
    todoForm.appendChild(todoAddBtn);
})();

// IIFE todo list buttons creation
(function createTodoBtns() {
    const showHideCompleteBtn = document.createElement('button');
    showHideCompleteBtn.classList.add('todo__btn');
    showHideCompleteBtn.innerHTML = 'Hide Completed';
    showHideCompleteBtn.onclick = () => {
        showCompleted = !showCompleted;
        showHideCompleteBtn.innerHTML = `${showCompleted ? 'Hide' : 'Show'} Completed`;
        showCompleted ? showCompletedList() : hideCompletedList();
    };
    todoBtns.appendChild(showHideCompleteBtn);

    const clearAllBtn = document.createElement('button');
    clearAllBtn.classList.add('todo__btn');
    clearAllBtn.innerHTML = 'Clear Pending';
    clearAllBtn.onclick = () => {
        const pendingItems = todoMetaList.filter(todoMeta => !todoMeta.isDone);
        pendingItems.forEach(pendingItem => {
            removeTodoItem(pendingItem.id);
        });
    };
    todoBtns.appendChild(clearAllBtn);
})();