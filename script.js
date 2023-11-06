document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const ul = document.getElementById("todo-list");

  class Todo {
    constructor(id, task, completed) {
      this.id = id;
      this.task = task;
      this.completed = completed;
    }
  }

  class TodoList {
    constructor() {
      this.items = [];
    }

    initializeWithCachedTodos() {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      this.items = todos.map(
        (todo) => new Todo(todo.id, todo.task, todo.completed)
      );
      this.renderToPage();
    }

    addTodo(todo) {
      this.items.push(todo);
      this.saveTodoToLocalStorage();
      this.renderToPage();
    }

    removeTodoById(id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.saveTodoToLocalStorage();
      this.renderToPage();
    }

    markTodoAsCompleted(id) {
      const todo = this.items.find((item) => item.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodoToLocalStorage();
        this.renderToPage();
      }
    }

    saveTodoToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.items));
    }

    renderToPage() {
      ul.innerHTML = "";

      this.items.forEach((item) => {
        const li = document.createElement("li");

        const status = item.completed ? "completed" : "incomplete";
        const icon = item.completed ? "fa-check-circle" : "fa-solid fa-check";
        const statusTextClass = item.completed
          ? "completed-text"
          : "incomplete-text";

        li.innerHTML = `
          <span class="task ${status}">${item.task}</span>
          <button class="complete-button" data-id="${item.id}">
            <i class="fas ${icon}"></i>
          </button>
          <button class="delete-button" data-id="${item.id}">
            <i class="fas fa-trash"></i>
          </button>
          <span class="${statusTextClass}">${
          item.completed ? "Completed" : "Incomplete"
        }</span>
        `;

        ul.appendChild(li);
      });

      const completeButtons = ul.querySelectorAll(".complete-button");
      completeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const id = parseInt(event.currentTarget.getAttribute("data-id"));
          TODO_LIST.markTodoAsCompleted(id);
        });
      });

      const deleteButtons = ul.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const id = parseInt(event.currentTarget.getAttribute("data-id"));
          TODO_LIST.removeTodoById(id);
        });
      });
    }
  }

  const TODO_LIST = new TodoList();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === "") return;

    const newTask = new Todo(Date.now(), input.value, false);

    TODO_LIST.addTodo(newTask);

    input.value = "";
  });

  TODO_LIST.initializeWithCachedTodos();
});
