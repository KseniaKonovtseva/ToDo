'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const render = function () {
  localStorage.setItem("toDoLocal", JSON.stringify(toDoData));

  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `
    <span class="text-todo">${item.text}</span>
    <div class="todo-buttons">
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
    </div>`

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function() {
      item.completed = !item.completed;

      localStorage.setItem("toDoLocal", JSON.stringify(toDoData));
      render();
    })

    li.querySelector('.todo-remove').addEventListener('click', function() {
      
      const res = toDoData.findIndex(function (el, index, arr) {
        return el.text === item.text;
      })

      toDoData.splice(res, 1);
      localStorage.setItem("toDoLocal", JSON.stringify(toDoData));
      
      li.remove();
      render();
    })

  })
}

todoControl.addEventListener('submit', function(e) {
  e.preventDefault()

  if (headerInput.value === "") return

  const newToDo = {
    text: headerInput.value,
    completed: false
  }

  toDoData.push(newToDo)
  headerInput.value = "";

  render();
})

if (localStorage.getItem("toDoLocal")) {
  toDoData = JSON.parse(localStorage.getItem("toDoLocal"));
  render();
}