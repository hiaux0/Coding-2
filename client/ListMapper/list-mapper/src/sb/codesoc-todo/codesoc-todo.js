import {bindable} from 'aurelia-framework';
import './codesoc-todo.less'

export class CodesocTodo {

  attached() {
    let todoList = document.querySelector('.todo-list')
    let doneList = document.querySelector('.done-list')
    let todoInput = document.querySelector('.todo-input')


    document.addEventListener('keypress', function(ev) {
      if (ev.which === 116) {
        ev.preventDefault()
        todoInput.focus()
      }
    })


    todoList.addEventListener('click', function(ev) {
      if (ev.target.tagName !== 'LI') {
        return;
      }

      let listItem = ev.target;
      listItem.classList.toggle('checked');
      doneList.appendChild(listItem);
    });

    todoInput.addEventListener('keypress', function(ev) {
      if (ev.which === 13) {
        let newTodo = todoInput.value;
        let newTodoList = document.createElement('li')
        newTodoList.innerText = newTodo;
        todoList.appendChild(newTodoList)

        todoInput.value = ''
      }
    });



  }
}
