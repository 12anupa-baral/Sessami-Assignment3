import { Todo, TodoList } from "./todo.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const ul = document.getElementById("todo-list");

  const TODO_LIST = new TodoList();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === "") return;

    const newTask = new Todo(Date.now(), input.value, false);

    TODO_LIST.addTodo(newTask, ul);

    input.value = "";
  });

  TODO_LIST.initializeWithCachedTodos(ul);
});
