document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const ul = document.getElementById("todo-list");

  class Todo {
    constructor(task) {
      this.task = task;
      this.completed = false;
    }
  }

  class TodoList {
    constructor() {
      this.items = [];
    }

    initializeWithCachedTodos() {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      this.items = todos;
    }

    addTodo(todo) {
      this.items.push(todo);
      this.saveTodoToLocalStorage();
      this.renderToPage();
    }

    removeTodo(task) {
      this.items = this.items.filter((item) => item.task !== task);
      this.saveTodoToLocalStorage();
      this.renderToPage();
    }

    markTodoAsCompleted(task) {
      const todo = this.items.find((item) => item.task === task);
      if (todo) {
        todo.completed = true;
        this.saveTodoToLocalStorage();
        this.renderToPage();
      }
    }

    saveTodoToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.items));
    }

    renderToPage() {
      ul.innerHTML = ""; // Clear the existing list

      this.items.forEach((item) => {
        const li = document.createElement("li");
        const status = item.completed ? "completed" : "incomplete";

        li.innerHTML = `
            ${item.task} - ${status}
            <button class="delete-button">
              <i class="fas fa-trash"></i>
            </button>
          `;

        ul.appendChild(li);
      });

      // Add event listeners for the delete buttons
      const deleteButtons = ul.querySelectorAll(".delete-button");
      deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => handleDeleteTodo(index));
      });
    }
  }

  const TODO_LIST = new TodoList();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === "") return;

    const newTask = new Todo(input.value);

    TODO_LIST.addTodo(newTask);

    input.value = "";
  });

  function handleDeleteTodo(index) {
    const task = TODO_LIST.items[index].task;
    TODO_LIST.removeTodo(task);
  }

  TODO_LIST.initializeWithCachedTodos();
  TODO_LIST.renderToPage();
});
